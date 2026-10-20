'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { GoldDivider } from '@/components/decor/GoldDivider'
import { FloralCorner } from '@/components/decor/FloralCorner'
import { useReducedMotionPref } from '@/hooks/useReducedMotion'
import { formatDate } from '@/lib/datetime'
import type { EventItem } from '@/config/weddingConfig'

interface EventExperienceProps {
  event: EventItem
  index: number // 1-based position in the journey
  total: number
  prevSlug?: string
  nextSlug?: string
}

const easeSoft = [0.22, 1, 0.36, 1] as const

/**
 * A single ceremony's dedicated, themed page. Each event gets its own
 * background, accent colour, motif and dress code. Guests move through the
 * journey with Previous / Next controls (Tilak → … → Wedding).
 * Soft, rounded styling throughout; respects reduced motion.
 */
export function EventExperience({ event, index, total, prevSlug, nextSlug }: EventExperienceProps) {
  const reduced = useReducedMotionPref()
  const t = event.theme

  const fade = reduced
    ? { initial: false as const, animate: {} }
    : {
        initial: { opacity: 0, y: 26 },
        animate: { opacity: 1, y: 0 },
      }

  return (
    <main
      className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-4 py-20"
      style={{ background: t.background }}
    >
      {/* soft ambient light wash */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: t.daytime
            ? 'radial-gradient(60% 50% at 50% 30%, rgba(255,255,255,0.22), transparent 70%)'
            : 'radial-gradient(60% 50% at 50% 40%, rgba(231,204,138,0.14), transparent 70%)',
        }}
      />

      {/* floral corners, very soft */}
      <FloralCorner corner="tl" size={150} className="absolute left-0 top-0 opacity-30" />
      <FloralCorner corner="br" size={150} className="absolute bottom-0 right-0 opacity-30" />

      {/* journey progress */}
      <div className="absolute left-1/2 top-6 z-10 flex -translate-x-1/2 items-center gap-2">
        {Array.from({ length: total }).map((_, i) => (
          <span
            key={i}
            className="h-1.5 rounded-full transition-all duration-500"
            style={{
              width: i === index - 1 ? 26 : 8,
              background: i === index - 1 ? t.accent : 'rgba(255,255,255,0.35)',
            }}
            aria-hidden="true"
          />
        ))}
      </div>

      <motion.div
        {...fade}
        transition={{ duration: 0.9, ease: easeSoft }}
        className="relative z-10 flex w-full max-w-lg flex-col items-center text-center"
      >
        <p
          className="font-body text-xs uppercase tracking-[0.35em]"
          style={{ color: t.accent }}
        >
          Celebration {index} of {total}
        </p>

        <div className="my-4 text-5xl" aria-hidden="true">
          {t.motif}
        </div>

        <h1
          className="px-2 font-display text-5xl font-semibold leading-tight sm:text-7xl"
          style={{ color: t.daytime ? '#2a1a12' : '#FFF9F2' }}
        >
          {event.name}
        </h1>

        <p
          className="mt-4 font-script text-2xl"
          style={{ color: t.accent }}
        >
          {t.mood}
        </p>

        <div className="mt-6">
          <GoldDivider width={200} />
        </div>

        {/* details card — soft, rounded, frosted */}
        <div
          className="mt-8 w-full rounded-3xl border p-7 backdrop-blur-sm"
          style={{
            borderColor: 'rgba(255,255,255,0.18)',
            background: t.daytime ? 'rgba(255,255,255,0.18)' : 'rgba(0,0,0,0.22)',
          }}
        >
          <p
            className="font-display text-xl"
            style={{ color: t.daytime ? '#2a1a12' : '#FFF9F2' }}
          >
            {formatDate(event.dateTime)}
          </p>
          {event.timeLabel && (
            <p
              className="mt-1 font-body text-sm"
              style={{ color: t.daytime ? '#3a2a1f' : 'rgba(255,249,242,0.8)' }}
            >
              {event.timeLabel}
            </p>
          )}

          <div
            className="mx-auto my-5 h-px w-24"
            style={{ background: 'rgba(255,255,255,0.25)' }}
          />

          <p
            className="font-body text-base font-medium"
            style={{ color: t.daytime ? '#2a1a12' : '#FFF9F2' }}
          >
            {event.venue}
            {event.city ? `, ${event.city}` : ''}
          </p>
          {!event.venueConfirmed && (
            <span
              className="mt-2 inline-block rounded-full border px-3 py-0.5 font-body text-[0.65rem] uppercase tracking-[0.15em]"
              style={{ borderColor: t.accentSoft, color: t.daytime ? '#5a3a2a' : t.accentSoft }}
            >
              Venue to be confirmed
            </span>
          )}

          {event.invite && (
            <p
              className="mt-5 font-body text-sm italic leading-relaxed"
              style={{ color: t.daytime ? '#3a2a1f' : 'rgba(255,249,242,0.85)' }}
            >
              {event.invite}
            </p>
          )}

          {/* Dress code */}
          {event.dressCode && (
            <div
              className="mt-6 rounded-2xl p-4"
              style={{ background: t.daytime ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.06)' }}
            >
              <p
                className="font-body text-[0.7rem] uppercase tracking-[0.25em]"
                style={{ color: t.accent }}
              >
                Dress Code
              </p>
              {event.dressCode.note ? (
                <p
                  className="mt-2 font-body text-sm leading-relaxed"
                  style={{ color: t.daytime ? '#2a1a12' : '#FFF9F2' }}
                >
                  {event.dressCode.note}
                </p>
              ) : (
                <div className="mt-2 grid gap-2 sm:grid-cols-2">
                  <div>
                    <p className="font-body text-[0.7rem] uppercase tracking-[0.2em]" style={{ color: t.accentSoft }}>
                      Men
                    </p>
                    <p className="font-body text-sm" style={{ color: t.daytime ? '#2a1a12' : '#FFF9F2' }}>
                      {event.dressCode.men}
                    </p>
                  </div>
                  <div>
                    <p className="font-body text-[0.7rem] uppercase tracking-[0.2em]" style={{ color: t.accentSoft }}>
                      Women
                    </p>
                    <p className="font-body text-sm" style={{ color: t.daytime ? '#2a1a12' : '#FFF9F2' }}>
                      {event.dressCode.women}
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}

          {event.mapUrl && (
            <a
              href={event.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-full border px-6 py-2.5 font-body text-xs uppercase tracking-[0.2em] transition hover:opacity-80 focus-visible:outline"
              style={{ borderColor: t.accent, color: t.daytime ? '#2a1a12' : t.accent }}
            >
              Get Directions &rarr;
            </a>
          )}
        </div>

        {/* Journey navigation */}
        <div className="mt-10 flex w-full items-center justify-between gap-3">
          {prevSlug ? (
            <Link
              href={`/events/${prevSlug}`}
              className="rounded-full border px-5 py-2.5 font-body text-xs uppercase tracking-[0.18em] transition hover:opacity-80 focus-visible:outline"
              style={{ borderColor: 'rgba(255,255,255,0.3)', color: t.daytime ? '#2a1a12' : '#FFF9F2' }}
            >
              &larr; Previous
            </Link>
          ) : (
            <Link
              href="/events"
              className="rounded-full border px-5 py-2.5 font-body text-xs uppercase tracking-[0.18em] transition hover:opacity-80 focus-visible:outline"
              style={{ borderColor: 'rgba(255,255,255,0.3)', color: t.daytime ? '#2a1a12' : '#FFF9F2' }}
            >
              All events
            </Link>
          )}

          {nextSlug ? (
            <Link
              href={`/events/${nextSlug}`}
              className="rounded-full px-7 py-3 font-body text-xs font-medium uppercase tracking-[0.18em] shadow-gold transition hover:opacity-90 focus-visible:outline"
              style={{ background: t.accent, color: t.daytime ? '#2a1a12' : '#21191B' }}
            >
              Next &rarr;
            </Link>
          ) : (
            <Link
              href="/rsvp"
              className="rounded-full px-7 py-3 font-body text-xs font-medium uppercase tracking-[0.18em] shadow-gold transition hover:opacity-90 focus-visible:outline"
              style={{ background: t.accent, color: t.daytime ? '#2a1a12' : '#21191B' }}
            >
              RSVP &rarr;
            </Link>
          )}
        </div>
      </motion.div>
    </main>
  )
}
