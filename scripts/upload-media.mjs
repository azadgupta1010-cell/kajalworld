// ============================================================================
//  One-off: upload everything in public/media to a Supabase Storage bucket
//  ("media", public) and print the public URL map. Uses the service-role key
//  read from the environment so the secret is never written to disk.
//
//  Usage (PowerShell):
//    node scripts/upload-media.mjs
//  (reads NEXT_PUBLIC_SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY from .env.local)
// ============================================================================

import { readFileSync, readdirSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join, extname } from 'node:path'
import { createClient } from '@supabase/supabase-js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')
const mediaDir = join(root, 'public', 'media')

// Load env from .env.local manually (no dotenv dependency).
const envText = readFileSync(join(root, '.env.local'), 'utf8')
const env = Object.fromEntries(
  envText
    .split('\n')
    .map((l) => l.trim())
    .filter((l) => l && !l.startsWith('#') && l.includes('='))
    .map((l) => {
      const i = l.indexOf('=')
      return [l.slice(0, i).trim(), l.slice(i + 1).trim()]
    }),
)

const url = env.NEXT_PUBLIC_SUPABASE_URL
const serviceKey = env.SUPABASE_SERVICE_ROLE_KEY
if (!url || !serviceKey) {
  console.error('Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local')
  process.exit(1)
}

const supabase = createClient(url, serviceKey, {
  auth: { autoRefreshToken: false, persistSession: false },
})

const BUCKET = 'media'

const contentTypes = {
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.gif': 'image/gif',
  '.mp3': 'audio/mpeg',
  '.mp4': 'video/mp4',
}

async function ensureBucket() {
  const { data: buckets } = await supabase.storage.listBuckets()
  if (!buckets?.some((b) => b.name === BUCKET)) {
    const { error } = await supabase.storage.createBucket(BUCKET, {
      public: true,
      fileSizeLimit: '50MB',
    })
    if (error) throw error
    console.log(`Created public bucket "${BUCKET}".`)
  } else {
    console.log(`Bucket "${BUCKET}" already exists.`)
  }
}

/** Recursively list files under a dir, returning paths RELATIVE to mediaDir
 *  using forward slashes (so subfolders like gallery/ become bucket keys). */
function listFiles(dir, base = '') {
  const out = []
  for (const d of readdirSync(dir, { withFileTypes: true })) {
    const rel = base ? `${base}/${d.name}` : d.name
    if (d.isDirectory()) out.push(...listFiles(join(dir, d.name), rel))
    else if (d.isFile()) out.push(rel)
  }
  return out
}

async function main() {
  await ensureBucket()

  // Upload every file in public/media, preserving subfolders (e.g. gallery/).
  const files = listFiles(mediaDir)

  const map = {}
  for (const key of files) {
    const buf = readFileSync(join(mediaDir, key))
    const ext = extname(key).toLowerCase()
    const contentType = contentTypes[ext] || 'application/octet-stream'

    const { error } = await supabase.storage
      .from(BUCKET)
      .upload(key, buf, { contentType, upsert: true })

    if (error) {
      console.error(`  FAILED ${key}: ${error.message}`)
      continue
    }
    const { data } = supabase.storage.from(BUCKET).getPublicUrl(key)
    map[key] = data.publicUrl
    console.log(`  uploaded ${key}`)
  }

  writeFileSync(join(root, 'scripts', 'media-url-map.json'), JSON.stringify(map, null, 2))
  console.log('\nURL map written to scripts/media-url-map.json')
  console.log(`Total uploaded: ${Object.keys(map).length} files`)
}

main().catch((err) => {
  console.error('\nUPLOAD FAILED:', err.message)
  process.exit(1)
})
