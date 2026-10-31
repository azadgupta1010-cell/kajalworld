import { NextResponse } from 'next/server'
import { isSupabaseConfigured } from '@/lib/env'
import { createServiceClient } from '@/lib/supabase/server'
import { notifyTelegram, escapeHtml } from '@/lib/notify'

/**
 * Guestbook (blessings) submission endpoint.
 *
 * Validates the payload, saves it to `public_blessings` in a pending state
 * (via the service role), and sends an instant Telegram notification to the
 * couple. Returns { ok: true } on success.
 */

interface GuestbookPayload {
  name?: unknown
  message?: unknown
  consent?: unknown
}

export async function POST(request: Request) {
  if (!isSupabaseConfigured) {
    return NextResponse.json({ ok: false, error: 'Guestbook is not enabled yet.' }, { status: 503 })
  }

  let body: GuestbookPayload
  try {
    body = (await request.json()) as GuestbookPayload
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid JSON body.' }, { status: 400 })
  }

  const name = typeof body.name === 'string' ? body.name.trim() : ''
  const message = typeof body.message === 'string' ? body.message.trim() : ''
  if (!name) {
    return NextResponse.json({ ok: false, error: 'Name is required.' }, { status: 400 })
  }
  if (!message) {
    return NextResponse.json({ ok: false, error: 'Message is required.' }, { status: 400 })
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
