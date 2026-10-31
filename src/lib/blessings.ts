import { createClient } from '@supabase/supabase-js'
import { env, isSupabaseConfigured } from '@/lib/env'

export interface Blessing {
  id: string
  name: string
  message: string
  created_at: string
}

/**
 * Fetch public blessings (approved + public) from the Supabase feed view with
 * the anon key. Returns newest first. Empty array on any failure.
 */
export async function listPublicBlessings(limit = 100): Promise<Blessing[]> {
  if (!isSupabaseConfigured) return []
  try {
    const supabase = createClient(env.supabaseUrl, env.supabaseAnonKey, {
      auth: { autoRefreshToken: false, persistSession: false },
    })
    const { data, error } = await supabase
      .from('public_blessings_feed')
      .select('id,name,message,created_at')
      .order('created_at', { ascending: false })
      .limit(limit)
    if (error || !data) return []
    return data as Blessing[]
  } catch {
    return []
  }
}
