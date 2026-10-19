import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { weddingConfig } from '@/config/weddingConfig'
import { UploadForm } from '@/components/forms/UploadForm'
import { GoldDivider } from '@/components/decor/GoldDivider'

interface PageProps {
  params: Promise<{ eventCode: string }>
}

export function generateStaticParams() {
  return weddingConfig.events.map((e) => ({ eventCode: e.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { eventCode } = await params
  const event = weddingConfig.events.find((e) => e.slug === eventCode)
  return {
    title: event ? `Share Photos — ${event.name}` : 'Share Photos — Kajal & Daya Sagar',
  }
}

export default async function UploadEventPage({ params }: PageProps) {
  const { eventCode } = await params
  const event = weddingConfig.events.find((e) => e.slug === eventCode)
  if (!event) notFound()

  return (
    <main className="mx-auto max-w-xl px-4 py-16">
      <Link
        href="/upload"
        className="font-body text-xs uppercase tracking-[0.18em] text-ivory/60 transition hover:text-gold-light focus-visible:outline"
      >
        &larr; All celebrations
      </Link>

      <header className="mt-6 text-center">
        <p className="font-body text-xs uppercase tracking-[0.3em] text-rose-dusty">Share photos for</p>
        <h1 className="mt-3 font-display text-4xl font-semibold text-ivory sm:text-5xl">{event.name}</h1>
        <div className="mt-5 flex justify-center">
          <GoldDivider width={220} />
        </div>
      </header>

      <div className="mt-12">
        <UploadForm eventName={event.name} />
      </div>
    </main>
  )
}
