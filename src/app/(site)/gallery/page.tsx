import type { Metadata } from 'next'
import { Gallery } from '@/components/gallery/Gallery'
import { galleryItems } from '@/components/gallery/galleryItems'

export const metadata: Metadata = {
  title: 'Gallery — Kajal & Daya Sagar',
}

export default function GalleryPage() {
  return (
    <main className="pt-6">
      <Gallery items={galleryItems} />
      <p className="mx-auto max-w-xl px-4 pb-16 text-center font-body text-sm text-ivory/60">
        Engagement moments are shown here. More photographs will appear after the wedding, and
        guests will be able to add their own moments through the photo uploads.
      </p>
    </main>
  )
}
