// Upload a single file to the Supabase media bucket (upsert = replace).
// Usage: node scripts/upload-one.mjs <localPathUnderPublicMedia> <bucketKey>
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join, extname } from 'node:path'
import { createClient } from '@supabase/supabase-js'

const root = dirname(dirname(fileURLToPath(import.meta.url)))
const envText = readFileSync(join(root, '.env.local'), 'utf8')
const env = Object.fromEntries(
  envText.split('\n').map((l) => l.trim()).filter((l) => l && !l.startsWith('#') && l.includes('='))
    .map((l) => { const i = l.indexOf('='); return [l.slice(0, i).trim(), l.slice(i + 1).trim()] }),
)
const supabase = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY, {
  auth: { autoRefreshToken: false, persistSession: false },
})

const [localRel, key] = process.argv.slice(2)
const types = { '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.png': 'image/png', '.webp': 'image/webp' }
const buf = readFileSync(join(root, 'public', 'media', localRel))
const { error } = await supabase.storage.from('media').upload(key, buf, {
  contentType: types[extname(key).toLowerCase()] || 'application/octet-stream',
  upsert: true,
})
if (error) { console.error('FAILED:', error.message); process.exit(1) }
console.log('Uploaded (replaced):', key)
