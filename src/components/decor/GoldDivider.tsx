interface GoldDividerProps {
  className?: string
  width?: number
}

/**
 * Ornamental gold divider with a central motif. Purely decorative.
 */
export function GoldDivider({ className, width = 240 }: GoldDividerProps) {
  return (
    <svg
      width={width}
      height="24"
      viewBox="0 0 240 24"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id="gd-gold" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#A47E2E" stopOpacity="0" />
          <stop offset="0.2" stopColor="#C9A24B" />
          <stop offset="0.5" stopColor="#E7CC8A" />
          <stop offset="0.8" stopColor="#C9A24B" />
          <stop offset="1" stopColor="#A47E2E" stopOpacity="0" />
        </linearGradient>
      </defs>
      <line x1="10" y1="12" x2="100" y2="12" stroke="url(#gd-gold)" strokeWidth="1.4" />
      <line x1="140" y1="12" x2="230" y2="12" stroke="url(#gd-gold)" strokeWidth="1.4" />
      {/* central diamond + petals */}
      <g transform="translate(120 12)">
        <path d="M0 -8 L6 0 L0 8 L-6 0 Z" fill="#E7CC8A" />
        <circle cx="0" cy="0" r="2" fill="#6E162F" />
        <circle cx="-14" cy="0" r="2.2" fill="#C9A24B" />
        <circle cx="14" cy="0" r="2.2" fill="#C9A24B" />
      </g>
    </svg>
  )
}
