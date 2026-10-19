'use client'

import { motion } from 'framer-motion'
import { GoldFrame } from '@/components/ui/GoldFrame'
import { GoldDivider } from '@/components/decor/GoldDivider'
import { staggerContainer, textRise, goldGlow } from '@/motion/variants'
import { weddingConfig } from '@/config/weddingConfig'

interface InvitationCardProps {
  onEnter: () => void
  reduced: boolean
}

/**
 * The revealed invitation card — a real responsive HTML component.
 * All names/dates/venues are selectable HTML text pulled from config.
 */
export function InvitationCard({ onEnter, reduced }: InvitationCardProps) {
  const { couple, hero, invitation } = weddingConfig

  return (
    <motion.div
      className="mx-auto w-full max-w-md px-4"
      variants={staggerContainer}
      initial={reduced ? false : 'hidden'}
      animate="show"
    >
      <GoldFrame className="px-7 py-10 sm:px-10 sm:py-12">
        <motion.p
          variants={textRise}
          className="text-center font-display text-lg font-medium text-rose-deep"
        >
          {invitation.openingText}
        </motion.p>

        <motion.p
          variants={textRise}
          className="mt-5 text-center font-body text-sm leading-relaxed text-rose-deep/80"
        >
          {invitation.familyMessage}
        </motion.p>

        <motion.div variants={textRise} className="mt-5 flex justify-center">
          <GoldDivider width={200} />
        </motion.div>

        <motion.h1
          variants={goldGlow}
          className="mt-6 text-center font-display text-5xl font-semibold leading-tight text-rose-deep sm:text-6xl"
        >
          {couple.bride.name}
          <span className="mx-2 font-script text-3xl text-rose-dusty">&amp;</span>
          {couple.groom.name}
        </motion.h1>

        <motion.div variants={textRise} className="mt-6 flex justify-center">
          <GoldDivider width={200} />
        </motion.div>

        <motion.p
          variants={textRise}
          className="mt-6 text-center font-body text-sm leading-relaxed text-rose-deep/80"
        >
          {hero.dateLabel}
          <br />
          {hero.venueLabel}
        </motion.p>

        <motion.p
          variants={textRise}
          className="mt-5 text-center font-body text-xs italic leading-relaxed text-rose-deep/70"
        >
          {invitation.blessing}
        </motion.p>

        {invitation.draft && (
          <motion.p
            variants={textRise}
            className="mt-5 text-center font-body text-[0.7rem] uppercase tracking-[0.18em] text-rose-dusty"
          >
            Family details to be confirmed
          </motion.p>
        )}

        <motion.div variants={textRise} className="mt-9 flex justify-center">
          <button
            type="button"
            onClick={onEnter}
            className="rounded-full border border-gold bg-rose-deep px-8 py-3 font-body text-sm uppercase tracking-[0.2em] text-ivory shadow-gold transition hover:bg-rose focus-visible:outline"
          >
            Enter Celebration
          </button>
        </motion.div>
      </GoldFrame>
    </motion.div>
  )
}
