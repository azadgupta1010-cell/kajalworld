/**
 * Lightweight, dependency-free abuse protection for the public submission
 * endpoints (RSVP + guestbook). All checks run server-side. No external
 * service, no cost.
 *
 *  - rate limiting      → stops flooding / spam bursts from one client
 *  - content screening  → blocks profanity / abusive language
 *  - spam heuristics    → blocks link-stuffing and gibberish
 *  - length caps        → rejects absurdly long payloads
 *  - honeypot           → traps naive bots (checked in the route)
 *
 * Note: the in-memory rate limiter resets on each serverless cold start, which
 * is fine for a wedding site's traffic. For stronger guarantees the same keys
 * could later be moved to a Supabase table.
 */

// ---------------------------------------------------------------------------
//  Rate limiting (in-memory sliding window per client key)
// ---------------------------------------------------------------------------
const WINDOW_MS = 60_000 // 1 minute
const MAX_PER_WINDOW = 5 // max submissions per client per window
const buckets = new Map<string, number[]>()

export function rateLimit(key: string): { ok: boolean; retryAfter?: number } {
  const now = Date.now()
  const hits = (buckets.get(key) ?? []).filter((t) => now - t < WINDOW_MS)
  if (hits.length >= MAX_PER_WINDOW) {
    const retryAfter = Math.ceil((WINDOW_MS - (now - hits[0])) / 1000)
    buckets.set(key, hits)
    return { ok: false, retryAfter }
  }
  hits.push(now)
  buckets.set(key, hits)
  // Opportunistic cleanup so the map doesn't grow unbounded.
  if (buckets.size > 5000) {
    for (const [k, v] of buckets) {
      if (v.every((t) => now - t >= WINDOW_MS)) buckets.delete(k)
    }
  }
  return { ok: true }
}

/** Best-effort client identifier from proxy headers. */
export function clientKey(request: Request): string {
  const h = request.headers
  const fwd = h.get('x-forwarded-for')
  const ip = (fwd ? fwd.split(',')[0] : '') || h.get('x-real-ip') || 'unknown'
  return ip.trim()
}

// ---------------------------------------------------------------------------
//  Content screening
// ---------------------------------------------------------------------------

// A compact list of common English + Hindi/Hinglish abusive terms. Matched as
// whole words (with light obfuscation tolerance) and case-insensitively.
const BANNED = [
  'fuck', 'fuk', 'fck', 'shit', 'bitch', 'bastard', 'asshole', 'dick', 'cunt',
  'slut', 'whore', 'rape', 'nigger', 'retard', 'faggot',
  'bhosdi', 'bhosada', 'bhosdike', 'madarchod', 'madrchod', 'behenchod',
  'bhenchod', 'bsdk', 'mc', 'bc', 'chutiya', 'chutia', 'chut', 'gandu',
  'gaandu', 'gand', 'lund', 'lauda', 'loda', 'randi', 'harami', 'kutte',
  'kutta', 'kamine', 'saala', 'haramkhor', 'chodu',
]

// Build a tolerant regex: allow spaces / dots / * between letters (f*u*c*k).
function toLoosePattern(word: string): RegExp {
  const body = word
    .split('')
    .map((ch) => `${ch.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}[\\s._*-]{0,2}`)
    .join('')
  return new RegExp(`\\b${body}`, 'i')
}
const BANNED_PATTERNS = BANNED.map(toLoosePattern)

export interface ScreenResult {
  ok: boolean
  reason?: string
}

/** Screen a free-text field for abuse / spam. */
export function screenText(input: string, { maxLen = 1000 } = {}): ScreenResult {
  const text = input.trim()

  if (text.length > maxLen) return { ok: false, reason: 'Message is too long.' }

  // Profanity / abuse.
  for (const re of BANNED_PATTERNS) {
    if (re.test(text)) return { ok: false, reason: 'Please keep the message respectful.' }
  }

  // Link-stuffing: more than one URL is almost always spam here.
  const urls = text.match(/https?:\/\/|www\.|\b[\w-]+\.(com|net|org|ru|xyz|top|info|link)\b/gi) ?? []
  if (urls.length >= 2) return { ok: false, reason: 'Links are not allowed here.' }

  // Gibberish / flooding: a very long run of the same character.
  if (/(.)\1{14,}/.test(text)) return { ok: false, reason: 'Message looks invalid.' }

  // Excess capitals shouting (long messages that are mostly uppercase).
  const letters = text.replace(/[^a-zA-Z]/g, '')
  if (letters.length > 20) {
    const caps = (text.match(/[A-Z]/g) ?? []).length
    if (caps / letters.length > 0.8) return { ok: false, reason: 'Message looks invalid.' }
  }

  return { ok: true }
}

/** Validate a short name field. */
export function screenName(input: string): ScreenResult {
  const name = input.trim()
  if (name.length < 2) return { ok: false, reason: 'Please enter a valid name.' }
  if (name.length > 80) return { ok: false, reason: 'Name is too long.' }
  for (const re of BANNED_PATTERNS) {
    if (re.test(name)) return { ok: false, reason: 'Please enter a valid name.' }
  }
  return { ok: true }
}
