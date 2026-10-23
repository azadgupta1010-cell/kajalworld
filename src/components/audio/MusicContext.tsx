'use client'

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  type ReactNode,
} from 'react'

interface MusicContextValue {
  available: boolean
  /** Start playback — call on the first user gesture (browsers need this). */
  play: () => void
}

const MusicContext = createContext<MusicContextValue | null>(null)

interface MusicProviderProps {
  /** Track URLs. One random track plays, then a new random one when it ends. */
  tracks: string[]
  children: ReactNode
}

function pickRandom(length: number, exclude = -1): number {
  if (length <= 1) return 0
  let i = Math.floor(Math.random() * length)
  if (i === exclude) i = (i + 1) % length
  return i
}

/**
 * App-wide background music.
 *
 * The <audio> element is created EXACTLY ONCE and lives at the root layout, so
 * it keeps playing continuously while the guest navigates between pages (the
 * layout never unmounts during client navigation). There are deliberately NO
 * pause / change controls — once started it simply plays, advancing to a new
 * random track when one finishes.
 *
 * Browsers block audible autoplay until a user gesture, so playback begins on
 * the first interaction (opening the invitation / first tap anywhere).
 */
export function MusicProvider({ tracks, children }: MusicProviderProps) {
  // Stable key so the setup effect runs once (not on every render).
  const tracksKey = tracks.join('|')
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const startedRef = useRef(false)

  useEffect(() => {
    if (tracks.length === 0) return
    // Guard: never recreate the audio element once it exists.
    if (audioRef.current) return

    let index = pickRandom(tracks.length)
    const audio = new Audio(tracks[index])
    audio.loop = false
    audio.preload = 'auto'
    audio.volume = 0.5
    const onEnded = () => {
      index = pickRandom(tracks.length, index)
      audio.src = tracks[index]
      audio.currentTime = 0
      void audio.play().catch(() => {})
    }
    audio.addEventListener('ended', onEnded)
    audioRef.current = audio

    return () => {
      // Only tear down on a real unmount (app close), not route changes.
      audio.removeEventListener('ended', onEnded)
      audio.pause()
      audioRef.current = null
      startedRef.current = false
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tracksKey])

  // As a safety net, attach a one-time global gesture listener so music starts
  // on the very first tap/click anywhere, even outside the intro.
  useEffect(() => {
    if (tracks.length === 0) return
    const start = () => {
      const audio = audioRef.current
      if (!audio || startedRef.current) return
      startedRef.current = true
      void audio.play().catch(() => {
        startedRef.current = false // allow retry on next gesture if blocked
      })
    }
    window.addEventListener('pointerdown', start, { once: false })
    window.addEventListener('keydown', start, { once: false })
    return () => {
      window.removeEventListener('pointerdown', start)
      window.removeEventListener('keydown', start)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tracksKey])

  const value = useMemo<MusicContextValue>(
    () => ({
      available: tracks.length > 0,
      play: () => {
        const audio = audioRef.current
        if (!audio) return
        startedRef.current = true
        void audio.play().catch(() => {})
      },
    }),
    [tracks.length],
  )

  return <MusicContext.Provider value={value}>{children}</MusicContext.Provider>
}

export function useMusic() {
  return useContext(MusicContext)
}
