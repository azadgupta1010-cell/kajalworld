import type { GalleryMedia } from '@/components/gallery/types'

/**
 * Placeholder preview media pointing at the SVGs in /public/media.
 * Real photos arrive after the wedding (and via guest uploads in a later phase).
 */
export const placeholderItems: GalleryMedia[] = Array.from({ length: 6 }, (_, i) => ({
  id: `placeholder-${i + 1}`,
  type: 'image',
  src: `/media/placeholder-${i + 1}.svg`,
  alt: `Placeholder moment ${i + 1}`,
}))
