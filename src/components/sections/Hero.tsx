'use client'

import { motion } from 'framer-motion'
import { useCountdown } from '@/hooks/useCountdown'
import { GoldDivider } from '@/components/decor/GoldDivider'
import { useReducedMotionPref } from '@/hooks/useReducedMotion'
import { weddingConfig } from '@/config/weddingConfig'

function Unit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex min-w-[64px] flex-col items-center">
      <span className="font-display text-4xl font-semibold tabular-nums text-ivory sm:text-5xl">
        {String(value).padStart(2, '0')}
      </span>
      <span className="mt-1 font-body text-[0.65rem] uppercase tracking-[0.25em] text-gold-light/80">
        {label}
      </span>
    </div>
  )
}

export function Hero() {
  const reduced = useReducedMotionPref()
  const { couple, hero, weddingDate } = weddingConfig
  const cd = useCountdown(weddingDate)

  return (
    <section className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-4 py-20 text-center">
      {/* Dark garden night background with dim warm lights */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(90% 70% at 50% 30%, #3a1824 0%, #220d15 55%, #140810 100%)',
        }}
      />
      {/* warm bokeh light points (static, cheap) */}
      <div
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            'radial-gradient(3px 3px at 20% 30%, rgba(231,204,138,0.5), transparent), radial-gradient(2px 2px at 70% 20%, rgba(231,204,138,0.4), transparent), radial-gradient(2px 2px at 40% 70%, rgba(231,204,138,0.35), transparent), radial-gradient(3px 3px at 85% 60%, rgba(231,204,138,0.45), transparent), radial-gradient(2px 2px at 15% 80%, rgba(231,204,138,0.3), transparent)',
        }}
      />

      <motion.div
        className="relative z-10 flex flex-col items-center"
        initial={reduced ? false : { opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      >
        <p className="font-body text-xs uppercase tracking-[0.35em] text-gold-light/80">
          We&apos;re getting married
        </p>

        <h1 className="mt-5 font-display text-6xl font-semibold leading-none text-ivory sm:text-8xl">
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

        {/* Countdown */}
        <div className="mt-10 flex items-center gap-4 rounded-2xl border border-gold/25 bg-black/20 px-6 py-5 backdrop-blur-sm sm:gap-7">
          {cd.isPast ? (
            <span className="font-display text-2xl text-gold-light">Celebrating today!</span>
          ) : (
            <>
              <Unit value={cd.days} label="Days" />
              <span className="font-display text-3xl text-gold/50">:</span>
              <Unit value={cd.hours} label="Hrs" />
              <span className="font-display text-3xl text-gold/50">:</span>
              <Unit value={cd.minutes} label="Min" />
              <span className="font-display text-3xl text-gold/50">:</span>
              <Unit value={cd.seconds} label="Sec" />
            </>
          )}
        </div>
      </motion.div>

      {/* scroll cue */}
      <motion.div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-gold-light/60"
        animate={reduced ? undefined : { y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden="true"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M12 5v14M6 13l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </motion.div>
    </section>
  )
}
