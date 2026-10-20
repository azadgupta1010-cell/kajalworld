'use client'

import { useEffect, useState } from 'react'

export interface Countdown {
  days: number
  hours: number
  minutes: number
  seconds: number
  isPast: boolean
}

function compute(target: number): Countdown {
  const now = Date.now()
  let diff = Math.max(0, target - now)
  const isPast = target - now <= 0

  const days = Math.floor(diff / 86_400_000)
  diff -= days * 86_400_000
  const hours = Math.floor(diff / 3_600_000)
  diff -= hours * 3_600_000
  const minutes = Math.floor(diff / 60_000)
  diff -= minutes * 60_000
  const seconds = Math.floor(diff / 1000)

  return { days, hours, minutes, seconds, isPast }
}

/**
 * Live countdown to an ISO date string. Updates once per second.
 */
export function useCountdown(isoDate: string): Countdown {
  const target = new Date(isoDate).getTime()
  const [state, setState] = useState<Countdown>(() => compute(target))

  useEffect(() => {
    // If the target is already in the past, there is nothing to tick — avoid
    // setting up an interval entirely.
    if (compute(target).isPast) {
      setState(compute(target))
      return
    }

    const id = window.setInterval(() => {
      const next = compute(target)
      setState(next)
      // Stop ticking once we reach/cross the target.
      if (next.isPast) window.clearInterval(id)
    }, 1000)
    return () => window.clearInterval(id)
  }, [target])

  return state
}
