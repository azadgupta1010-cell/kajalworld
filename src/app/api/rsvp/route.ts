import { NextResponse } from 'next/server'
import { isSupabaseConfigured } from '@/lib/env'
import { createServiceClient } from '@/lib/supabase/server'
import { notifyTelegram, escapeHtml } from '@/lib/notify'

/**
 * RSVP submission endpoint.
 *
 * Validates the payload server-side, persists it to the `public_rsvps` table
 * (via the service role), and sends an instant Telegram notification to the
 * couple. Returns { ok: true } on success.
 */

interface RsvpPayload {
  name?: unknown
  attending?: unknown
  events?: unknown
  plusOnes?: unknown
  dietary?: unknown
  message?: unknown
}

export async function POST(request: Request) {
  if (!isSupabaseConfigured) {
    return NextResponse.json({ ok: false, error: 'RSVP is not enabled yet.' }, { status: 503 })
  }

  let body: RsvpPayload
  try {
    body = (await request.json()) as RsvpPayload
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid JSON body.' }, { status: 400 })
  }

  const name = typeof body.name === 'string' ? body.name.trim() : ''
  if (!name) {
    return NextResponse.json({ ok: false, error: 'Name is required.' }, { status: 400 })
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
      ? (body.events as string[])
      : []
  const dietary = typeof body.dietary === 'string' ? body.dietary.trim() : ''
  const message = typeof body.message === 'string' ? body.message.trim() : ''

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
