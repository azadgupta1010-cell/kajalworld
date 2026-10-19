import type { Metadata } from 'next'
import Link from 'next/link'
import { weddingConfig } from '@/config/weddingConfig'
import { GoldDivider } from '@/components/decor/GoldDivider'

export const metadata: Metadata = {
  title: 'Share Photos — Kajal & Daya Sagar',
}

export default function UploadIndexPage() {
  const { events } = weddingConfig

  return (
    <main className="mx-auto max-w-xl px-4 py-16">
      <header className="text-center">
        <p className="font-body text-xs uppercase tracking-[0.3em] text-rose-dusty">Guest photos</p>
        <h1 className="mt-3 font-display text-4xl font-semibold text-ivory sm:text-5xl">Share Your Moments</h1>
        <div className="mt-5 flex justify-center">
          <GoldDivider width={220} />
        </div>
        <p className="mx-auto mt-6 max-w-md font-body text-sm leading-relaxed text-ivory/70">
          Choose a celebration to add your photos and videos. Uploads open soon — you can preview
          the experience now.
        </p>
      </header>

      <ul className="mt-12 space-y-3">
        {events.map((event) => (
          <li key={event.slug}>
            <Link
              href={`/upload/${event.slug}`}
              className="flex items-center justify-between rounded-xl border border-gold/20 bg-white/[0.03] px-6 py-4 transition hover:border-gold/40 focus-visible:outline"
            >
              <span className="font-display text-xl text-ivory">{event.name}</span>
              <span className="font-body text-xs uppercase tracking-[0.15em] text-gold-light/80">Open &rarr;</span>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  )
}
