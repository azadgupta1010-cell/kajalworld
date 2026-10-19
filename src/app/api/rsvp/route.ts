import { NextResponse } from 'next/server'
import { isSupabaseConfigured } from '@/lib/env'

/**
 * RSVP submission endpoint — STUB.
 *
 * Validates the payload server-side and returns { ok: true } on success.
 * TODO (Phase 2): persist the RSVP to the database (Supabase) and send any
 * confirmation/notification. This stub intentionally does NOT write to a DB.
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
    return NextResponse.json(
      { ok: false, error: 'RSVP is not enabled yet.' },
      { status: 503 },
    )
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
  if (body.events !== undefined && !Array.isArray(body.events)) {
    return NextResponse.json({ ok: false, error: 'Invalid events list.' }, { status: 400 })
  }

  // TODO (Phase 2): insert validated RSVP into the database here.
  console.info('[rsvp] received (not persisted — Phase 2 wires the DB):', {
    name,
    attending: body.attending,
    events: body.events,
    plusOnes,
  })

  return NextResponse.json({ ok: true })
}
