'use client'

import { Countdown } from '@/components/sections/Countdown'
import { Reveal } from '@/components/ui/Reveal'
import { GoldDivider } from '@/components/decor/GoldDivider'
import { weddingConfig } from '@/config/weddingConfig'

/**
 * Standalone countdown section (its own band on the homepage), matching the
 * reference mockup's "Countdown — Until We Say I Do" section.
 */
export function CountdownSection() {
  return (
    <section className="relative px-4 py-20 text-center">
      <Reveal className="mx-auto max-w-xl">
        <p className="font-body text-xs uppercase tracking-[0.3em] text-rose-dusty">Counting down</p>
        <h2 className="mt-3 font-display text-4xl font-semibold text-ivory sm:text-5xl">
          Until We Say I Do
        </h2>
        <div className="mt-5 flex justify-center">
          <GoldDivider width={220} />
        </div>

        <div className="mt-8 flex justify-center">
          <Countdown target={weddingConfig.weddingDate} />
        </div>

        <p className="mt-6 font-body text-sm text-ivory/70">
          We can&apos;t wait to celebrate with you.
        </p>
      </Reveal>
    </section>
  )
}
