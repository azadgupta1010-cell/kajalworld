// Probe: does the DB have the expected tables? Uses the service-role key.
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { createClient } from '@supabase/supabase-js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')
const envText = readFileSync(join(root, '.env.local'), 'utf8')
const env = Object.fromEntries(
  envText.split('\n').map((l) => l.trim()).filter((l) => l && !l.startsWith('#') && l.includes('='))
    .map((l) => { const i = l.indexOf('='); return [l.slice(0, i).trim(), l.slice(i + 1).trim()] }),
)

const supabase = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY, {
  auth: { autoRefreshToken: false, persistSession: false },
})

const tables = ['events', 'guestbook_entries', 'rsvps', 'guests']
for (const t of tables) {
  const { error, count } = await supabase.from(t).select('*', { count: 'exact', head: true })
  if (error) console.log(`${t.padEnd(20)} MISSING or error: ${error.message}`)
  else console.log(`${t.padEnd(20)} OK (rows: ${count})`)
}
