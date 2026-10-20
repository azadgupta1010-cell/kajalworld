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
}

const MusicContext = createContext<MusicContextValue | null>(null)

interface MusicProviderProps {
  src?: string
  children: ReactNode
}

/**
 * App-wide background music. A single <audio> element persists across pages
 * (the provider sits above the router content), so music keeps playing while
 * the guest moves through the event journey.
 *
 * IMPORTANT: browsers block audible autoplay until a user gesture. We expose
 * play() so the first real interaction (e.g. tapping "Open Your Invitation")
 * starts the music — giving an "opens and plays" feel while staying compliant.
 */
export function MusicProvider({ src, children }: MusicProviderProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [playing, setPlaying] = useState(false)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    if (!src) return
    const audio = new Audio(src)
    audio.loop = true
    audio.preload = 'auto'
    audio.volume = 0.45
    const onPlay = () => setPlaying(true)
    const onPause = () => setPlaying(false)
    audio.addEventListener('play', onPlay)
    audio.addEventListener('pause', onPause)
    audioRef.current = audio
    setReady(true)
    return () => {
      audio.removeEventListener('play', onPlay)
      audio.removeEventListener('pause', onPause)
      audio.pause()
      audioRef.current = null
    }
  }, [src])

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

  const value = useMemo<MusicContextValue>(
    () => ({ available: !!src, playing, ready, play, pause, toggle }),
    [src, playing, ready, play, pause, toggle],
  )

  return <MusicContext.Provider value={value}>{children}</MusicContext.Provider>
}

export function useMusic() {
  return useContext(MusicContext)
}
