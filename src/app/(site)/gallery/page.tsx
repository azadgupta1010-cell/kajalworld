import type { Metadata } from 'next'
import { Gallery } from '@/components/gallery/Gallery'
import { galleryItems } from '@/components/gallery/galleryItems'
import { listGalleryFromStorage } from '@/lib/galleryStorage'

export const metadata: Metadata = {
  title: 'Gallery — Kajal & Daya Sagar',
}

// Revalidate periodically so newly added Supabase photos appear without a
// redeploy (and without hammering storage on every request).
export const revalidate = 60

export default async function GalleryPage() {
  // Prefer the live list from Supabase Storage; fall back to config photos.
  const live = await listGalleryFromStorage()
  const items = live.length > 0 ? live : galleryItems

  return (
    <main className="pt-6">
      <Gallery items={items} />

      {/* Stay-tuned banner */}
      <section className="mx-auto mb-16 max-w-xl px-4">
        <div className="rounded-3xl border border-gold/25 bg-white/[0.03] px-6 py-8 text-center">
          <p className="text-2xl" aria-hidden="true">✨</p>
          <h3 className="mt-2 font-display text-2xl font-semibold text-ivory sm:text-3xl">
            Stay tuned
          </h3>
          <p className="mx-auto mt-3 max-w-md font-body text-sm leading-relaxed text-ivory/70">
            These are moments from our engagement. Many more beautiful memories from
            the wedding celebrations are on their way — stay connected for updates
            and keep checking back as our story unfolds.
          </p>
          <p className="mt-4 font-script text-2xl text-gold-light">With love, Kajal &amp; Daya Sagar</p>
        </div>
      </section>
    </main>
  )
}
