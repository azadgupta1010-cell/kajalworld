interface MandalaCornerProps {
  className?: string
  color?: string
  size?: number
  /** Rotation so it can sit in any corner. */
  corner?: 'tl' | 'tr' | 'bl' | 'br'
}

const rot: Record<NonNullable<MandalaCornerProps['corner']>, number> = {
  tl: 0,
  tr: 90,
  br: 180,
  bl: 270,
}

/**
 * A quarter-mandala ornament for page corners (like the mandala motifs along
 * the bottom of the reference Haldi poster). Concentric petals + dots, drawn
 * as an intricate but lightweight SVG. Decorative only.
 */
export function MandalaCorner({ className, color = '#C5A16A', size = 220, corner = 'bl' }: MandalaCornerProps) {
  const petals = Array.from({ length: 7 }, (_, i) => {
    const a = (i / 12) * 90 // spread across a quarter
    return a
  })

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      className={className}
      style={{ transform: `rotate(${rot[corner]}deg)` }}
      aria-hidden="true"
      focusable="false"
    >
      <g fill="none" stroke={color} strokeWidth="1.1" opacity="0.9">
        {/* concentric arcs */}
        {[40, 70, 100, 130, 160].map((r) => (
          <path key={r} d={`M0 ${r} A ${r} ${r} 0 0 0 ${r} 0`} />
        ))}
        {/* radiating petals */}
        {petals.map((a, i) => {
          const rad = (a * Math.PI) / 180
          const x1 = Math.cos(rad) * 36
          const y1 = Math.sin(rad) * 36
          const x2 = Math.cos(rad) * 150
          const y2 = Math.sin(rad) * 150
          const mx = Math.cos(rad) * 95
          const my = Math.sin(rad) * 95
          const perp = rad + Math.PI / 2
          const ox = Math.cos(perp) * 14
          const oy = Math.sin(perp) * 14
          return (
            <path
              key={i}
              d={`M${x1} ${y1} Q ${mx + ox} ${my + oy} ${x2} ${y2} Q ${mx - ox} ${my - oy} ${x1} ${y1} Z`}
            />
          )
        })}
      </g>
      {/* bead dots along outer arc */}
      <g fill={color} opacity="0.8">
        {petals.map((a, i) => {
          const rad = (a * Math.PI) / 180
          return <circle key={i} cx={Math.cos(rad) * 170} cy={Math.sin(rad) * 170} r="2.4" />
        })}
      </g>
    </svg>
  )
}
