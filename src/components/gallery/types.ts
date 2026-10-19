/**
 * Media shape for the gallery components. Media is passed as a prop from the
 * page/route (placeholders for now, real uploads in a later phase) rather than
 * read from weddingConfig.
 */
export interface GalleryMedia {
  id: string
  type: 'image' | 'video'
  src: string
  thumb?: string
  poster?: string
  alt: string
  /** Optional grid span hint: 1 (default) or 2 (tall tile). */
  span?: 1 | 2
}
