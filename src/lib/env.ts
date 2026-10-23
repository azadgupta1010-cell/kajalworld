/**
 * Central environment access with graceful degradation.
 * When Supabase env vars are absent, the app still renders the full public
 * wedding experience (intro, invitation, events, countdown). Backend-powered
 * features (RSVP, uploads, admin) detect `isSupabaseConfigured` and show a
 * friendly "not configured yet" state instead of crashing.
 */

export const env = {
  supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL ?? '',
  supabaseAnonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? '',
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000',
}

export const isSupabaseConfigured =
  !!env.supabaseUrl &&
  !!env.supabaseAnonKey &&
  !env.supabaseUrl.includes('YOUR-PROJECT')

/**
 * Resolve a media reference to its final URL.
 * All site media now lives in the Supabase Storage "media" bucket, so a
 * reference like "/media/gira.mp3" is rewritten to the bucket's public URL.
 * Absolute URLs (http...) are returned unchanged. When Supabase is not
 * configured (local dev without env), it falls back to the local path so the
 * app still renders.
 */
export function mediaUrl(ref?: string | null): string {
  if (!ref) return ''
  if (ref.startsWith('http://') || ref.startsWith('https://')) return ref
  const file = ref.replace(/^\/?media\//, '').replace(/^\//, '')
  if (!isSupabaseConfigured) return `/media/${file}`
  const encoded = file
    .split('/')
    .map((seg) => encodeURIComponent(seg))
    .join('/')
  return `${env.supabaseUrl}/storage/v1/object/public/media/${encoded}`
}

/** Server-only secrets. Never import this into a client component. */
export function serverEnv() {
  return {
    serviceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY ?? '',
    adminAllowedEmails: (process.env.ADMIN_ALLOWED_EMAILS ?? '')
      .split(',')
      .map((e) => e.trim().toLowerCase())
      .filter(Boolean),
  }
}
