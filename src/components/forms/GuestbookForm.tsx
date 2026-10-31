'use client'

import { useState } from 'react'
import { isSupabaseConfigured } from '@/lib/env'

type Status = 'idle' | 'submitting' | 'success' | 'error'

/**
 * Guestbook (blessings) form. Never fakes success: when Supabase is not
 * configured it shows a "coming soon" message; otherwise it POSTs to
 * /api/guestbook and only reports success on an ok server response.
 */
export function GuestbookForm() {
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const [consent, setConsent] = useState(false)
  // Honeypot: hidden from real users; only bots fill it.
  const [website, setWebsite] = useState('')

  const [status, setStatus] = useState<Status>('idle')
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [serverMessage, setServerMessage] = useState('')

  const validate = () => {
    const next: Record<string, string> = {}
    if (!name.trim()) next.name = 'Please enter your name.'
    if (!message.trim()) next.message = 'Please write a short message.'
    if (!consent) next.consent = 'Please agree before sharing your message.'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setServerMessage('')
    if (!validate()) return

    if (!isSupabaseConfigured) {
      setServerMessage('The guestbook is coming soon. Please check back closer to the wedding.')
      return
    }

    setStatus('submitting')
    try {
      const res = await fetch('/api/guestbook', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim(), message: message.trim(), consent, website }),
      })
      const data = (await res.json().catch(() => null)) as { ok?: boolean } | null
      if (res.ok && data?.ok) {
        setStatus('success')
      } else {
        setStatus('error')
        setServerMessage('Something went wrong. Please try again.')
      }
    } catch {
      setStatus('error')
      setServerMessage('We could not reach the server. Please try again.')
    }
  }

  if (status === 'success') {
    return (
      <div className="rounded-xl border border-gold/30 bg-white/[0.04] p-8 text-center">
        <p className="font-display text-2xl text-gold-light">Thank you for your blessing!</p>
        <p className="mt-3 font-body text-sm text-ivory/75">
          Your message will appear in the guestbook once it has been reviewed.
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
      {/* Honeypot: visually hidden, off-screen, not focusable. */}
      <div aria-hidden="true" className="absolute left-[-9999px] top-[-9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="gb-website">Website</label>
        <input
          id="gb-website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
        />
      </div>

      {!isSupabaseConfigured && (
        <p className="rounded-md border border-gold/25 bg-gold/5 px-4 py-3 font-body text-xs text-gold-light/90">
          The guestbook opens soon. You can preview the form below.
        </p>
      )}

      <div>
        <label htmlFor="gb-name" className={labelClass}>
          Your name
        </label>
        <input
          id="gb-name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={inputClass}
          placeholder="Full name"
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? 'gb-name-error' : undefined}
        />
        {errors.name && (
          <p id="gb-name-error" className={errorClass}>
            {errors.name}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="gb-message" className={labelClass}>
          Your blessing
        </label>
        <textarea
          id="gb-message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={4}
          className={inputClass}
          placeholder="Share your wishes for the couple"
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? 'gb-message-error' : undefined}
        />
        {errors.message && (
          <p id="gb-message-error" className={errorClass}>
            {errors.message}
          </p>
        )}
      </div>

      <div>
        <label className="flex items-start gap-3 font-body text-sm text-ivory/80">
          <input
            type="checkbox"
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
            className="mt-1 accent-gold"
            aria-invalid={!!errors.consent}
            aria-describedby={errors.consent ? 'gb-consent-error' : undefined}
          />
          <span>I&apos;m happy for this message to be shown publicly after moderation.</span>
        </label>
        {errors.consent && (
          <p id="gb-consent-error" className={errorClass}>
            {errors.consent}
          </p>
        )}
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
        {status === 'submitting' ? 'Sending…' : 'Share your blessing'}
      </button>
    </form>
  )
}
