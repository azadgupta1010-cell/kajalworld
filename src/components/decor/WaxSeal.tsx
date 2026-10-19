interface WaxSealProps {
  /** Short monogram, e.g. 'A & R' or initials 'AR' */
  monogram: string
  size?: number
  className?: string
}

/**
 * Gold-rimmed wax seal with an embossed monogram (selectable-free decorative
 * SVG text — the authoritative names live in config/HTML, this is ornamental).
 */
export function WaxSeal({ monogram, size = 92, className }: WaxSealProps) {
  const points = Array.from({ length: 20 }, (_, i) => {
    const angle = (i / 20) * Math.PI * 2
    const wobble = i % 2 === 0 ? 46 : 42
    const x = 50 + Math.cos(angle) * wobble
    const y = 50 + Math.sin(angle) * wobble
    return `${x.toFixed(1)},${y.toFixed(1)}`
  }).join(' ')

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={className}
      role="img"
      aria-label="Wax seal"
    >
      <defs>
        <radialGradient id="ws-wax" cx="0.4" cy="0.35" r="0.75">
          <stop offset="0" stopColor="#A4325A" />
          <stop offset="0.6" stopColor="#7A1F3D" />
          <stop offset="1" stopColor="#56132B" />
        </radialGradient>
        <linearGradient id="ws-gold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#F3E2B0" />
          <stop offset="0.5" stopColor="#C9A24B" />
          <stop offset="1" stopColor="#A47E2E" />
        </linearGradient>
      </defs>

      <polygon points={points} fill="url(#ws-wax)" />
      <circle cx="50" cy="50" r="38" fill="none" stroke="url(#ws-gold)" strokeWidth="2.5" />
      <circle cx="50" cy="50" r="33" fill="none" stroke="url(#ws-gold)" strokeWidth="1" opacity="0.7" />

      <text
        x="50"
        y="50"
        textAnchor="middle"
        dominantBaseline="central"
        fontFamily="'Cormorant Garamond', serif"
        fontSize={monogram.length > 3 ? 20 : 26}
        fontWeight="600"
        fill="url(#ws-gold)"
      >
        {monogram}
      </text>

      {/* soft highlight */}
      <ellipse cx="38" cy="34" rx="16" ry="10" fill="#ffffff" opacity="0.12" />
    </svg>
  )
}
