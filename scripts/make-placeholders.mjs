// Generates original decorative placeholder gallery images (SVG).
// These are clearly labelled placeholders — NOT fake couple photos.
// Run: node scripts/make-placeholders.mjs
import { mkdirSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const outDir = join(__dirname, '..', 'public', 'media')
mkdirSync(outDir, { recursive: true })

const tones = [
  ['#8A2846', '#6E162F'],
  ['#B56576', '#8A2846'],
  ['#D8A0AD', '#B56576'],
  ['#6E162F', '#4E0F24'],
  ['#C9A24B', '#A47E2E'],
  ['#3a1824', '#220d15'],
]

for (let i = 0; i < 6; i++) {
  const [a, b] = tones[i]
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${a}"/>
      <stop offset="1" stop-color="${b}"/>
    </linearGradient>
    <linearGradient id="gold" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#E7CC8A"/>
      <stop offset="1" stop-color="#A47E2E"/>
    </linearGradient>
  </defs>
  <rect width="800" height="600" fill="url(#bg)"/>
  <rect x="24" y="24" width="752" height="552" fill="none" stroke="url(#gold)" stroke-width="2" opacity="0.6"/>
  <g transform="translate(400 280)" fill="url(#gold)" opacity="0.85">
    ${[0, 72, 144, 216, 288]
      .map((deg) => `<ellipse cx="0" cy="-40" rx="22" ry="48" transform="rotate(${deg})"/>`)
      .join('\n    ')}
    <circle cx="0" cy="0" r="18" fill="#FBF4EC"/>
  </g>
  <text x="400" y="430" text-anchor="middle" font-family="Georgia, serif" font-size="30" fill="#FBF4EC" opacity="0.9">Your photo here</text>
  <text x="400" y="468" text-anchor="middle" font-family="Arial, sans-serif" font-size="16" fill="#FBF4EC" opacity="0.6">Replace in /public/media or via admin</text>
</svg>`
  writeFileSync(join(outDir, `placeholder-${i + 1}.svg`), svg)
}

console.log('Generated 6 placeholder gallery images in public/media')
