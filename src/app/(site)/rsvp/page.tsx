import type { Metadata } from 'next'
import { RsvpForm } from '@/components/forms/RsvpForm'
import { GoldDivider } from '@/components/decor/GoldDivider'

export const metadata: Metadata = {
  title: 'RSVP — Kajal & Daya Sagar',
}

export default function RsvpPage() {
  return (
    <main className="mx-auto max-w-xl px-4 py-16">
      <header className="text-center">
        <p className="font-body text-xs uppercase tracking-[0.3em] text-rose-dusty">Kindly respond</p>
        <h1 className="mt-3 font-display text-4xl font-semibold text-ivory sm:text-5xl">RSVP</h1>
        <div className="mt-5 flex justify-center">
          <GoldDivider width={220} />
        </div>
        <p className="mx-auto mt-6 max-w-md font-body text-sm leading-relaxed text-ivory/70">
          Your presence and blessings will make the occasion complete. Please let us know if you
          can join us.
        </p>
      </header>

      <div className="mt-12">
        <RsvpForm />
      </div>
    </main>
  )
}
