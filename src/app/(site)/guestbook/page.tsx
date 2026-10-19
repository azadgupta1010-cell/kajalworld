import type { Metadata } from 'next'
import { GuestbookForm } from '@/components/forms/GuestbookForm'
import { GoldDivider } from '@/components/decor/GoldDivider'

export const metadata: Metadata = {
  title: 'Guestbook — Kajal & Daya Sagar',
}

export default function GuestbookPage() {
  return (
    <main className="mx-auto max-w-xl px-4 py-16">
      <header className="text-center">
        <p className="font-body text-xs uppercase tracking-[0.3em] text-rose-dusty">Blessings</p>
        <h1 className="mt-3 font-display text-4xl font-semibold text-ivory sm:text-5xl">Guestbook</h1>
        <div className="mt-5 flex justify-center">
          <GoldDivider width={220} />
        </div>
        <p className="mx-auto mt-6 max-w-md font-body text-sm leading-relaxed text-ivory/70">
          Leave a warm wish for Kajal and Daya Sagar. Messages appear here after moderation.
        </p>
      </header>

      <div className="mt-12">
        <GuestbookForm />
      </div>

      <section aria-label="Messages" className="mt-14 rounded-xl border border-gold/15 bg-white/[0.02] p-8 text-center">
        <p className="font-body text-sm text-ivory/60">
          Blessings from guests will appear here once they have been reviewed.
        </p>
      </section>
    </main>
  )
}
