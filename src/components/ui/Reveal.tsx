'use client'

import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { sectionFade } from '@/motion/variants'
import { useReducedMotionPref } from '@/hooks/useReducedMotion'

interface RevealProps {
  children: ReactNode
  className?: string
  /** delay in seconds */
  delay?: number
  as?: 'div' | 'section'
}

/**
 * Scroll-triggered reveal using whileInView. Fires once. Falls back to a
 * static, fully-visible element when reduced motion is requested.
 */
export function Reveal({ children, className, delay = 0, as = 'div' }: RevealProps) {
  const reduced = useReducedMotionPref()
  const Comp = as === 'section' ? motion.section : motion.div

  if (reduced) {
    const Static = as === 'section' ? 'section' : 'div'
    return <Static className={className}>{children}</Static>
  }

  return (
    <Comp
      className={className}
      variants={sectionFade}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      transition={{ delay }}
    >
      {children}
    </Comp>
  )
}
