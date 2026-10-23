'use client'

import { useState } from 'react'
import { mediaUrl } from '@/lib/env'

interface MonogramProps {
  className?: string
  /** Colour tone for the SVG fallback mark. */
  tone?: 'gold' | 'ivory' | 'rose'
  size?: number
  /**
   * How to blend a photographic logo that has a light/cream background so the
   * background disappears on a dark stage. 'screen' makes light areas show and
   * dark vanish; 'normal' = no blend (use for transparent PNGs).
   */
  blend?: 'screen' | 'multiply' | 'normal'
}

/** Real K&D logo, served from the Supabase media bucket. */
const LOGO_SRC = mediaUrl('/media/kd-logo.png')

const tones: Record<NonNullable<MonogramProps['tone']>, { ring: string; letters: string; amp: string }> = {
  gold: { ring: '#C5A16A', letters: '#E3C891', amp: '#C5A16A' },
  ivory: { ring: '#E3C891', letters: '#FFF9F2', amp: '#E3C891' },
  rose: { ring: '#C5A16A', letters: '#9D294B', amp: '#C5A16A' },
}

/**
 * K & D wedding monogram. Uses the real logo image at /media/kd-logo.png when
 * present; if the file is a photo with a cream background, the `blend` prop
 * lets the background melt into a dark stage without editing the file. Falls
 * back to a pure-SVG crest (always renders) when the file is missing.
 */
export function Monogram({ className, tone = 'gold', size = 120, blend = 'screen' }: MonogramProps) {
  const c = tones[tone]
  const [failed, setFailed] = useState(false)

  if (!failed) {
    // eslint-disable-next-line @next/next/no-img-element
    return (
      <img
        src={LOGO_SRC}
        alt="Kajal & Daya Sagar monogram"
        width={size}
        height={size}
        onError={() => setFailed(true)}
        className={className}
        style={{
          width: size,
          height: 'auto',
          mixBlendMode: blend === 'normal' ? undefined : blend,
        }}
      />
    )
  }

  // Pure-SVG fallback crest
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      className={className}
      role="img"
      aria-label="K and D monogram"
    >
      <defs>
        <linearGradient id="mono-gold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#F3E2B0" />
          <stop offset="0.5" stopColor={c.ring} />
          <stop offset="1" stopColor="#A5824A" />
        </linearGradient>
      </defs>

      <circle cx="60" cy="60" r="52" fill="none" stroke="url(#mono-gold)" strokeWidth="1.5" />
      <circle cx="60" cy="60" r="46" fill="none" stroke="url(#mono-gold)" strokeWidth="2.5" />
      {Array.from({ length: 24 }).map((_, i) => {
        const a = (i / 24) * Math.PI * 2
        return <circle key={i} cx={60 + Math.cos(a) * 49} cy={60 + Math.sin(a) * 49} r="0.9" fill={c.ring} />
      })}

      <path d="M44 14 Q60 6 76 14" fill="none" stroke="url(#mono-gold)" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="60" cy="9" r="2" fill={c.ring} />
      <path d="M44 106 Q60 114 76 106" fill="none" stroke="url(#mono-gold)" strokeWidth="1.5" strokeLinecap="round" />

      <text x="40" y="68" textAnchor="middle" fontFamily="var(--font-display), Georgia, serif" fontSize="42" fontWeight="600" fontStyle="italic" fill={c.letters}>K</text>
      <text x="60" y="66" textAnchor="middle" fontFamily="var(--font-script), cursive" fontSize="26" fill={c.amp}>&amp;</text>
      <text x="80" y="68" textAnchor="middle" fontFamily="var(--font-display), Georgia, serif" fontSize="42" fontWeight="600" fontStyle="italic" fill={c.letters}>D</text>
    </svg>
  )
}
