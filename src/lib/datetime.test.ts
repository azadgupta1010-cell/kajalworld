import { describe, it, expect } from 'vitest'
import { formatDate, formatTime, formatDateTime } from '@/lib/datetime'

// Wedding: 4 Dec 2026, 7:00 pm IST.
const WEDDING_ISO = '2026-12-04T19:00:00+05:30'

describe('datetime helpers (Asia/Kolkata)', () => {
  it('formatDate renders the IST calendar date', () => {
    const out = formatDate(WEDDING_ISO)
    expect(out).toContain('December')
    expect(out).toContain('2026')
    expect(out).toContain('4')
    expect(out).toContain('Friday')
  })

  it('formatTime renders 7:00 pm in IST', () => {
    const out = formatTime(WEDDING_ISO).toLowerCase()
    expect(out).toContain('7:00')
    expect(out).toContain('pm')
  })

  it('formatTime stays in IST even for a UTC-expressed instant', () => {
    // 13:30 UTC === 19:00 IST (same wedding moment)
    const out = formatTime('2026-12-04T13:30:00Z').toLowerCase()
    expect(out).toContain('7:00')
    expect(out).toContain('pm')
  })

  it('formatDateTime combines date and time', () => {
    const out = formatDateTime(WEDDING_ISO).toLowerCase()
    expect(out).toContain('december')
    expect(out).toContain('at')
    expect(out).toContain('7:00')
  })
})
