import type { Metadata } from 'next'
import { GuestbookForm } from '@/components/forms/GuestbookForm'
import { GoldDivider } from '@/components/decor/GoldDivider'
import { listPublicBlessings } from '@/lib/blessings'

export const metadata: Metadata = {
  title: 'Guestbook — Kajal & Daya Sagar',
}

// Show freshly posted blessings quickly without a redeploy.
export const revalidate = 15

function formatWhen(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    })
  } catch {
    return ''
  }
}

export default async function GuestbookPage() {
  const blessings = await listPublicBlessings(200)

  return (
    <main className="mx-auto max-w-xl px-4 py-16">
      <header className="text-center">
        <p className="font-body text-xs uppercase tracking-[0.3em] text-rose-dusty">Blessings</p>
        <h1 className="mt-3 font-display text-4xl font-semibold text-ivory sm:text-5xl">Guestbook</h1>
        <div className="mt-5 flex justify-center">
          <GoldDivider width={220} />
        </div>
        <p className="mx-auto mt-6 max-w-md font-body text-sm leading-relaxed text-ivory/70">
          Leave a warm wish for Kajal and Daya Sagar. Your blessing appears below for
          everyone to see — tick the box if you&apos;d rather keep it private.
        </p>
      </header>

      <div className="mt-12">
        <GuestbookForm />
      </div>

      {/* Public blessings feed */}
      <section aria-label="Blessings from guests" className="mt-16">
        <div className="mb-6 flex items-center justify-center gap-3">
          <span className="h-px w-8 bg-gold/50" />
          <h2 className="font-display text-2xl font-semibold text-gold-light">
            Blessings &amp; Wishes
          </h2>
          <span className="h-px w-8 bg-gold/50" />
        </div>

        {blessings.length === 0 ? (
          <div className="rounded-xl border border-gold/15 bg-white/[0.02] p-8 text-center">
            <p className="font-body text-sm text-ivory/60">
              Be the first to leave a blessing for the couple. 💐
            </p>
          </div>
        ) : (
          <ul className="space-y-4">
            {blessings.map((b) => (
              <li
                key={b.id}
                className="rounded-2xl border border-gold/20 bg-white/[0.03] px-5 py-4"
              >
                <p className="font-serif text-base leading-relaxed text-ivory/90">
                  &ldquo;{b.message}&rdquo;
                </p>
                <div className="mt-3 flex items-center justify-between">
                  <span className="font-display text-sm font-semibold text-gold-light">
                    — {b.name}
                  </span>
                  <span className="font-body text-[0.7rem] text-ivory/45">
                    {formatWhen(b.created_at)}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  )
}
