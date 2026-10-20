'use client'

import { motion } from 'framer-motion'
import { GoldFrame } from '@/components/ui/GoldFrame'
import { GoldDivider } from '@/components/decor/GoldDivider'
import { GaneshLogo } from '@/components/decor/GaneshLogo'
import { staggerContainer, textRise, goldGlow } from '@/motion/variants'
import { weddingConfig } from '@/config/weddingConfig'

interface InvitationCardProps {
  onEnter: () => void
  reduced: boolean
}

/**
 * The revealed invitation card — a real responsive HTML component styled like
 * an elegant printed wedding card. All names/dates/venues are selectable HTML
 * text pulled from config (nothing baked into images).
 */
export function InvitationCard({ onEnter, reduced }: InvitationCardProps) {
  const { couple, hero, invitation } = weddingConfig

  return (
    <motion.div
      className="mx-auto w-full max-w-md px-3"
      variants={staggerContainer}
      initial={reduced ? false : 'hidden'}
      animate="show"
    >
      <GoldFrame className="px-6 py-9 sm:px-9 sm:py-11">
        {/* Ganesh mark */}
        <motion.div variants={textRise} className="flex justify-center">
          <GaneshLogo tone="green" className="h-10 w-auto opacity-90" />
        </motion.div>

        {/* Shlok */}
        <motion.p
          variants={textRise}
          className="mx-auto mt-3 max-w-xs text-center font-serif text-sm leading-relaxed text-rose-deep/90"
          lang="hi"
        >
          {invitation.openingTextHi}
        </motion.p>

        <motion.div variants={textRise} className="mt-5 flex justify-center">
          <GoldDivider width={180} />
        </motion.div>

        {/* Grandparents blessing */}
        <motion.p
          variants={textRise}
          className="mt-5 text-center font-body text-[0.65rem] uppercase tracking-[0.3em] text-rose-dusty"
        >
          With the blessings of our grandparents
        </motion.p>
        <motion.p
          variants={textRise}
          className="mt-1.5 text-center font-serif text-[0.95rem] font-medium text-rose-deep"
        >
          {invitation.grandparents}
        </motion.p>

        {/* Invitation line */}
        <motion.p
          variants={textRise}
          className="mx-auto mt-5 max-w-sm text-center font-body text-[0.8rem] leading-relaxed text-rose-deep/75"
        >
          {invitation.familyMessage}
        </motion.p>

        {/* Couple names — the centrepiece */}
        <motion.div variants={goldGlow} className="mt-6 flex flex-col items-center">
          <h1 className="text-center font-script text-5xl leading-none text-rose-deep sm:text-6xl">
            {couple.bride.name}
          </h1>

          <div className="my-2 flex items-center gap-3">
            <span className="h-px w-8 bg-gold/60" />
            <span className="font-serif text-lg italic text-rose-dusty">weds</span>
            <span className="h-px w-8 bg-gold/60" />
          </div>

          <h1 className="text-center font-script text-5xl leading-none text-rose-deep sm:text-6xl">
            {couple.groom.name}
          </h1>
        </motion.div>

        {/* Parentage of both sides */}
        <motion.p
          variants={textRise}
          className="mt-4 text-center font-body text-[0.72rem] leading-relaxed text-rose-deep/70"
        >
          D/o {invitation.brideParents}
          <br />
          S/o {invitation.groomParents}
        </motion.p>

        <motion.div variants={textRise} className="mt-6 flex justify-center">
          <GoldDivider width={180} />
        </motion.div>

        {/* Date & venue */}
        <motion.p
          variants={textRise}
          className="mt-5 text-center font-serif text-base font-medium text-rose-deep"
        >
          {hero.dateLabel}
        </motion.p>
        <motion.p
          variants={textRise}
          className="mt-1 text-center font-body text-[0.8rem] leading-relaxed text-rose-deep/75"
        >
          {hero.venueLabel}
        </motion.p>

        <motion.p
          variants={textRise}
          className="mx-auto mt-5 max-w-xs text-center font-serif text-[0.8rem] italic leading-relaxed text-rose-deep/70"
        >
          {invitation.blessing}
        </motion.p>

        {/* CTA */}
        <motion.div variants={textRise} className="mt-8 flex justify-center">
          <button
            type="button"
            onClick={onEnter}
            className="rounded-full border border-gold bg-rose-deep px-8 py-3 font-body text-xs font-medium uppercase tracking-[0.22em] text-ivory shadow-gold transition hover:bg-rose focus-visible:outline"
          >
            Begin the Celebrations &rarr;
          </button>
        </motion.div>
      </GoldFrame>
    </motion.div>
  )
}
