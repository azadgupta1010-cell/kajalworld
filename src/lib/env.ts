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
