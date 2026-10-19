'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { lightbox, overlayFade } from '@/motion/variants'
import type { GalleryMedia } from '@/components/gallery/types'

interface LightboxProps {
  items: GalleryMedia[]
  index: number | null
  onClose: () => void
  onNavigate: (index: number) => void
}

/**
 * Full-screen lightbox with keyboard (arrows + Esc) and mobile swipe support.
 * Images and videos both render with explicit controls for video.
 */
export function Lightbox({ items, index, onClose, onNavigate }: LightboxProps) {
  const open = index !== null
  const touchStartX = useRef<number | null>(null)
  const [broken, setBroken] = useState(false)

  const go = useCallback(
    (dir: 1 | -1) => {
      if (index === null) return
      const next = (index + dir + items.length) % items.length
      setBroken(false)
      onNavigate(next)
    },
    [index, items.length, onNavigate],
  )

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      else if (e.key === 'ArrowRight') go(1)
      else if (e.key === 'ArrowLeft') go(-1)
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open, onClose, go])

  const current = index !== null ? items[index] : null

  return (
    <AnimatePresence>
      {open && current && (
        <motion.div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-night/95 backdrop-blur-sm"
          variants={overlayFade}
          initial="hidden"
          animate="show"
          exit="exit"
          role="dialog"
          aria-modal="true"
          aria-label="Image viewer"
          onClick={onClose}
          onTouchStart={(e) => (touchStartX.current = e.touches[0].clientX)}
          onTouchEnd={(e) => {
            if (touchStartX.current === null) return
            const dx = e.changedTouches[0].clientX - touchStartX.current
            if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1)
            touchStartX.current = null
          }}
        >
          {/* Close */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-gold/40 text-ivory transition hover:bg-white/10"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            </svg>
          </button>

          {/* Prev / Next */}
          {items.length > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  go(-1)
                }}
                aria-label="Previous"
                className="absolute left-3 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-gold/40 text-ivory transition hover:bg-white/10 sm:left-6"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M15 6l-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  go(1)
                }}
                aria-label="Next"
                className="absolute right-3 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-gold/40 text-ivory transition hover:bg-white/10 sm:right-6"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </>
          )}

          <motion.div
            key={current.id}
            className="relative max-h-[85vh] max-w-[92vw]"
            variants={lightbox}
            initial="hidden"
            animate="show"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
          >
            {current.type === 'video' ? (
              <video
                src={current.src}
                poster={current.poster}
                controls
                playsInline
                className="max-h-[85vh] max-w-[92vw] rounded-lg"
              />
            ) : broken ? (
              <div className="flex h-72 w-72 flex-col items-center justify-center rounded-lg border border-gold/30 text-ivory/60">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
                  <path d="M3 3l18 18M21 15l-5-5L5 21M3 5a2 2 0 012-2h12" strokeLinecap="round" />
                </svg>
                <span className="mt-3 font-body text-sm">Image unavailable</span>
              </div>
            ) : (
              <img
                src={current.src}
                alt={current.alt}
                className="max-h-[85vh] max-w-[92vw] rounded-lg object-contain"
                onError={() => setBroken(true)}
              />
            )}
            <p className="mt-3 text-center font-body text-xs text-ivory/60">
              {index! + 1} / {items.length}
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
