'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react'

interface MusicContextValue {
  available: boolean
  playing: boolean
  ready: boolean
  /** Start playback (must be triggered by a user gesture for sound). */
  play: () => Promise<void>
  pause: () => void
  toggle: () => void
  /** Skip to the next random track. */
  next: () => void
}

const MusicContext = createContext<MusicContextValue | null>(null)

interface MusicProviderProps {
  /** List of track URLs. A random one plays, then a new random one on end. */
  playlist?: string[]
  /** Single fallback track (used if no playlist is given). */
  src?: string
  children: ReactNode
}

/** Pick a random index, avoiding `exclude` when the list has more than one. */
function pickRandom(length: number, exclude = -1): number {
  if (length <= 1) return 0
  let i = Math.floor(Math.random() * length)
  if (i === exclude) i = (i + 1) % length
  return i
}

/**
 * App-wide background music. A single <audio> element persists across pages
 * (the provider sits above the router content), so music keeps playing while
 * the guest moves through the event journey.
 *
 * Variety: on each load a RANDOM track from the playlist is selected. When a
 * track finishes, a new random track starts automatically — so guests rarely
 * hear the same song twice in a row.
 *
 * IMPORTANT: browsers block audible autoplay until a user gesture. We expose
 * play() so the first real interaction (e.g. tapping "Open Your Invitation")
 * starts the music — giving an "opens and plays" feel while staying compliant.
 */
export function MusicProvider({ playlist, src, children }: MusicProviderProps) {
  // Build the effective track list once.
  const tracks = useMemo(() => {
    const list = (playlist && playlist.length > 0 ? playlist : src ? [src] : []).filter(Boolean)
    return list as string[]
  }, [playlist, src])

  const audioRef = useRef<HTMLAudioElement | null>(null)
  const indexRef = useRef<number>(-1)
  const [playing, setPlaying] = useState(false)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    if (tracks.length === 0) return

    // Choose the first random track for this visit.
    indexRef.current = pickRandom(tracks.length)
    const audio = new Audio(tracks[indexRef.current])
    audio.loop = false // we advance to a new random track instead of looping
    audio.preload = 'auto'
    audio.volume = 0.45
    const wasPlaying = () => !audio.paused && !audio.ended

    const onPlay = () => setPlaying(true)
    const onPause = () => setPlaying(false)
    const onEnded = () => {
      // Advance to a new random track (different from the current one).
      indexRef.current = pickRandom(tracks.length, indexRef.current)
      audio.src = tracks[indexRef.current]
      audio.currentTime = 0
      void audio.play().catch(() => {})
    }

    audio.addEventListener('play', onPlay)
    audio.addEventListener('pause', onPause)
    audio.addEventListener('ended', onEnded)
    audioRef.current = audio
    setReady(true)

    return () => {
      audio.removeEventListener('play', onPlay)
      audio.removeEventListener('pause', onPause)
      audio.removeEventListener('ended', onEnded)
      audio.pause()
      audioRef.current = null
      void wasPlaying
    }
  }, [tracks])

  const play = useCallback(async () => {
    const audio = audioRef.current
    if (!audio) return
    try {
      await audio.play()
    } catch {
      // Autoplay blocked until a gesture; the toggle button remains available.
    }
  }, [])

  const pause = useCallback(() => {
    audioRef.current?.pause()
  }, [])

  const toggle = useCallback(() => {
    const audio = audioRef.current
    if (!audio) return
    if (audio.paused) void play()
    else pause()
  }, [play, pause])

  const next = useCallback(() => {
    const audio = audioRef.current
    if (!audio || tracks.length === 0) return
    indexRef.current = pickRandom(tracks.length, indexRef.current)
    audio.src = tracks[indexRef.current]
    audio.currentTime = 0
    void audio.play().catch(() => {})
  }, [tracks])

  const value = useMemo<MusicContextValue>(
    () => ({ available: tracks.length > 0, playing, ready, play, pause, toggle, next }),
    [tracks.length, playing, ready, play, pause, toggle, next],
  )

  return <MusicContext.Provider value={value}>{children}</MusicContext.Provider>
}

export function useMusic() {
  return useContext(MusicContext)
}
