import { createClient } from './supabase/server'
import { serverEnv } from './env'

/**
 * Server-side admin authorization. Returns the authenticated admin user or
 * null. Authorization = valid Supabase session AND email in the allowlist.
 * This is enforced on the server; a guessable URL is never sufficient.
 */
export async function getAdminUser() {
  const supabase = await createClient()
  if (!supabase) return null

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user?.email) return null

  const { adminAllowedEmails } = serverEnv()
  if (adminAllowedEmails.length === 0) return null
  if (!adminAllowedEmails.includes(user.email.toLowerCase())) return null

  return user
}

export async function requireAdmin() {
  const user = await getAdminUser()
  if (!user) throw new Error('UNAUTHORIZED')
  return user
}
