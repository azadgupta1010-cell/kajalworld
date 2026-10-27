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
        Moments from our engagement. More photographs from the wedding celebrations
        will be added here soon.
      </p>
    </main>
  )
}
