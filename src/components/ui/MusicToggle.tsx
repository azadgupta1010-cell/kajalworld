'use client'

import { useEffect, useState } from 'react'
import { useReducedMotionPref } from '@/hooks/useReducedMotion'
import { useMusic } from '@/components/audio/MusicContext'

interface MusicToggleProps {
  title?: string
}

/**
 * Floating background-music control backed by the app-wide MusicContext.
 * Music is started on the first user gesture (e.g. opening the invitation);
 * this button lets the guest pause/resume anywhere. Never autoplays silently
 * with sound before a gesture (browser policy + our policy).
 */
export function MusicToggle({ title = 'Music' }: MusicToggleProps) {
  const reduced = useReducedMotionPref()
  const music = useMusic()
  const [showHint, setShowHint] = useState(true)

  useEffect(() => {
    if (reduced) return
    const id = window.setTimeout(() => setShowHint(false), 5000)
    return () => window.clearTimeout(id)
  }, [reduced])

  if (!music?.available) return null

  const { playing, toggle } = music

  return (
    <div className="fixed bottom-5 right-5 z-[80] flex items-center gap-2">
      {showHint && !playing && (
        <span
          className={
            'select-none rounded-full border border-gold/60 bg-plum/90 px-3 py-1.5 font-body text-xs tracking-wide text-gold-light shadow-gold ' +
            (reduced ? '' : 'transition-opacity duration-700')
          }
          aria-hidden="true"
        >
          Tap for music ♫
        </span>
      )}

      <button
        type="button"
        onClick={() => {
          setShowHint(false)
          toggle()
        }}
        aria-pressed={playing}
        aria-label={playing ? `Pause ${title}` : `Play ${title}`}
        className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-gold bg-plum/90 shadow-gold ring-2 ring-gold/30 ring-offset-2 ring-offset-transparent transition hover:bg-plum focus-visible:outline"
      >
        {playing ? (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="#E3C891" aria-hidden="true">
            <rect x="6" y="5" width="4" height="14" rx="1" />
            <rect x="14" y="5" width="4" height="14" rx="1" />
          </svg>
        ) : (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="#E3C891" aria-hidden="true">
            <path d="M8 5v14l11-7z" />
          </svg>
        )}
      </button>
    </div>
  )
}
