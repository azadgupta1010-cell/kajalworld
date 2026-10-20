import type { Variants } from 'framer-motion'

/**
 * Reusable motion variants. All animations use transform + opacity only
 * (GPU friendly). No layout-affecting properties, no infinite loops.
 *
 * Tuned for a SOFT, fluid feel: gentle easing, generous durations, small
 * travel distances so nothing feels sharp or abrupt.
 */

// Very soft ease-out curve (slow settle, no snap).
export const easeLux = [0.16, 1, 0.3, 1] as const

export const sectionFade: Variants = {
  hidden: { opacity: 0, y: 22, scale: 0.99 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 1.1, ease: easeLux },
  },
}

export const staggerContainer: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.16, delayChildren: 0.12 },
  },
}

export const textRise: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.95, ease: easeLux },
  },
}

export const goldGlow: Variants = {
  hidden: { opacity: 0, filter: 'drop-shadow(0 0 0px rgba(231,204,138,0))' },
  show: {
    opacity: 1,
    filter: 'drop-shadow(0 0 16px rgba(231,204,138,0.5))',
    transition: { duration: 1.6, ease: easeLux },
  },
}

// --- Gallery ---

export const galleryItem: Variants = {
  hidden: { opacity: 0, y: 20, scale: 0.97 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.85, ease: easeLux },
  },
}

export const lightbox: Variants = {
  hidden: { opacity: 0, scale: 0.94 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.45, ease: easeLux } },
  exit: { opacity: 0, scale: 0.96, transition: { duration: 0.35, ease: easeLux } },
}

export const overlayFade: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.4 } },
  exit: { opacity: 0, transition: { duration: 0.3 } },
}
