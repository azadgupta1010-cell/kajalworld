import { NextResponse } from 'next/server'
import { isSupabaseConfigured } from '@/lib/env'

/**
 * Guestbook (blessings) submission endpoint — STUB.
 *
 * Validates the payload server-side and returns { ok: true } on success.
 * TODO (Phase 2): persist the message to the database (Supabase) in a
 * pending-moderation state. This stub intentionally does NOT write to a DB.
 */

interface GuestbookPayload {
  name?: unknown
  message?: unknown
  consent?: unknown
}

export async function POST(request: Request) {
  if (!isSupabaseConfigured) {
    return NextResponse.json(
      { ok: false, error: 'Guestbook is not enabled yet.' },
      { status: 503 },
    )
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

  // TODO (Phase 2): insert the message as pending moderation into the database.
  console.info('[guestbook] received (not persisted — Phase 2 wires the DB):', {
    name,
    length: message.length,
  })

  return NextResponse.json({ ok: true })
}
