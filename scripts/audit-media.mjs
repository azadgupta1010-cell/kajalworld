// Audit: check every media reference in weddingConfig against the Supabase
// bucket. Reports which exist (200) and which are missing.
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const root = dirname(dirname(fileURLToPath(import.meta.url)))
const envText = readFileSync(join(root, '.env.local'), 'utf8')
const env = Object.fromEntries(
  envText.split('\n').map((l) => l.trim()).filter((l) => l && !l.startsWith('#') && l.includes('='))
    .map((l) => { const i = l.indexOf('='); return [l.slice(0, i).trim(), l.slice(i + 1).trim()] }),
)
const base = env.NEXT_PUBLIC_SUPABASE_URL

const refs = [
  'gallery/engagement-1.jpg','gallery/engagement-2.jpg','gallery/engagement-3.jpg',
  'gallery/engagement-4.jpg','gallery/engagement-5.jpg','gallery/engagement-6.jpg',
  'gallery/engagement-7.jpg',
  'ganesh-logo.png','gira.mp3','hero-bg.png','story-couple.jpg',
  'tilak-bg.jpg','sangeet-bg.jpg','mehndi-bg.jpg','haldi-bg.jpg','wedding-bg.jpg',
  'Aaj Sajeya.mp4','Chitta.mp4','Kale Rang Da Paranda.mp4','Kut Kut Bajra.mp3',
]

const missing = []
for (const f of refs) {
  const url = `${base}/storage/v1/object/public/media/${f.split('/').map(encodeURIComponent).join('/')}`
  let status
  try { status = (await fetch(url, { method: 'HEAD' })).status } catch { status = 'ERR' }
  const ok = status === 200
  if (!ok) missing.push(f)
  console.log(`${ok ? 'OK ' : 'XX '} ${status}  ${f}`)
}
console.log(`\n${missing.length === 0 ? 'ALL PRESENT ✓' : 'MISSING (' + missing.length + '): ' + missing.join(', ')}`)
