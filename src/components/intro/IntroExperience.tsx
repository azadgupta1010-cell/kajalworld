'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Envelope } from '@/components/intro/Envelope'
import { InvitationCard } from '@/components/intro/InvitationCard'
import { FloralCorner } from '@/components/decor/FloralCorner'
import { GaneshLogo } from '@/components/decor/GaneshLogo'
import { useReducedMotionPref } from '@/hooks/useReducedMotion'
import { useMusic } from '@/components/audio/MusicContext'

interface IntroExperienceProps {
  monogram: string
  /** Begin the guided event journey. */
  onBegin: () => void
  /** Skip straight to the homepage. */
  onSkip: () => void
}

type Stage = 'sealed' | 'opening' | 'card'

/**
 * Full opening sequence. Deep rose-pink stage with gold ornaments and a
 * floral vignette. Provides Skip at all times and a static fallback for
 * reduced motion. Calls onComplete when the guest enters the site.
 */
export function IntroExperience({ monogram, onBegin, onSkip }: IntroExperienceProps) {
  const reduced = useReducedMotionPref()
  const music = useMusic()
  const [stage, setStage] = useState<Stage>('sealed')

  const handleOpen = () => {
    if (stage !== 'sealed') return
    // Start the background music on this user gesture so it feels like the
    // invitation "opens and plays" (browsers require a gesture for sound).
    void music?.play()
    setStage('opening')
    // reveal the card after the envelope animation (instant when reduced)
    window.setTimeout(() => setStage('card'), reduced ? 0 : 1300)
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
      <FloralCorner corner="tl" size={160} className="absolute left-0 top-0 opacity-50" />
      <FloralCorner corner="tr" size={160} className="absolute right-0 top-0 opacity-50" />
      <FloralCorner corner="bl" size={160} className="absolute bottom-0 left-0 opacity-40" />
      <FloralCorner corner="br" size={160} className="absolute bottom-0 right-0 opacity-40" />

      {/* soft warm light wash */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(60% 50% at 50% 45%, rgba(231,204,138,0.14), transparent 70%)',
        }}
      />

      {/* Skip controls */}
      <button
        type="button"
        onClick={onSkip}
        className="absolute right-4 top-4 z-20 rounded-full border border-gold/50 px-4 py-1.5 font-body text-xs uppercase tracking-[0.2em] text-ivory/80 transition hover:text-ivory"
      >
        Skip
      </button>

      <div className="relative z-10 flex min-h-[100svh] w-full flex-col items-center justify-center px-4 py-16">
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
                <GaneshLogo className="mb-4 w-40 opacity-90 sm:w-52" />
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
            <motion.div
              key="card-stage"
              className="w-full"
              initial={reduced ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <InvitationCard onEnter={onBegin} reduced={reduced} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}
