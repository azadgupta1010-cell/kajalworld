'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Envelope } from '@/components/intro/Envelope'
import { InvitationCard } from '@/components/intro/InvitationCard'
import { FloralCorner } from '@/components/decor/FloralCorner'
import { Monogram } from '@/components/decor/Monogram'
import { useReducedMotionPref } from '@/hooks/useReducedMotion'
import { useMusic } from '@/components/audio/MusicContext'

interface IntroExperienceProps {
  monogram: string
  /** Begin the guided event journey (also called on tap of the card stage). */
  onBegin: () => void
}

type Stage = 'sealed' | 'opening' | 'card'

/**
 * Opening sequence:
 *  1. A sealed envelope on a deep-rose stage. Tapping it (or the button) opens
 *     the flap and starts the music (first user gesture → audible playback).
 *  2. After a short hold the invitation card rises into view with all details.
 *  3. Tapping anywhere on the card stage begins the guided event journey.
 * No Skip button — the whole screen is the control. Reduced motion supported.
 */
export function IntroExperience({ monogram, onBegin }: IntroExperienceProps) {
  const reduced = useReducedMotionPref()
  const music = useMusic()
  const [stage, setStage] = useState<Stage>('sealed')

  const handleOpen = () => {
    if (stage !== 'sealed') return
    void music?.play()
    setStage('opening')
    // Envelope flap animation, then a gentle 1–1.5s hold before the card.
    window.setTimeout(() => setStage('card'), reduced ? 0 : 1500)
  }

  return (
    <motion.div
      className="fixed inset-0 z-[60] flex flex-col items-center overflow-y-auto overflow-x-hidden"
      style={{
        background:
          'radial-gradient(120% 120% at 50% 20%, #9D294B 0%, #86203F 45%, #5E1930 100%)',
      }}
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.6 } }}
    >
      {/* Floral vignette corners */}
      <FloralCorner corner="tl" size={150} className="pointer-events-none absolute left-0 top-0 opacity-50" />
      <FloralCorner corner="tr" size={150} className="pointer-events-none absolute right-0 top-0 opacity-50" />
      <FloralCorner corner="bl" size={150} className="pointer-events-none absolute bottom-0 left-0 opacity-40" />
      <FloralCorner corner="br" size={150} className="pointer-events-none absolute bottom-0 right-0 opacity-40" />

      {/* soft warm light wash */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(60% 50% at 50% 45%, rgba(231,204,138,0.14), transparent 70%)',
        }}
      />

      <div className="relative z-10 flex min-h-[100svh] w-full flex-col items-center justify-center px-4 py-10 sm:py-14">
        <AnimatePresence mode="wait">
          {stage !== 'card' ? (
            <motion.div
              key="envelope-stage"
              className="flex flex-col items-center"
              exit={{ opacity: 0, transition: { duration: reduced ? 0 : 0.4 } }}
            >
              <motion.div
                className="mb-8 flex flex-col items-center"
                initial={reduced ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              >
                <Monogram tone="ivory" size={96} className="mb-4 opacity-95" />
                <p className="text-center font-display text-3xl font-medium text-ivory sm:text-4xl">
                  A Wedding Invitation
                </p>
              </motion.div>

              <Envelope
                monogram={monogram}
                opened={stage === 'opening'}
                reduced={reduced}
                onOpen={handleOpen}
              />

              {stage === 'sealed' && (
                <motion.button
                  type="button"
                  onClick={handleOpen}
                  className="mt-12 rounded-full border border-gold bg-gold/10 px-7 py-3 font-body text-sm uppercase tracking-[0.25em] text-gold-light backdrop-blur transition hover:bg-gold/20"
                  initial={reduced ? false : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: reduced ? 0 : 0.6, duration: 0.6 }}
                >
                  Open Your Invitation
                </motion.button>
              )}
            </motion.div>
          ) : (
            // Whole card stage is tappable → begins the journey.
            <motion.button
              key="card-stage"
              type="button"
              onClick={onBegin}
              aria-label="Begin the celebrations"
              className="w-full cursor-pointer focus-visible:outline"
              initial={reduced ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <InvitationCard reduced={reduced} />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}
