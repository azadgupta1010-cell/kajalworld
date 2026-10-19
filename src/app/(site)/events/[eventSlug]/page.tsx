import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { weddingConfig } from '@/config/weddingConfig'
import { formatDate, formatTime } from '@/lib/datetime'
import { GoldDivider } from '@/components/decor/GoldDivider'

interface PageProps {
  params: Promise<{ eventSlug: string }>
}

export function generateStaticParams() {
  return weddingConfig.events.map((e) => ({ eventSlug: e.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { eventSlug } = await params
  const event = weddingConfig.events.find((e) => e.slug === eventSlug)
  return {
    title: event ? `${event.name} — Kajal & Daya Sagar` : 'Event — Kajal & Daya Sagar',
  }
}

export default async function EventDetailPage({ params }: PageProps) {
  const { eventSlug } = await params
  const event = weddingConfig.events.find((e) => e.slug === eventSlug)
  if (!event) notFound()

  return (
    <main className="relative mx-auto max-w-2xl px-4 py-16">
      <Link
        href="/events"
        className="font-body text-xs uppercase tracking-[0.18em] text-ivory/60 transition hover:text-gold-light focus-visible:outline"
      >
        &larr; All celebrations
      </Link>

      <h1 className="mt-6 font-display text-5xl font-semibold text-ivory sm:text-6xl">{event.name}</h1>

      <div className="mt-6">
        <GoldDivider width={200} />
      </div>

      <dl className="mt-8 space-y-5">
        <div>
          <dt className="font-body text-[0.7rem] uppercase tracking-[0.2em] text-rose-dusty">Date</dt>
          <dd className="mt-1 font-display text-xl text-gold-light">{formatDate(event.dateTime)}</dd>
        </div>

        <div>
          <dt className="font-body text-[0.7rem] uppercase tracking-[0.2em] text-rose-dusty">Time</dt>
          <dd className="mt-1 font-body text-base text-ivory/85">
            {event.timeConfirmed ? formatTime(event.dateTime) : 'Time to be confirmed'}
          </dd>
        </div>

        <div>
          <dt className="font-body text-[0.7rem] uppercase tracking-[0.2em] text-rose-dusty">Venue</dt>
          <dd className="mt-1 font-body text-base text-ivory/85">
            {event.venue}
            {event.city ? `, ${event.city}` : ''}
            {!event.venueConfirmed && (
              <span className="ml-2 inline-block rounded-full border border-rose-dusty/50 px-3 py-0.5 font-body text-[0.65rem] uppercase tracking-[0.15em] text-rose-dusty">
                Venue to be confirmed
              </span>
            )}
          </dd>
        </div>

        {event.description && (
          <div>
            <dt className="font-body text-[0.7rem] uppercase tracking-[0.2em] text-rose-dusty">About</dt>
            <dd className="mt-1 font-body text-base leading-relaxed text-ivory/80">{event.description}</dd>
          </div>
        )}

        {event.notes && event.notes.length > 0 && (
          <div>
            <dt className="font-body text-[0.7rem] uppercase tracking-[0.2em] text-rose-dusty">Notes</dt>
            <dd className="mt-1">
              <ul className="list-inside list-disc space-y-1 font-body text-sm text-ivory/75">
                {event.notes.map((note, i) => (
                  <li key={i}>{note}</li>
                ))}
              </ul>
            </dd>
          </div>
        )}
      </dl>

      {event.mapUrl && (
        <a
          href={event.mapUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-10 inline-flex items-center gap-2 rounded-full border border-gold/50 px-6 py-3 font-body text-xs uppercase tracking-[0.2em] text-gold-light transition hover:bg-gold/10 focus-visible:outline"
        >
          Get Directions &rarr;
        </a>
      )}
    </main>
  )
}
