'use client'

import { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { HangingOrnament } from '@/components/decor/HangingOrnament'
import { BotanicalSpray } from '@/components/decor/BotanicalSpray'
import { MandalaCorner } from '@/components/decor/MandalaCorner'
import { useReducedMotionPref } from '@/hooks/useReducedMotion'
import { formatDate } from '@/lib/datetime'
import { weddingConfig, type EventItem } from '@/config/weddingConfig'

interface EventExperienceProps {
  event: EventItem
  index: number
  total: number
  prevSlug?: string
  nextSlug?: string
}

const easeSoft = [0.16, 1, 0.3, 1] as const

/**
 * A single ceremony's dedicated, poster-style themed page — layered with
 * hanging ornaments, botanical sprays and mandala corners (inspired by the
 * reference invitation posters), modern typography, and the guided journey
 * navigation. Each event has its own colours and ornament palette.
 */
export function EventExperience({ event, index, total, prevSlug, nextSlug }: EventExperienceProps) {
  const reduced = useReducedMotionPref()
  const router = useRouter()
  const t = event.theme
  const d = t.decor ?? { ornament: '#C5A16A', ornamentAccent: '#E3C891', leaf: '#5E8C63', flower: '#E8A0B4' }
  const { couple } = weddingConfig

  // Background photo: only shown if the file actually loads (graceful fallback
  // to the gradient otherwise — never a broken image).
  const [bgLoaded, setBgLoaded] = useState(false)
  useEffect(() => {
    if (!t.backgroundImage) return
    const img = new Image()
    img.onload = () => setBgLoaded(true)
    img.onerror = () => setBgLoaded(false)
    img.src = t.backgroundImage
  }, [t.backgroundImage])

  // With a photo background, force dark-scrim readable text.
  const onPhoto = !!t.backgroundImage && bgLoaded
  const ink = onPhoto ? '#FFF9F2' : t.daytime ? '#3A2416' : '#FFF9F2'
  const inkSoft = onPhoto ? 'rgba(255,249,242,0.9)' : t.daytime ? 'rgba(58,36,22,0.82)' : 'rgba(255,249,242,0.86)'

  // Destination when moving forward: next event, or the main website at the end.
  const goNext = useCallback(() => {
    router.push(nextSlug ? `/events/${nextSlug}` : '/')
  }, [router, nextSlug])
  const goPrev = useCallback(() => {
    if (prevSlug) router.push(`/events/${prevSlug}`)
  }, [router, prevSlug])

  // Prefetch neighbours for instant transitions.
  useEffect(() => {
    if (nextSlug) router.prefetch(`/events/${nextSlug}`)
    if (prevSlug) router.prefetch(`/events/${prevSlug}`)
  }, [router, nextSlug, prevSlug])

  // Keyboard: arrows / space advance, left goes back.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'Enter') {
        e.preventDefault()
        goNext()
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault()
        goPrev()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [goNext, goPrev])

  const container = reduced
    ? { initial: false as const, animate: {} }
    : {
        initial: 'hidden' as const,
        animate: 'show' as const,
        variants: { hidden: {}, show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } } },
      }
  const rise = reduced
    ? {}
    : {
        variants: {
          hidden: { opacity: 0, y: 16 },
          show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: easeSoft } },
        },
      }

  return (
    <main
      className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-4 py-16"
      style={{ background: t.background }}
    >
      {/* Optional full-page background photo + readability scrim */}
      {onPhoto && (
        <>
          <div
            className="pointer-events-none absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${t.backgroundImage})` }}
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                'linear-gradient(180deg, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.25) 40%, rgba(0,0,0,0.6) 100%)',
            }}
            aria-hidden="true"
          />
        </>
      )}

      {/* Full-screen tap navigation: left half = previous, right half = next.
          Sits beneath the content (z-0) so links/buttons still work. */}
      <button
        type="button"
        onClick={goPrev}
        aria-label="Previous celebration"
        disabled={!prevSlug}
        className="absolute inset-y-0 left-0 z-0 w-1/3 cursor-w-resize focus-visible:outline"
        tabIndex={-1}
      />
      <button
        type="button"
        onClick={goNext}
        aria-label={nextSlug ? 'Next celebration' : 'Enter the website'}
        className="absolute inset-y-0 right-0 z-0 w-2/3 cursor-e-resize focus-visible:outline"
        tabIndex={-1}
      />
      {/* paper grain / vignette */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: t.daytime
            ? 'radial-gradient(70% 55% at 50% 30%, rgba(255,255,255,0.32), transparent 72%)'
            : 'radial-gradient(70% 55% at 50% 38%, rgba(231,204,138,0.15), transparent 72%)',
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            'radial-gradient(circle at 25% 15%, #000 0.5px, transparent 0.5px), radial-gradient(circle at 75% 60%, #000 0.5px, transparent 0.5px)',
          backgroundSize: '12px 12px, 16px 16px',
        }}
      />

      {/* Hanging ornaments from the top */}
      <HangingOrnament color={d.ornament} accent={d.ornamentAccent} height={170} className="pointer-events-none absolute left-[8%] top-0 opacity-90" />
      <HangingOrnament color={d.ornament} accent={d.ornamentAccent} height={210} className="pointer-events-none absolute left-[20%] top-0 hidden opacity-80 sm:block" />
      <HangingOrnament color={d.ornament} accent={d.ornamentAccent} height={190} className="pointer-events-none absolute right-[10%] top-0 opacity-90" />
      <HangingOrnament color={d.ornament} accent={d.ornamentAccent} height={150} className="pointer-events-none absolute right-[22%] top-0 hidden opacity-80 sm:block" />

      {/* Mandala corners bottom */}
      <MandalaCorner corner="bl" color={d.ornament} size={200} className="pointer-events-none absolute bottom-0 left-0 opacity-30" />
      <MandalaCorner corner="br" color={d.ornament} size={200} className="pointer-events-none absolute bottom-0 right-0 opacity-30" />

      {/* journey progress */}
      <div className="absolute left-1/2 top-5 z-20 flex -translate-x-1/2 items-center gap-2">
        {Array.from({ length: total }).map((_, i) => (
          <span
            key={i}
            className="h-1.5 rounded-full transition-all duration-500"
            style={{ width: i === index - 1 ? 26 : 8, background: i === index - 1 ? d.ornamentAccent : 'rgba(255,255,255,0.4)' }}
            aria-hidden="true"
          />
        ))}
      </div>

      <motion.div
        {...container}
        className="pointer-events-none relative z-10 flex w-full max-w-xl flex-col items-center text-center"
      >
        <motion.p {...rise} className="font-body text-[0.7rem] font-medium uppercase tracking-[0.4em]" style={{ color: d.ornamentAccent }}>
          You&apos;re invited to
        </motion.p>

        {/* Title framed by botanical sprays */}
        <motion.div {...rise} className="relative mt-2 flex items-center justify-center">
          <BotanicalSpray leaf={d.leaf} flower={d.flower} size={120} className="absolute -left-4 -top-6 hidden opacity-90 sm:block" />
          <BotanicalSpray leaf={d.leaf} flower={d.flower} size={120} flip className="absolute -right-4 -top-6 hidden opacity-90 sm:block" />
          <h1
            className="font-display text-6xl font-semibold uppercase italic leading-[0.92] tracking-tight sm:text-8xl"
            style={{ color: t.titleColor ?? ink, textShadow: '0 2px 20px rgba(0,0,0,0.2)' }}
          >
            {event.name}
          </h1>
        </motion.div>

        {t.tagline && (
          <motion.p {...rise} className="mt-3 font-script text-3xl sm:text-4xl" style={{ color: d.ornamentAccent }}>
            {t.tagline}
          </motion.p>
        )}

        {t.vibeWords && (
          <motion.div {...rise} className="mt-4 flex flex-wrap items-center justify-center gap-x-3 gap-y-1">
            {t.vibeWords.map((w, i) => (
              <span key={w} className="flex items-center gap-3">
                <span className="font-script text-xl sm:text-2xl" style={{ color: ink }}>{w}</span>
                {i < t.vibeWords!.length - 1 && <span style={{ color: d.ornamentAccent }} aria-hidden="true">✦</span>}
              </span>
            ))}
          </motion.div>
        )}

        {/* couple name band (brushy pill) */}
        <motion.div
          {...rise}
          className="mt-6 rounded-full px-10 py-2.5"
          style={{
            background: t.daytime
              ? 'linear-gradient(90deg, transparent, rgba(192,30,99,0.22), transparent)'
              : 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)',
          }}
        >
          <p className="font-script text-4xl sm:text-5xl" style={{ color: t.titleColor ?? ink }}>
            {couple.bride.name} &amp; {couple.groom.name}
          </p>
        </motion.div>

        {/* date */}
        <motion.div {...rise} className="mt-5 flex items-center justify-center gap-2 font-body text-sm" style={{ color: inkSoft }}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={d.ornamentAccent} strokeWidth="1.6" aria-hidden="true"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>
          {formatDate(event.dateTime)}{event.timeLabel ? ` · ${event.timeLabel}` : ''}
        </motion.div>

        {/* venue — highlighted banner when flagged, else a simple line */}
        {event.highlightVenue ? (
          <motion.div
            {...rise}
            className="mt-4 rounded-2xl border px-6 py-3"
            style={{
              borderColor: d.ornamentAccent,
              background: onPhoto ? 'rgba(0,0,0,0.3)' : 'rgba(255,255,255,0.08)',
            }}
          >
            <p className="font-body text-[0.65rem] uppercase tracking-[0.3em]" style={{ color: d.ornamentAccent }}>
              Venue
            </p>
            <p className="mt-1 font-display text-2xl font-semibold" style={{ color: ink }}>
              {event.venue}
            </p>
            {event.city && (
              <p className="font-body text-sm" style={{ color: inkSoft }}>
                {event.city}
              </p>
            )}
          </motion.div>
        ) : (
          <motion.div {...rise} className="mt-3 flex items-center justify-center gap-2 font-body text-sm" style={{ color: inkSoft }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={d.ornamentAccent} strokeWidth="1.6" aria-hidden="true"><path d="M12 21s-7-6.2-7-11a7 7 0 1114 0c0 4.8-7 11-7 11z"/><circle cx="12" cy="10" r="2.5"/></svg>
            {event.venue}{event.city ? `, ${event.city}` : ''}
          </motion.div>
        )}

        {!event.venueConfirmed && (
          <motion.span {...rise} className="mt-3 inline-block rounded-full border px-3 py-0.5 font-body text-[0.65rem] uppercase tracking-[0.15em]" style={{ borderColor: d.ornamentAccent, color: inkSoft }}>
            Venue to be confirmed
          </motion.span>
        )}

        {t.quote && (
          <motion.p {...rise} className="mt-5 max-w-md font-serif text-lg italic leading-relaxed" style={{ color: inkSoft }}>
            “{t.quote}”
          </motion.p>
        )}

        {event.dressCode && (
          <motion.div
            {...rise}
            className="mt-6 w-full max-w-md rounded-3xl border p-5 backdrop-blur-[2px]"
            style={{
              borderColor: t.daytime ? 'rgba(157,41,75,0.25)' : 'rgba(255,255,255,0.18)',
              background: t.daytime ? 'rgba(255,255,255,0.32)' : 'rgba(255,255,255,0.06)',
            }}
          >
            <p className="font-body text-[0.7rem] font-semibold uppercase tracking-[0.25em]" style={{ color: d.ornamentAccent }}>Dress Code</p>
            {event.dressCode.note ? (
              <p className="mt-2 font-serif text-base leading-relaxed" style={{ color: ink }}>{event.dressCode.note}</p>
            ) : (
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                <div>
                  <p className="font-body text-[0.7rem] uppercase tracking-[0.2em]" style={{ color: inkSoft }}>Men</p>
                  <p className="mt-0.5 font-serif text-base" style={{ color: ink }}>{event.dressCode.men}</p>
                </div>
                <div>
                  <p className="font-body text-[0.7rem] uppercase tracking-[0.2em]" style={{ color: inkSoft }}>Women</p>
                  <p className="mt-0.5 font-serif text-base" style={{ color: ink }}>{event.dressCode.women}</p>
                </div>
              </div>
            )}
          </motion.div>
        )}

        {t.footline && (
          <motion.p {...rise} className="mt-6 font-body text-[0.65rem] font-medium uppercase tracking-[0.3em]" style={{ color: inkSoft }}>
            {t.footline}
          </motion.p>
        )}

        {event.mapUrl && (
          <motion.a
            {...rise}
            href={event.mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="pointer-events-auto mt-6 inline-flex items-center gap-2 rounded-full border px-6 py-2.5 font-body text-xs font-medium uppercase tracking-[0.2em] transition hover:opacity-80 focus-visible:outline"
            style={{ borderColor: d.ornamentAccent, color: ink }}
            onClick={(e) => e.stopPropagation()}
          >
            Get Directions &rarr;
          </motion.a>
        )}

        {/* subtle progress + forward cue (no instructional text) */}
        <motion.div {...rise} className="mt-10 flex flex-col items-center gap-3">
          <motion.span
            aria-hidden="true"
            className="text-2xl"
            style={{ color: d.ornamentAccent }}
            animate={reduced ? undefined : { x: [0, 6, 0] }}
            transition={reduced ? undefined : { duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          >
            →
          </motion.span>
          <span className="font-body text-[0.65rem] uppercase tracking-[0.25em]" style={{ color: inkSoft }}>
            {index} / {total}
          </span>
        </motion.div>
      </motion.div>
    </main>
  )
}
