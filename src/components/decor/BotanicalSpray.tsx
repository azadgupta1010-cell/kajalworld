interface BotanicalSprayProps {
  className?: string
  leaf?: string
  flower?: string
  size?: number
  flip?: boolean
}

/**
 * A leafy botanical spray with a few blossoms — used to frame the top of the
 * themed posters (like the greenery/floral garland in the reference images).
 * Decorative only.
 */
export function BotanicalSpray({
  className,
  leaf = '#5E8C63',
  flower = '#E8A0B4',
  size = 200,
  flip = false,
}: BotanicalSprayProps) {
  return (
    <svg
      width={size}
      height={size * 0.6}
      viewBox="0 0 200 120"
      className={className}
      style={{ transform: flip ? 'scaleX(-1)' : undefined }}
      aria-hidden="true"
      focusable="false"
    >
      {/* main stem */}
      <path
        d="M4 110 C 50 96, 90 70, 120 36 C 140 14, 170 8, 196 6"
        fill="none"
        stroke={leaf}
        strokeWidth="2"
        strokeLinecap="round"
      />
      {/* leaves along stem */}
      {[
        { x: 40, y: 96, r: -25, s: 1 },
        { x: 70, y: 82, r: -40, s: 0.9 },
        { x: 100, y: 58, r: -55, s: 1.1 },
        { x: 128, y: 34, r: -60, s: 0.9 },
        { x: 158, y: 16, r: -70, s: 0.8 },
        { x: 60, y: 92, r: 30, s: 0.8 },
        { x: 92, y: 66, r: 20, s: 0.9 },
        { x: 120, y: 42, r: 10, s: 0.8 },
      ].map((l, i) => (
        <path
          key={i}
          d="M0 0 C 10 -8, 26 -6, 32 0 C 26 6, 10 8, 0 0 Z"
          fill={leaf}
          opacity="0.9"
          transform={`translate(${l.x} ${l.y}) rotate(${l.r}) scale(${l.s})`}
        />
      ))}
      {/* blossoms */}
      {[
        { x: 118, y: 34, s: 1 },
        { x: 150, y: 20, s: 0.8 },
        { x: 84, y: 70, s: 0.7 },
      ].map((f, i) => (
        <g key={i} transform={`translate(${f.x} ${f.y}) scale(${f.s})`}>
          {[0, 72, 144, 216, 288].map((a) => (
            <ellipse key={a} cx="0" cy="-6" rx="4" ry="7" fill={flower} transform={`rotate(${a})`} />
          ))}
          <circle cx="0" cy="0" r="2.6" fill="#E3C891" />
        </g>
      ))}
    </svg>
  )
}
