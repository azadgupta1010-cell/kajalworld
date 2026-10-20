import type { GalleryMedia } from '@/components/gallery/types'
import { weddingConfig } from '@/config/weddingConfig'

/**
 * Gallery media. Uses the couple's engagement photos from config first, then
 * fills the grid with decorative placeholder tiles so the layout always looks
 * complete. If an engagement image file is missing, the tile degrades to a
 * graceful "unavailable" state (handled in GalleryImage) — never a fake photo.
 */
const engagement: GalleryMedia[] = weddingConfig.gallery.map((g, i) => ({
  id: `engagement-${i + 1}`,
  type: 'image',
  src: g.src,
  alt: g.alt,
  span: i === 0 ? 2 : 1,
}))

const placeholders: GalleryMedia[] = Array.from({ length: 4 }, (_, i) => ({
  id: `placeholder-${i + 1}`,
  type: 'image',
  src: `/media/placeholder-${i + 1}.svg`,
  alt: `A moment to be captured ${i + 1}`,
}))

export const galleryItems: GalleryMedia[] = [...engagement, ...placeholders]
