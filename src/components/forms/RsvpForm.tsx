'use client'

import { useState } from 'react'
import { weddingConfig } from '@/config/weddingConfig'
import { isSupabaseConfigured } from '@/lib/env'

type Status = 'idle' | 'submitting' | 'success' | 'error'

/**
 * RSVP form UI with client-side validation. Never fakes success: if Supabase
 * is not configured it shows a friendly "enabled soon" message; otherwise it
 * POSTs to /api/rsvp and only reports success when the server responds ok.
 */
export function RsvpForm() {
  const events = weddingConfig.events

  const [name, setName] = useState('')
  const [attending, setAttending] = useState<'yes' | 'no' | ''>('')
  const [selectedEvents, setSelectedEvents] = useState<string[]>([])
  const [plusOnes, setPlusOnes] = useState(0)
  const [dietary, setDietary] = useState('')
  const [message, setMessage] = useState('')

  const [status, setStatus] = useState<Status>('idle')
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [serverMessage, setServerMessage] = useState<string>('')

  const toggleEvent = (slug: string) => {
    setSelectedEvents((prev) =>
      prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug],
    )
  }

  const validate = () => {
    const next: Record<string, string> = {}
    if (!name.trim()) next.name = 'Please enter your name.'
    if (attending !== 'yes' && attending !== 'no') next.attending = 'Please let us know if you can attend.'
    if (attending === 'yes' && selectedEvents.length === 0) {
      next.events = 'Please select at least one celebration you will attend.'
    }
    if (plusOnes < 0 || plusOnes > 10) next.plusOnes = 'Please enter a number between 0 and 10.'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setServerMessage('')
    if (!validate()) return

    if (!isSupabaseConfigured) {
      setStatus('idle')
      setServerMessage('RSVP will be enabled soon. Please check back closer to the wedding.')
      return
    }

    setStatus('submitting')
    try {
      const res = await fetch('/api/rsvp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          attending: attending === 'yes',
          events: attending === 'yes' ? selectedEvents : [],
          plusOnes: attending === 'yes' ? plusOnes : 0,
          dietary: dietary.trim(),
          message: message.trim(),
        }),
      })
      const data = (await res.json().catch(() => null)) as { ok?: boolean } | null
      if (res.ok && data?.ok) {
        setStatus('success')
      } else {
        setStatus('error')
        setServerMessage('Something went wrong submitting your RSVP. Please try again.')
      }
    } catch {
      setStatus('error')
      setServerMessage('We could not reach the server. Please try again.')
    }
  }

  if (status === 'success') {
    return (
      <div className="rounded-xl border border-gold/30 bg-white/[0.04] p-8 text-center">
        <p className="font-display text-2xl text-gold-light">Thank you, {name.trim()}!</p>
        <p className="mt-3 font-body text-sm text-ivory/75">
          Your RSVP has been received. We can&apos;t wait to celebrate with you.
        </p>
      </div>
    )
  }

  const inputClass =
    'mt-1 w-full rounded-md border border-gold/25 bg-black/20 px-4 py-2.5 font-body text-sm text-ivory placeholder:text-ivory/40 focus:border-gold/60 focus:outline-none'
  const labelClass = 'font-body text-sm text-ivory/85'
  const errorClass = 'mt-1 font-body text-xs text-rose-dusty'

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-6">
      {!isSupabaseConfigured && (
        <p className="rounded-md border border-gold/25 bg-gold/5 px-4 py-3 font-body text-xs text-gold-light/90">
          RSVP submission opens soon. You can still fill in the form to preview it.
        </p>
      )}

      <div>
        <label htmlFor="rsvp-name" className={labelClass}>
          Your name
        </label>
        <input
          id="rsvp-name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={inputClass}
          placeholder="Full name"
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? 'rsvp-name-error' : undefined}
        />
        {errors.name && (
          <p id="rsvp-name-error" className={errorClass}>
            {errors.name}
          </p>
        )}
      </div>

      <fieldset>
        <legend className={labelClass}>Will you be attending?</legend>
        <div className="mt-2 flex gap-6">
          <label className="flex items-center gap-2 font-body text-sm text-ivory/80">
            <input
              type="radio"
              name="attending"
              value="yes"
              checked={attending === 'yes'}
              onChange={() => setAttending('yes')}
              className="accent-gold"
            />
            Joyfully accepts
          </label>
          <label className="flex items-center gap-2 font-body text-sm text-ivory/80">
            <input
              type="radio"
              name="attending"
              value="no"
              checked={attending === 'no'}
              onChange={() => setAttending('no')}
              className="accent-gold"
            />
            Regretfully declines
          </label>
        </div>
        {errors.attending && <p className={errorClass}>{errors.attending}</p>}
      </fieldset>

      {attending === 'yes' && (
        <>
          <fieldset>
            <legend className={labelClass}>Which celebrations will you join?</legend>
            <div className="mt-2 grid gap-2 sm:grid-cols-2">
              {events.map((event) => (
                <label
                  key={event.slug}
                  className="flex items-center gap-2 rounded-md border border-gold/15 bg-black/10 px-3 py-2 font-body text-sm text-ivory/80"
                >
                  <input
                    type="checkbox"
                    checked={selectedEvents.includes(event.slug)}
                    onChange={() => toggleEvent(event.slug)}
                    className="accent-gold"
                  />
                  {event.name}
                </label>
              ))}
            </div>
            {errors.events && <p className={errorClass}>{errors.events}</p>}
          </fieldset>

          <div>
            <label htmlFor="rsvp-plus" className={labelClass}>
              Number of additional guests
            </label>
            <input
              id="rsvp-plus"
              type="number"
              min={0}
              max={10}
              value={plusOnes}
              onChange={(e) => setPlusOnes(Number(e.target.value))}
              className={inputClass}
              aria-invalid={!!errors.plusOnes}
            />
            {errors.plusOnes && <p className={errorClass}>{errors.plusOnes}</p>}
          </div>

          <div>
            <label htmlFor="rsvp-diet" className={labelClass}>
              Dietary notes (optional)
            </label>
            <input
              id="rsvp-diet"
              type="text"
              value={dietary}
              onChange={(e) => setDietary(e.target.value)}
              className={inputClass}
              placeholder="Vegetarian, allergies, etc."
            />
          </div>
        </>
      )}

      <div>
        <label htmlFor="rsvp-message" className={labelClass}>
          A message for the couple (optional)
        </label>
        <textarea
          id="rsvp-message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={4}
          className={inputClass}
          placeholder="Your wishes and blessings"
        />
      </div>

      {serverMessage && (
        <p className="rounded-md border border-gold/25 bg-gold/5 px-4 py-3 font-body text-sm text-gold-light/90">
          {serverMessage}
        </p>
      )}

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="w-full rounded-full border border-gold bg-rose-deep px-8 py-3 font-body text-sm uppercase tracking-[0.2em] text-ivory shadow-gold transition hover:bg-rose disabled:cursor-not-allowed disabled:opacity-60 focus-visible:outline"
      >
        {status === 'submitting' ? 'Sending…' : 'Send RSVP'}
      </button>
    </form>
  )
}
