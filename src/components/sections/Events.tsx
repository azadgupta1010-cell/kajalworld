import Link from 'next/link'
import { Reveal } from '@/components/ui/Reveal'
import { GoldDivider } from '@/components/decor/GoldDivider'
import { weddingConfig, type EventItem } from '@/config/weddingConfig'
import { formatDate, formatTime } from '@/lib/datetime'

/** SVG path data keyed by the EventItem.icon values. */
const icons: Record<EventItem['icon'], string> = {
  tilak: 'M12 3v6m0 0a3 3 0 100 6 3 3 0 000-6zm0 6v6M6 21h12',
  sangeet: 'M9 18V5l12-2v13M9 18a3 3 0 11-6 0 3 3 0 016 0zm12-2a3 3 0 11-6 0 3 3 0 016 0z',
  mehndi: 'M12 2C8 6 6 9 6 13a6 6 0 0012 0c0-4-2-7-6-11z',
  haldi: 'M12 3v18M3 12h18M5.6 5.6l12.8 12.8M18.4 5.6L5.6 18.4',
  wedding: 'M12 2a4 4 0 100 8 4 4 0 000-8zm0 2a2 2 0 110 4 2 2 0 010-4zM8 11l-2 3 6 8 6-8-2-3',
}

export function EventCard({ event, index }: { event: EventItem; index: number }) {
  return (
    <Reveal delay={index * 0.08}>
      <article className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-gold/20 bg-gradient-to-b from-white/[0.04] to-white/[0.01] p-6 transition hover:border-gold/40">
        <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-full border border-gold/40 text-gold-light">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
            <path d={icons[event.icon]} strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        <h3 className="font-display text-2xl font-medium text-ivory">
          <Link href={`/events/${event.slug}`} className="transition hover:text-gold-light focus-visible:outline">
            {event.name}
          </Link>
        </h3>

        <p className="mt-2 font-body text-sm text-gold-light/90">{formatDate(event.dateTime)}</p>
        <p className="font-body text-sm text-ivory/70">
          {event.timeConfirmed ? formatTime(event.dateTime) : 'Time to be confirmed'}
        </p>

        <p className="mt-3 font-body text-sm text-ivory/80">
          {event.venue}
          {event.city ? `, ${event.city}` : ''}
        </p>

        {!event.venueConfirmed && (
          <span className="mt-2 inline-block w-fit rounded-full border border-rose-dusty/50 px-3 py-0.5 font-body text-[0.65rem] uppercase tracking-[0.15em] text-rose-dusty">
            Venue to be confirmed
          </span>
        )}

        {event.notes && event.notes.length > 0 && (
          <ul className="mt-3 space-y-1">
            {event.notes.map((note, i) => (
              <li key={i} className="font-body text-xs leading-relaxed text-ivory/55">
                {note}
              </li>
            ))}
          </ul>
        )}

        <div className="mt-4 flex flex-wrap items-center gap-4">
          <Link
            href={`/events/${event.slug}`}
            className="font-body text-xs uppercase tracking-[0.15em] text-ivory/70 transition hover:text-ivory focus-visible:outline"
          >
            View details &rarr;
          </Link>
          {event.mapUrl && (
            <a
              href={event.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-body text-xs uppercase tracking-[0.15em] text-gold-light/90 transition hover:text-gold-light focus-visible:outline"
            >
              Get Directions &rarr;
            </a>
          )}
        </div>
      </article>
    </Reveal>
  )
}

interface EventsProps {
  /** Override the events list (defaults to full config list). */
  events?: EventItem[]
  /** Limit the number of events rendered (for previews). */
  limit?: number
  heading?: string
  eyebrow?: string
}

export function Events({
  events = weddingConfig.events,
  limit,
  heading = 'The Celebrations',
  eyebrow = 'Join us for',
}: EventsProps) {
  const list = typeof limit === 'number' ? events.slice(0, limit) : events

  return (
    <section id="events" className="relative px-4 py-24">
      <Reveal className="mx-auto mb-14 max-w-xl text-center">
        <p className="font-body text-xs uppercase tracking-[0.3em] text-rose-dusty">{eyebrow}</p>
        <h2 className="mt-3 font-display text-4xl font-semibold text-ivory sm:text-5xl">{heading}</h2>
        <div className="mt-5 flex justify-center">
          <GoldDivider width={220} />
        </div>
      </Reveal>

      <div className="mx-auto grid max-w-5xl gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((e, i) => (
          <EventCard key={e.id} event={e} index={i} />
        ))}
      </div>
    </section>
  )
}
