import { createClient } from '@supabase/supabase-js'
import { env, isSupabaseConfigured } from '@/lib/env'
import type { GalleryMedia } from '@/components/gallery/types'

/**
 * Live gallery listing from Supabase Storage.
 *
 * Lists every image in the `media/gallery/` folder of the public `media`
 * bucket, so the couple can add or replace photos in Supabase and the website
 * picks them up automatically — no code change needed. Sorted by name so the
 * order is predictable (engagement-1, engagement-2, ...). Falls back to an
 * empty list if storage can't be reached (caller then uses config photos).
 */
const IMAGE_EXT = /\.(jpe?g|png|webp|gif|avif)$/i

export async function listGalleryFromStorage(): Promise<GalleryMedia[]> {
  if (!isSupabaseConfigured) return []

  try {
    const supabase = createClient(env.supabaseUrl, env.supabaseAnonKey, {
      auth: { autoRefreshToken: false, persistSession: false },
    })

    const { data, error } = await supabase.storage
      .from('media')
      .list('gallery', { limit: 200, sortBy: { column: 'name', order: 'asc' } })

    if (error || !data) return []

    const images = data
      .filter((f) => IMAGE_EXT.test(f.name))
      .map((f, i) => {
        const { data: pub } = supabase.storage
          .from('media')
          .getPublicUrl(`gallery/${f.name}`)
        return {
          id: `gallery-${i + 1}`,
          type: 'image' as const,
          src: pub.publicUrl,
          alt: `Kajal & Daya Sagar — moment ${i + 1}`,
          // Give every third tile a taller span for an editorial masonry feel.
          span: (i % 3 === 0 ? 2 : 1) as 1 | 2,
        }
      })

    return images
  } catch {
    return []
  }
}
