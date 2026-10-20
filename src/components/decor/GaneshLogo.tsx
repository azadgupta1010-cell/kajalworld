'use client'

import { useState } from 'react'
import { weddingConfig } from '@/config/weddingConfig'

interface GaneshLogoProps {
  className?: string
  /** Colour for the fallback text version. */
  tone?: 'gold' | 'ivory' | 'green'
}

const toneColor: Record<NonNullable<GaneshLogoProps['tone']>, string> = {
  gold: '#E3C891',
  ivory: '#FFF9F2',
  green: '#0E3A2A',
}

/**
 * Shri Ganeshai Namah mark. Uses the real uploaded logo image when present at
 * weddingConfig.assets.ganeshLogo; if the file is missing it degrades to an
 * elegant text fallback so the page is never broken and nothing is faked.
 *
 * To use the real logo: drop the file at /public/media/ganesh-logo.png
 */
export function GaneshLogo({ className, tone = 'gold' }: GaneshLogoProps) {
  const src = weddingConfig.assets.ganeshLogo
  const [failed, setFailed] = useState(false)

  if (src && !failed) {
    // eslint-disable-next-line @next/next/no-img-element
    return (
      <img
        src={src}
        alt="Shri Ganeshai Namah"
        className={className}
        onError={() => setFailed(true)}
        loading="eager"
      />
    )
  }

  // Elegant text fallback
  return (
    <svg
      viewBox="0 0 320 70"
      className={className}
      role="img"
      aria-label="Shri Ganeshai Namah"
    >
      <text
        x="160"
        y="40"
        textAnchor="middle"
        dominantBaseline="middle"
        fontFamily="'Pinyon Script', 'Cormorant Garamond', Georgia, serif"
        fontSize="38"
        fill={toneColor[tone]}
      >
        Shri Ganeshai Namah
      </text>
    </svg>
  )
}
