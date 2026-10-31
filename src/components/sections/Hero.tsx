'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Countdown } from '@/components/sections/Countdown'
import { GoldDivider } from '@/components/decor/GoldDivider'
import { useReducedMotionPref } from '@/hooks/useReducedMotion'
import { weddingConfig } from '@/config/weddingConfig'
import { mediaUrl } from '@/lib/env'

export function Hero() {
  const reduced = useReducedMotionPref()
  const { couple, hero, weddingDate } = weddingConfig

  // Full-bleed garden background photo — only shown once it actually loads, so
  // a missing file falls back gracefully to the night gradient.
  const bgSrc = hero.backgroundImage ? mediaUrl(hero.backgroundImage) : ''
  const [bgLoaded, setBgLoaded] = useState(false)
  useEffect(() => {
    if (!bgSrc) return
    const img = new Image()
    img.onload = () => setBgLoaded(true)
    img.onerror = () => setBgLoaded(false)
    img.src = bgSrc
  }, [bgSrc])

  return (
    <section className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-4 py-20 text-center">
      {/* Night-garden gradient base (always present as fallback) */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(90% 70% at 50% 30%, #2A1A20 0%, #21191B 55%, #160F12 100%)',
        }}
      />

      {/* Garden photo background */}
      {bgLoaded && (
        <div
          className="pointer-events-none absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${bgSrc})` }}
          aria-hidden="true"
        />
      )}

      {/* Readability scrim — darker at the bottom where the text sits, like the
          reference mockup. Ensures the couple name stays legible on any phone. */}
      {bgLoaded && (
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, rgba(14,8,12,0.35) 0%, rgba(14,8,12,0.15) 42%, rgba(14,8,12,0.55) 72%, rgba(14,8,12,0.8) 100%)',
          }}
          aria-hidden="true"
        />
      )}

      {/* warm bokeh (only when no photo, keeps the bare gradient classy) */}
      {!bgLoaded && (
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              'radial-gradient(3px 3px at 20% 30%, rgba(231,204,138,0.5), transparent), radial-gradient(2px 2px at 70% 20%, rgba(231,204,138,0.4), transparent), radial-gradient(2px 2px at 40% 70%, rgba(231,204,138,0.35), transparent), radial-gradient(3px 3px at 85% 60%, rgba(231,204,138,0.45), transparent), radial-gradient(2px 2px at 15% 80%, rgba(231,204,138,0.3), transparent)',
          }}
        />
      )}

      <motion.div
        className="relative z-10 flex flex-col items-center"
        style={bgLoaded ? { textShadow: '0 2px 16px rgba(0,0,0,0.6)' } : undefined}
        initial={reduced ? false : { opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      >
        <p className="font-body text-xs uppercase tracking-[0.35em] text-gold-light/90">
          We&apos;re getting married
        </p>

        <h1 className="mt-5 px-2 font-display text-5xl font-semibold leading-tight text-ivory sm:text-7xl">
          {couple.bride.name}
          <span className="mx-3 font-script text-4xl text-rose-dusty sm:text-5xl">&amp;</span>
          {couple.groom.name}
        </h1>

        <div className="mt-7 flex justify-center">
          <GoldDivider width={240} />
        </div>

        <p className="mt-6 max-w-md text-balance font-body text-sm leading-relaxed text-ivory/80">
          {hero.tagline}
        </p>
        <p className="mt-4 font-display text-xl text-gold-light">{hero.dateLabel}</p>
        <p className="font-body text-sm text-ivory/70">{hero.venueLabel}</p>

        {/* Countdown (isolated so only the digits re-render each second) */}
        <Countdown target={weddingDate} />
      </motion.div>

      {/* scroll cue */}
      <motion.div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-gold-light/60"
        animate={reduced ? undefined : { y: [0, 8, 0] }}
        transition={reduced ? undefined : { duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden="true"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M12 5v14M6 13l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </motion.div>
    </section>
  )
}
