import { NextResponse } from 'next/server'
import { isSupabaseConfigured } from '@/lib/env'
import { createServiceClient } from '@/lib/supabase/server'
import { notifyTelegram, escapeHtml } from '@/lib/notify'
import { rateLimit, clientKey, screenName, screenText } from '@/lib/guard'

/**
 * RSVP submission endpoint.
 *
 * Abuse protection: rate limiting, honeypot, name/message screening. Then
 * persists to `public_rsvps` (service role) and sends a Telegram notification.
 */

interface RsvpPayload {
  name?: unknown
  attending?: unknown
  events?: unknown
  plusOnes?: unknown
  dietary?: unknown
  message?: unknown
  /** Honeypot — must stay empty; bots tend to fill every field. */
  website?: unknown
}

export async function POST(request: Request) {
  if (!isSupabaseConfigured) {
    return NextResponse.json({ ok: false, error: 'RSVP is not enabled yet.' }, { status: 503 })
  }

  // Rate limit per client.
  const rl = rateLimit(`rsvp:${clientKey(request)}`)
  if (!rl.ok) {
    return NextResponse.json(
      { ok: false, error: 'Too many requests. Please wait a moment and try again.' },
      { status: 429, headers: { 'Retry-After': String(rl.retryAfter ?? 60) } },
    )
  }

  let body: RsvpPayload
  try {
    body = (await request.json()) as RsvpPayload
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid JSON body.' }, { status: 400 })
  }

  // Honeypot: a real user never fills this hidden field. Pretend success so
  // bots don't learn they were caught.
  if (typeof body.website === 'string' && body.website.trim() !== '') {
    return NextResponse.json({ ok: true })
  }

  const name = typeof body.name === 'string' ? body.name.trim() : ''
  if (!name) {
    return NextResponse.json({ ok: false, error: 'Name is required.' }, { status: 400 })
  }
  const nameCheck = screenName(name)
  if (!nameCheck.ok) {
    return NextResponse.json({ ok: false, error: nameCheck.reason }, { status: 400 })
  }
  if (typeof body.attending !== 'boolean') {
    return NextResponse.json({ ok: false, error: 'Attendance is required.' }, { status: 400 })
  }
  const plusOnes = typeof body.plusOnes === 'number' ? body.plusOnes : 0
  if (plusOnes < 0 || plusOnes > 10) {
    return NextResponse.json({ ok: false, error: 'Invalid guest count.' }, { status: 400 })
  }
  const events =
    Array.isArray(body.events) && body.events.every((e) => typeof e === 'string')
      ? (body.events as string[]).slice(0, 20)
      : []
  const dietary = typeof body.dietary === 'string' ? body.dietary.trim() : ''
  const message = typeof body.message === 'string' ? body.message.trim() : ''

  // Screen free-text fields for abuse / spam.
  if (dietary) {
    const c = screenText(dietary, { maxLen: 200 })
    if (!c.ok) return NextResponse.json({ ok: false, error: c.reason }, { status: 400 })
  }
  if (message) {
    const c = screenText(message, { maxLen: 500 })
    if (!c.ok) return NextResponse.json({ ok: false, error: c.reason }, { status: 400 })
  }

  const supabase = createServiceClient()
  if (!supabase) {
    return NextResponse.json({ ok: false, error: 'Server not configured.' }, { status: 503 })
  }

  const { error } = await supabase.from('public_rsvps').insert({
    name,
    attending: body.attending,
    events,
    plus_ones: plusOnes,
    dietary: dietary || null,
    message: message || null,
  })

  if (error) {
    console.error('[rsvp] insert failed:', error.message)
    return NextResponse.json({ ok: false, error: 'Could not save your RSVP.' }, { status: 500 })
  }

  // Fire-and-forget notification (never blocks or fails the response).
  const lines = [
    `🎉 <b>New RSVP</b>`,
    `👤 <b>${escapeHtml(name)}</b>`,
    body.attending ? '✅ Attending' : '❌ Not attending',
    events.length ? `🎊 Events: ${escapeHtml(events.join(', '))}` : '',
    plusOnes ? `➕ Guests: ${plusOnes}` : '',
    dietary ? `🍽️ Diet: ${escapeHtml(dietary)}` : '',
    message ? `💬 ${escapeHtml(message)}` : '',
  ].filter(Boolean)
  void notifyTelegram(lines.join('\n'))

  return NextResponse.json({ ok: true })
}
