'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { GalleryImage } from '@/components/gallery/GalleryImage'
import { Lightbox } from '@/components/gallery/Lightbox'
import { Reveal } from '@/components/ui/Reveal'
import { GoldDivider } from '@/components/decor/GoldDivider'
import { staggerContainer } from '@/motion/variants'
import { useReducedMotionPref } from '@/hooks/useReducedMotion'
import type { GalleryMedia } from '@/components/gallery/types'

interface GalleryProps {
  items: GalleryMedia[]
  heading?: string
  eyebrow?: string
}

/**
 * Editorial masonry-style gallery.
 *
 * Media is supplied via the `items` prop (placeholders for now; real uploads
 * arrive in a later phase). Shows a graceful empty state and a per-tile
 * "unavailable" fallback instead of faking a production album.
 */
export function Gallery({ items, heading = 'Our Gallery', eyebrow = 'Moments' }: GalleryProps) {
  const reduced = useReducedMotionPref()
  const [active, setActive] = useState<number | null>(null)

  return (
    <section id="gallery" className="relative px-4 py-24">
      <Reveal className="mx-auto mb-14 max-w-xl text-center">
        <p className="font-body text-xs uppercase tracking-[0.3em] text-rose-dusty">{eyebrow}</p>
        <h2 className="mt-3 font-display text-4xl font-semibold text-ivory sm:text-5xl">{heading}</h2>
        <div className="mt-5 flex justify-center">
          <GoldDivider width={220} />
        </div>
      </Reveal>

      {items.length === 0 ? (
        <p className="text-center font-body text-sm text-ivory/60">Photos will appear here soon.</p>
      ) : (
        <motion.div
          className="mx-auto grid max-w-5xl auto-rows-[minmax(0,1fr)] grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4"
          variants={reduced ? undefined : staggerContainer}
          initial={reduced ? false : 'hidden'}
          whileInView={reduced ? undefined : 'show'}
          viewport={{ once: true, amount: 0.1 }}
        >
          {items.map((item, i) => (
            <GalleryImage key={item.id} item={item} reduced={reduced} onOpen={() => setActive(i)} />
          ))}
        </motion.div>
      )}

      <Lightbox items={items} index={active} onClose={() => setActive(null)} onNavigate={setActive} />
    </section>
  )
}
