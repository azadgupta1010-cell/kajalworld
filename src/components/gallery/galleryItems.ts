import type { GalleryMedia } from '@/components/gallery/types'
import { weddingConfig } from '@/config/weddingConfig'
import { mediaUrl } from '@/lib/env'

/**
 * Gallery media — the couple's real engagement / sagai photographs from config.
 * Portrait shots get a taller span for an editorial masonry feel. If a file is
 * missing it degrades to a graceful placeholder tile (handled in GalleryImage),
 * never a fake photo.
 */
// Taller tiles for the portrait photos (indices here are 1,3,5 → span 2).
const tallIndexes = new Set([0, 3, 5])

export const galleryItems: GalleryMedia[] = weddingConfig.gallery.map((g, i) => ({
  id: `engagement-${i + 1}`,
  type: 'image',
  src: mediaUrl(g.src),
  alt: g.alt,
  span: tallIndexes.has(i) ? 2 : 1,
}))
