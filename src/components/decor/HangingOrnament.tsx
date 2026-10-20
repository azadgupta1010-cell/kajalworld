interface HangingOrnamentProps {
  className?: string
  /** Primary ornament colour. */
  color?: string
  /** Accent/bead colour. */
  accent?: string
  height?: number
}

/**
 * A decorative hanging ornament (jhumar / latkan) — a string of beads ending
 * in a tasselled bell, like the hanging decor in Indian wedding mandaps.
 * Purely decorative SVG; place at the top edge of a themed poster.
 */
export function HangingOrnament({
  className,
  color = '#C5A16A',
  accent = '#E3C891',
  height = 180,
}: HangingOrnamentProps) {
  return (
    <svg
      width="48"
      height={height}
      viewBox="0 0 48 180"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      {/* string */}
      <line x1="24" y1="0" x2="24" y2="70" stroke={color} strokeWidth="1.2" />
      {/* beads */}
      {[18, 30, 42, 54].map((y, i) => (
        <circle key={i} cx="24" cy={y} r={2.4} fill={accent} />
      ))}
      {/* top cap */}
      <path d="M16 70 Q24 62 32 70 L30 80 Q24 76 18 80 Z" fill={color} />
      {/* bell body */}
      <path
        d="M14 82 Q24 78 34 82 L38 118 Q24 128 10 118 Z"
        fill={color}
      />
      <path
        d="M14 82 Q24 78 34 82 L35 96 Q24 100 13 96 Z"
        fill={accent}
        opacity="0.5"
      />
      {/* bell rim */}
      <ellipse cx="24" cy="118" rx="14" ry="4" fill={accent} />
      <circle cx="24" cy="124" r="3" fill={color} />
      {/* tassels */}
      {[-10, -5, 0, 5, 10].map((dx, i) => (
        <line
          key={i}
          x1={24 + dx}
          y1="126"
          x2={24 + dx * 1.3}
          y2="168"
          stroke={color}
          strokeWidth="1.4"
          strokeLinecap="round"
        />
      ))}
      {[-13, -6.5, 0, 6.5, 13].map((dx, i) => (
        <circle key={`t${i}`} cx={24 + dx} cy="170" r="2.4" fill={accent} />
      ))}
    </svg>
  )
}
