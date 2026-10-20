'use client'

import { useCountdown } from '@/hooks/useCountdown'

function Unit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex min-w-[64px] flex-col items-center">
      <span className="font-display text-4xl font-semibold tabular-nums text-ivory sm:text-5xl">
        {String(value).padStart(2, '0')}
      </span>
      <span className="mt-1 font-body text-[0.65rem] uppercase tracking-[0.25em] text-gold-light/80">
        {label}
      </span>
    </div>
  )
}

interface CountdownProps {
  /** ISO date-time to count down to. */
  target: string
}

/**
 * Isolated live countdown. Only this component re-renders each second so the
 * surrounding Hero stays static. Styling is identical to the previous inline
 * Hero countdown box.
 */
export function Countdown({ target }: CountdownProps) {
  const cd = useCountdown(target)

  return (
    <div className="mt-10 flex items-center gap-4 rounded-2xl border border-gold/25 bg-black/20 px-6 py-5 backdrop-blur-sm sm:gap-7">
      {cd.isPast ? (
        <span className="font-display text-2xl text-gold-light">Celebrating today!</span>
      ) : (
        <>
          <Unit value={cd.days} label="Days" />
          <span className="font-display text-3xl text-gold/50">:</span>
          <Unit value={cd.hours} label="Hrs" />
          <span className="font-display text-3xl text-gold/50">:</span>
          <Unit value={cd.minutes} label="Min" />
          <span className="font-display text-3xl text-gold/50">:</span>
          <Unit value={cd.seconds} label="Sec" />
        </>
      )}
    </div>
  )
}
