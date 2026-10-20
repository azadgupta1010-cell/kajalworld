import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { eventsInOrder } from '@/config/weddingConfig'
import { EventExperience } from '@/components/events/EventExperience'

interface PageProps {
  params: Promise<{ eventSlug: string }>
}

export function generateStaticParams() {
  return eventsInOrder.map((e) => ({ eventSlug: e.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { eventSlug } = await params
  const event = eventsInOrder.find((e) => e.slug === eventSlug)
  return {
    title: event ? `${event.name} — Kajal & Daya Sagar` : 'Event — Kajal & Daya Sagar',
  }
}

export default async function EventDetailPage({ params }: PageProps) {
  const { eventSlug } = await params
  const idx = eventsInOrder.findIndex((e) => e.slug === eventSlug)
  if (idx === -1) notFound()

  const event = eventsInOrder[idx]
  const prev = eventsInOrder[idx - 1]
  const next = eventsInOrder[idx + 1]

  return (
    <EventExperience
      event={event}
      index={idx + 1}
      total={eventsInOrder.length}
      prevSlug={prev?.slug}
      nextSlug={next?.slug}
    />
  )
}
