interface FloralCornerProps {
  className?: string
  /** Which corner: controls rotation */
  corner?: 'tl' | 'tr' | 'bl' | 'br'
  size?: number
}

const rotation: Record<NonNullable<FloralCornerProps['corner']>, number> = {
  tl: 0,
  tr: 90,
  br: 180,
  bl: 270,
}

/**
 * Original decorative floral + gold-leaf corner ornament (pure SVG).
 * No personal text is baked in — purely decorative.
 */
export function FloralCorner({ className, corner = 'tl', size = 120 }: FloralCornerProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      className={className}
      style={{ transform: `rotate(${rotation[corner]}deg)` }}
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id="fc-gold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#E7CC8A" />
          <stop offset="0.5" stopColor="#C9A24B" />
          <stop offset="1" stopColor="#A47E2E" />
        </linearGradient>
        <radialGradient id="fc-petal" cx="0.4" cy="0.35" r="0.8">
          <stop offset="0" stopColor="#F7E3E8" />
          <stop offset="0.6" stopColor="#D8A0AD" />
          <stop offset="1" stopColor="#B56576" />
        </radialGradient>
      </defs>

      {/* Gold sweeping stem */}
      <path
        d="M6 6 C 40 10, 70 24, 96 52 C 104 60, 110 74, 112 90"
        fill="none"
        stroke="url(#fc-gold)"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      <path
        d="M6 6 C 10 40, 24 70, 52 96 C 60 104, 74 110, 90 112"
        fill="none"
        stroke="url(#fc-gold)"
        strokeWidth="2.4"
        strokeLinecap="round"
      />

      {/* Gold leaves */}
      {[
        { x: 30, y: 20, r: -20 },
        { x: 20, y: 30, r: 65 },
        { x: 64, y: 44, r: 5 },
        { x: 44, y: 64, r: 85 },
      ].map((l, i) => (
        <path
          key={i}
          d="M0 0 C 8 -6, 18 -4, 22 0 C 18 4, 8 6, 0 0 Z"
          fill="url(#fc-gold)"
          opacity="0.9"
          transform={`translate(${l.x} ${l.y}) rotate(${l.r})`}
        />
      ))}

      {/* Blush flowers (layered petals) */}
      {[
        { x: 16, y: 16, s: 1.1 },
        { x: 54, y: 30, s: 0.8 },
        { x: 30, y: 54, s: 0.8 },
      ].map((f, i) => (
        <g key={i} transform={`translate(${f.x} ${f.y}) scale(${f.s})`}>
          {[0, 72, 144, 216, 288].map((a) => (
            <ellipse
              key={a}
              cx="0"
              cy="-7"
              rx="4.5"
              ry="8"
              fill="url(#fc-petal)"
              transform={`rotate(${a})`}
            />
          ))}
          <circle cx="0" cy="0" r="3.2" fill="#E7CC8A" />
        </g>
      ))}
    </svg>
  )
}
