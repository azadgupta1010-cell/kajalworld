import type { Variants } from 'framer-motion'

/**
 * Reusable motion variants. All animations use transform + opacity only
 * (GPU friendly). No layout-affecting properties, no infinite loops.
 */

export const easeLux = [0.22, 1, 0.36, 1] as const

export const sectionFade: Variants = {
  hidden: { opacity: 0, y: 28, scale: 0.985 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.8, ease: easeLux },
  },
}

export const staggerContainer: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
}

export const textRise: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: easeLux },
  },
}

export const goldGlow: Variants = {
  hidden: { opacity: 0, filter: 'drop-shadow(0 0 0px rgba(231,204,138,0))' },
  show: {
    opacity: 1,
    filter: 'drop-shadow(0 0 14px rgba(231,204,138,0.55))',
    transition: { duration: 1.2, ease: easeLux },
  },
}

// --- Envelope opening sequence ---

export const envelopeFloat: Variants = {
  idle: {
    y: [0, -6, 0],
    transition: { duration: 4, ease: 'easeInOut', repeat: Infinity },
  },
  still: { y: 0 },
}

export const flapOpen: Variants = {
  closed: { rotateX: 0 },
  open: {
    rotateX: -175,
    transition: { duration: 0.8, ease: easeLux },
  },
}

export const cardRise: Variants = {
  inside: { y: 0, opacity: 0, scale: 0.9 },
  out: {
    y: '-62%',
    opacity: 1,
    scale: 1,
    transition: { duration: 0.9, ease: easeLux, delay: 0.35 },
  },
}

export const sealPress: Variants = {
  rest: { scale: 1 },
  press: { scale: 0.92, transition: { duration: 0.15 } },
  lift: { scale: 1.08, opacity: 0, transition: { duration: 0.5, ease: easeLux } },
}

// --- Gallery ---

export const galleryItem: Variants = {
  hidden: { opacity: 0, y: 24, scale: 0.96 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: easeLux },
  },
}

export const lightbox: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.35, ease: easeLux } },
  exit: { opacity: 0, scale: 0.92, transition: { duration: 0.25, ease: easeLux } },
}

export const overlayFade: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.3 } },
  exit: { opacity: 0, transition: { duration: 0.25 } },
}
