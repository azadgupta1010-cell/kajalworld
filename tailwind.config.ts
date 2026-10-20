import type { Config } from 'tailwindcss'

/**
 * Design tokens from the Kajalworld brief (section 4).
 * Deep Rose #9D294B · Blush #F3DDE2 · Ivory #FFF9F2 · Champagne #C5A16A
 * Dusty Rose #C78D9E · Dark Plum #21191B · Warm Ivory Text #FFF9F2
 */
const config: Config = {
  content: [
    './src/app/**/*.{ts,tsx}',
    './src/components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        rose: {
          deep: '#9D294B',
          DEFAULT: '#9D294B',
          dusty: '#C78D9E',
        },
        blush: '#F3DDE2',
        ivory: '#FFF9F2',
        champagne: {
          DEFAULT: '#C5A16A',
          light: '#E3C891',
          deep: '#A5824A',
        },
        gold: {
          DEFAULT: '#C5A16A',
          light: '#E3C891',
          deep: '#A5824A',
        },
        plum: '#21191B',
        night: '#21191B',
      },
      fontFamily: {
        display: ['var(--font-display)', 'Georgia', 'serif'],
        serif: ['var(--font-serif)', 'Georgia', 'serif'],
        body: ['var(--font-body)', 'system-ui', 'sans-serif'],
        script: ['var(--font-script)', 'cursive'],
      },
      letterSpacing: {
        luxe: '0.35em',
      },
      boxShadow: {
        gold: '0 0 24px rgba(197, 161, 106, 0.35)',
        card: '0 24px 60px -20px rgba(0,0,0,0.55)',
      },
    },
  },
  plugins: [],
}

export default config
