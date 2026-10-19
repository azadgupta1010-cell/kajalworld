/**
 * Date/time formatting helpers, always in Asia/Kolkata (IST) regardless of the
 * viewer's locale/timezone. This keeps ceremony times stable and correct.
 */

import { TIMEZONE } from '@/config/weddingConfig'

const LOCALE = 'en-IN'

/** e.g. "Friday, 4 December 2026" */
export function formatDate(iso: string): string {
  return new Intl.DateTimeFormat(LOCALE, {
    timeZone: TIMEZONE,
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(iso))
}

/** e.g. "7:00 pm" */
export function formatTime(iso: string): string {
  return new Intl.DateTimeFormat(LOCALE, {
    timeZone: TIMEZONE,
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  }).format(new Date(iso))
}

/** e.g. "Friday, 4 December 2026 at 7:00 pm" */
export function formatDateTime(iso: string): string {
  return `${formatDate(iso)} at ${formatTime(iso)}`
}
