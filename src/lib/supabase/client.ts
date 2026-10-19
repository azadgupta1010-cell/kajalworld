'use client'

import { createBrowserClient } from '@supabase/ssr'
import { env, isSupabaseConfigured } from '../env'

/**
 * Browser Supabase client (uses the public anon key + RLS).
 * Returns null when Supabase is not configured so callers can degrade.
 */
export function createClient() {
  if (!isSupabaseConfigured) return null
  return createBrowserClient(env.supabaseUrl, env.supabaseAnonKey)
}
