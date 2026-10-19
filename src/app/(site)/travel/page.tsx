import type { Metadata } from 'next'
import { weddingConfig } from '@/config/weddingConfig'
import { formatDate } from '@/lib/datetime'
import { GoldDivider } from '@/components/decor/GoldDivider'

export const metadata: Metadata = {
  title: 'Travel & Directions — Kajal & Daya Sagar',
}

export default function TravelPage() {
  const { events } = weddingConfig

  return (
    <main className="mx-auto max-w-3xl px-4 py-16">
      <header className="text-center">
        <p className="font-body text-xs uppercase tracking-[0.3em] text-rose-dusty">Getting there</p>
        <h1 className="mt-3 font-display text-4xl font-semibold text-ivory sm:text-5xl">Travel &amp; Directions</h1>
        <div className="mt-5 flex justify-center">
          <GoldDivider width={220} />
        </div>
        <p className="mx-auto mt-6 max-w-xl font-body text-sm leading-relaxed text-ivory/70">
          Venue locations for each celebration. Tap &ldquo;Get Directions&rdquo; to open Google Maps.
        </p>
      </header>

      <ul className="mt-12 space-y-5">
        {events.map((event) => (
          <li
            key={event.id}
            className="rounded-xl border border-gold/20 bg-white/[0.03] p-6 sm:flex sm:items-center sm:justify-between sm:gap-6"
          >
            <div>
              <h2 className="font-display text-2xl text-ivory">{event.name}</h2>
              <p className="mt-1 font-body text-sm text-gold-light/90">{formatDate(event.dateTime)}</p>
              <p className="mt-1 font-body text-sm text-ivory/80">
                {event.venue}
                {event.city ? `, ${event.city}` : ''}
              </p>
              {!event.venueConfirmed && (
                <span className="mt-2 inline-block rounded-full border border-rose-dusty/50 px-3 py-0.5 font-body text-[0.65rem] uppercase tracking-[0.15em] text-rose-dusty">
                  Venue to be confirmed
                </span>
              )}
            </div>

            <div className="mt-4 shrink-0 sm:mt-0">
              {event.mapUrl ? (
                <a
                  href={event.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-gold/50 px-5 py-2.5 font-body text-xs uppercase tracking-[0.18em] text-gold-light transition hover:bg-gold/10 focus-visible:outline"
                >
                  Get Directions &rarr;
                </a>
              ) : (
                <span className="font-body text-xs uppercase tracking-[0.15em] text-ivory/40">
                  Map to be added
                </span>
              )}
            </div>
          </li>
        ))}
      </ul>
    </main>
  )
}
