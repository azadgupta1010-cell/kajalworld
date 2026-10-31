import { NextResponse } from 'next/server'
import { isSupabaseConfigured } from '@/lib/env'
import { createServiceClient } from '@/lib/supabase/server'
import { notifyTelegram, escapeHtml } from '@/lib/notify'
import { rateLimit, clientKey, screenName, screenText } from '@/lib/guard'

/**
 * Guestbook (blessings) submission endpoint.
 *
 * Abuse protection: rate limiting, honeypot, name/message screening. Saves to
 * `public_blessings` in a pending state (service role) and notifies via
 * Telegram. All messages stay "pending" until the couple approves them, so
 * nothing ever appears publicly without review.
 */

interface GuestbookPayload {
  name?: unknown
  message?: unknown
  consent?: unknown
  /** Honeypot — must stay empty. */
  website?: unknown
}

export async function POST(request: Request) {
  if (!isSupabaseConfigured) {
    return NextResponse.json({ ok: false, error: 'Guestbook is not enabled yet.' }, { status: 503 })
  }

  // Rate limit per client.
  const rl = rateLimit(`gb:${clientKey(request)}`)
  if (!rl.ok) {
    return NextResponse.json(
      { ok: false, error: 'Too many requests. Please wait a moment and try again.' },
      { status: 429, headers: { 'Retry-After': String(rl.retryAfter ?? 60) } },
    )
  }

  let body: GuestbookPayload
  try {
    body = (await request.json()) as GuestbookPayload
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid JSON body.' }, { status: 400 })
  }

  // Honeypot: real users never fill this. Pretend success to confuse bots.
  if (typeof body.website === 'string' && body.website.trim() !== '') {
    return NextResponse.json({ ok: true })
  }

  const name = typeof body.name === 'string' ? body.name.trim() : ''
  const message = typeof body.message === 'string' ? body.message.trim() : ''
  if (!name) {
    return NextResponse.json({ ok: false, error: 'Name is required.' }, { status: 400 })
  }
  const nameCheck = screenName(name)
  if (!nameCheck.ok) {
    return NextResponse.json({ ok: false, error: nameCheck.reason }, { status: 400 })
  }
  if (!message) {
    return NextResponse.json({ ok: false, error: 'Message is required.' }, { status: 400 })
  }
  const msgCheck = screenText(message, { maxLen: 500 })
  if (!msgCheck.ok) {
    return NextResponse.json({ ok: false, error: msgCheck.reason }, { status: 400 })
  }
  if (body.consent !== true) {
    return NextResponse.json({ ok: false, error: 'Consent is required.' }, { status: 400 })
  }

  const supabase = createServiceClient()
  if (!supabase) {
    return NextResponse.json({ ok: false, error: 'Server not configured.' }, { status: 503 })
  }

  const { error } = await supabase.from('public_blessings').insert({
    name,
    message,
    consent: true,
    status: 'pending',
  })

  if (error) {
    console.error('[guestbook] insert failed:', error.message)
    return NextResponse.json({ ok: false, error: 'Could not save your message.' }, { status: 500 })
  }

  // Fire-and-forget notification (never blocks or fails the response).
  void notifyTelegram(
    [`💐 <b>New Blessing</b>`, `👤 <b>${escapeHtml(name)}</b>`, `💬 ${escapeHtml(message)}`].join('\n'),
  )

  return NextResponse.json({ ok: true })
}
