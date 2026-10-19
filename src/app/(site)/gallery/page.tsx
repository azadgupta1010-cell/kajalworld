import type { Metadata } from 'next'
import { Gallery } from '@/components/gallery/Gallery'
import { placeholderItems } from '@/components/gallery/placeholderItems'

export const metadata: Metadata = {
  title: 'Gallery — Kajal & Daya Sagar',
}

export default function GalleryPage() {
  return (
    <main className="pt-6">
      <Gallery items={placeholderItems} />
      <p className="mx-auto max-w-xl px-4 pb-16 text-center font-body text-sm text-ivory/60">
        These are placeholders for now. Real photographs will appear here after the wedding, and
        guests will be able to add their own moments through the photo uploads.
      </p>
    </main>
  )
}
