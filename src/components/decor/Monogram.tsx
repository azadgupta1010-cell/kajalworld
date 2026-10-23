interface MonogramProps {
  className?: string
  /** Colour tone for the mark. */
  tone?: 'gold' | 'ivory' | 'rose'
  size?: number
}

const tones: Record<NonNullable<MonogramProps['tone']>, { ring: string; letters: string; amp: string }> = {
  gold: { ring: '#C5A16A', letters: '#E3C891', amp: '#C5A16A' },
  ivory: { ring: '#E3C891', letters: '#FFF9F2', amp: '#E3C891' },
  rose: { ring: '#C5A16A', letters: '#9D294B', amp: '#C5A16A' },
}

/**
 * Permanent K & D wedding monogram crest (pure SVG — always renders, never
 * depends on an external image). An ornate gold ring enclosing the couple's
 * initials with a script ampersand. Used on the intro and throughout.
 */
export function Monogram({ className, tone = 'gold', size = 120 }: MonogramProps) {
  const c = tones[tone]
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

      {/* outer ring */}
      <circle cx="60" cy="60" r="52" fill="none" stroke="url(#mono-gold)" strokeWidth="1.5" />
      <circle cx="60" cy="60" r="46" fill="none" stroke="url(#mono-gold)" strokeWidth="2.5" />
      {/* little dots around */}
      {Array.from({ length: 24 }).map((_, i) => {
        const a = (i / 24) * Math.PI * 2
        return <circle key={i} cx={60 + Math.cos(a) * 49} cy={60 + Math.sin(a) * 49} r="0.9" fill={c.ring} />
      })}

      {/* top & bottom flourishes */}
      <path d="M44 14 Q60 6 76 14" fill="none" stroke="url(#mono-gold)" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="60" cy="9" r="2" fill={c.ring} />
      <path d="M44 106 Q60 114 76 106" fill="none" stroke="url(#mono-gold)" strokeWidth="1.5" strokeLinecap="round" />

      {/* Initials K & D */}
      <text
        x="40"
        y="68"
        textAnchor="middle"
        fontFamily="var(--font-display), Georgia, serif"
        fontSize="42"
        fontWeight="600"
        fontStyle="italic"
        fill={c.letters}
      >
        K
      </text>
      <text
        x="60"
        y="66"
        textAnchor="middle"
        fontFamily="var(--font-script), cursive"
        fontSize="26"
        fill={c.amp}
      >
        &amp;
      </text>
      <text
        x="80"
        y="68"
        textAnchor="middle"
        fontFamily="var(--font-display), Georgia, serif"
        fontSize="42"
        fontWeight="600"
        fontStyle="italic"
        fill={c.letters}
      >
        D
      </text>
    </svg>
  )
}
