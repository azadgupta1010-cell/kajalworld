import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { createClient as createAdminJs } from '@supabase/supabase-js'
import { env, isSupabaseConfigured, serverEnv } from '../env'

/**
 * Server Supabase client bound to the request cookies (respects RLS as the
 * signed-in user). Use in server components, route handlers, server actions.
 */
export async function createClient() {
  if (!isSupabaseConfigured) return null
  const cookieStore = await cookies()
  return createServerClient(env.supabaseUrl, env.supabaseAnonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll()
      },
      setAll(cookiesToSet: { name: string; value: string; options?: Record<string, unknown> }[]) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options),
          )
        } catch {
          // called from a Server Component — safe to ignore, middleware refreshes
        }
      },
    },
  })
}

/**
 * Privileged service-role client. SERVER ONLY. Bypasses RLS.
 * Use strictly for vetted admin/moderation/quota operations AFTER the caller
 * has been authorized. Never expose to the browser.
 */
export function createServiceClient() {
  const { serviceRoleKey } = serverEnv()
  if (!isSupabaseConfigured || !serviceRoleKey) return null
  return createAdminJs(env.supabaseUrl, serviceRoleKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  })
}
