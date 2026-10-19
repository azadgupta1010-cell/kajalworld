import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { renderHook } from '@testing-library/react'
import { useCountdown } from '@/hooks/useCountdown'

describe('useCountdown', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2026-01-01T00:00:00+05:30'))
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('reports a future date as not past with a sane day count', () => {
    // 11 days ahead.
    const { result } = renderHook(() => useCountdown('2026-01-12T00:00:00+05:30'))
    expect(result.current.isPast).toBe(false)
    expect(result.current.days).toBe(11)
    expect(result.current.hours).toBeGreaterThanOrEqual(0)
    expect(result.current.hours).toBeLessThan(24)
  })

  it('reports a past date as past with zeroed values', () => {
    const { result } = renderHook(() => useCountdown('2025-01-01T00:00:00+05:30'))
    expect(result.current.isPast).toBe(true)
    expect(result.current.days).toBe(0)
    expect(result.current.hours).toBe(0)
    expect(result.current.minutes).toBe(0)
    expect(result.current.seconds).toBe(0)
  })
})
