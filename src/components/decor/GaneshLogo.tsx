interface GaneshLogoProps {
  className?: string
  /** Colour for the mark. */
  tone?: 'gold' | 'ivory' | 'green'
}

const toneColor: Record<NonNullable<GaneshLogoProps['tone']>, string> = {
  gold: '#C5A16A',
  ivory: '#FFF9F2',
  green: '#1F5A3A',
}

/**
 * "Shri Ganeshai Namah" mark — pure SVG so it ALWAYS renders (no external
 * image dependency, which was flickering). An Om glyph above an elegant
 * script line.
 */
export function GaneshLogo({ className, tone = 'gold' }: GaneshLogoProps) {
  const c = toneColor[tone]
  return (
    <svg
      viewBox="0 0 320 110"
      className={className}
      role="img"
      aria-label="Shri Ganeshai Namah"
    >
      {/* Om glyph */}
      <text
        x="160"
        y="42"
        textAnchor="middle"
        dominantBaseline="middle"
        fontFamily="'Noto Sans Devanagari', 'Noto Sans', system-ui, sans-serif"
        fontSize="44"
        fill={c}
      >
        ॐ
      </text>
      {/* small flanking flourishes */}
      <path d="M70 60 q40 -10 80 0" fill="none" stroke={c} strokeWidth="1" opacity="0.6" />
      <path d="M170 60 q40 -10 80 0" fill="none" stroke={c} strokeWidth="1" opacity="0.6" />
      {/* Script line */}
      <text
        x="160"
        y="88"
        textAnchor="middle"
        dominantBaseline="middle"
        fontFamily="var(--font-script), 'Cormorant Garamond', Georgia, serif"
        fontSize="30"
        fill={c}
      >
        Shri Ganeshai Namah
      </text>
    </svg>
  )
}
