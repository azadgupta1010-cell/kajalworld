'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { galleryItem } from '@/motion/variants'
import type { GalleryMedia } from '@/components/gallery/types'

interface GalleryImageProps {
  item: GalleryMedia
  onOpen: () => void
  reduced: boolean
}

/**
 * A single gallery tile with loading skeleton, broken-image fallback,
 * desktop hover zoom and staggered entrance.
 */
export function GalleryImage({ item, onOpen, reduced }: GalleryImageProps) {
  const [loaded, setLoaded] = useState(false)
  const [broken, setBroken] = useState(false)
  const tall = item.span === 2

  return (
    <motion.button
      type="button"
      onClick={onOpen}
      variants={reduced ? undefined : galleryItem}
      className={
        'group relative block w-full overflow-hidden rounded-xl border border-gold/15 bg-white/[0.03] ' +
        (tall ? 'row-span-2 aspect-[3/4]' : 'aspect-[4/3]')
      }
      aria-label={`Open ${item.alt}`}
    >
      {!loaded && !broken && <div className="skeleton absolute inset-0" />}

      {broken ? (
        <div
          className="flex h-full w-full flex-col items-center justify-center px-4 text-center"
          style={{
            background:
              'radial-gradient(120% 120% at 50% 25%, #9D294B 0%, #5E1930 60%, #21191B 100%)',
          }}
          role="img"
          aria-label={`${item.alt} — photo coming soon`}
        >
          {/* small gold floral motif */}
          <svg
            width="42"
            height="42"
            viewBox="0 0 48 48"
            fill="none"
            aria-hidden="true"
            className="opacity-90"
          >
            <g fill="#E3C891">
              {[0, 72, 144, 216, 288].map((deg) => (
                <ellipse
                  key={deg}
                  cx="24"
                  cy="13"
                  rx="4.5"
                  ry="9"
                  transform={`rotate(${deg} 24 24)`}
                />
              ))}
            </g>
            <circle cx="24" cy="24" r="4" fill="#FFF9F2" />
          </svg>
          <span className="mt-3 font-script text-lg text-champagne-light">Photo coming soon</span>
        </div>
      ) : (
        <>
          <img
            src={item.thumb ?? item.src}
            alt={item.alt}
            loading="lazy"
            decoding="async"
            onLoad={() => setLoaded(true)}
            onError={() => setBroken(true)}
            className={
              'h-full w-full object-cover transition-[transform,opacity] duration-500 ease-out ' +
              (loaded ? 'opacity-100' : 'opacity-0') +
              ' group-hover:scale-105'
            }
          />
          {item.type === 'video' && (
            <span className="absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-ivory backdrop-blur">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>
          )}
          {/* gold hover veil */}
          <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-rose-deep/40 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        </>
      )}
    </motion.button>
  )
}
