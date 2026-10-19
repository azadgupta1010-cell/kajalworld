'use client'

import { useEffect, useRef, useState } from 'react'

interface MusicToggleProps {
  src?: string
  title?: string
}

/**
 * Background music control. NEVER autoplays with sound — playback only starts
 * on an explicit user gesture. Fixed, accessible toggle button.
 */
export function MusicToggle({ src, title = 'Music' }: MusicToggleProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [playing, setPlaying] = useState(false)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    if (!src) return
    const audio = new Audio(src)
    audio.loop = true
    audio.preload = 'none'
    audio.volume = 0.45
    audioRef.current = audio
    setReady(true)
    return () => {
      audio.pause()
      audioRef.current = null
    }
  }, [src])

  if (!src) return null

  const toggle = async () => {
    const audio = audioRef.current
    if (!audio) return
    if (playing) {
      audio.pause()
      setPlaying(false)
    } else {
      try {
        await audio.play()
        setPlaying(true)
      } catch {
        setPlaying(false)
      }
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      disabled={!ready}
      aria-pressed={playing}
      aria-label={playing ? `Pause ${title}` : `Play ${title}`}
      className="fixed bottom-5 right-5 z-50 flex h-12 w-12 items-center justify-center rounded-full border border-gold/60 bg-night/70 backdrop-blur transition hover:bg-night/90"
    >
      {playing ? (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="#E7CC8A" aria-hidden="true">
          <rect x="6" y="5" width="4" height="14" rx="1" />
          <rect x="14" y="5" width="4" height="14" rx="1" />
        </svg>
      ) : (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="#E7CC8A" aria-hidden="true">
          <path d="M8 5v14l11-7z" />
        </svg>
      )}
    </button>
  )
}
