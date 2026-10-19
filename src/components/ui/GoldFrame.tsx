import type { ReactNode } from 'react'
import { FloralCorner } from '@/components/decor/FloralCorner'

interface GoldFrameProps {
  children: ReactNode
  className?: string
  withFlorals?: boolean
}

/**
 * A reusable card surface with a champagne-gold double border and optional
 * floral corner ornaments. Used by the invitation card and event cards.
 */
export function GoldFrame({ children, className = '', withFlorals = true }: GoldFrameProps) {
  return (
    <div
      className={
        'relative rounded-[6px] bg-gradient-to-b from-ivory to-blush/90 text-rose-deep ' +
        'shadow-card ' +
        className
      }
      style={{
        boxShadow:
          '0 24px 60px -20px rgba(0,0,0,0.55), inset 0 0 0 1px rgba(201,162,75,0.6)',
      }}
    >
      {/* inner gold hairline frame */}
      <div
        className="pointer-events-none absolute inset-[10px] rounded-[4px]"
        style={{ boxShadow: 'inset 0 0 0 1px rgba(164,126,46,0.55)' }}
      />

      {withFlorals && (
        <>
          <FloralCorner corner="tl" size={88} className="pointer-events-none absolute left-1 top-1 opacity-90" />
          <FloralCorner corner="tr" size={88} className="pointer-events-none absolute right-1 top-1 opacity-90" />
          <FloralCorner corner="bl" size={88} className="pointer-events-none absolute bottom-1 left-1 opacity-90" />
          <FloralCorner corner="br" size={88} className="pointer-events-none absolute bottom-1 right-1 opacity-90" />
        </>
      )}

      <div className="relative z-10">{children}</div>
    </div>
  )
}
