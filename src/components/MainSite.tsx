'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Hero } from '@/components/sections/Hero'
import { Events } from '@/components/sections/Events'
import { Story } from '@/components/sections/Story'
import { CountdownSection } from '@/components/sections/CountdownSection'
import { Gallery } from '@/components/gallery/Gallery'
import { Footer } from '@/components/sections/Footer'
import { galleryItems } from '@/components/gallery/galleryItems'

interface MainSiteProps {
  onReplayIntro: () => void
}

const ctas = [
  { href: '/rsvp', label: 'RSVP', highlight: false },
  { href: '/upload', label: 'Share Photos', highlight: false },
  { href: '/guestbook', label: 'Leave a Blessing', highlight: true },
]

export function MainSite({ onReplayIntro }: MainSiteProps) {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <Hero />
      <Story />
      <Events limit={5} />
      <CountdownSection />
      <Gallery items={galleryItems} />

      <p className="mx-auto -mt-6 mb-10 max-w-md px-4 text-center font-body text-sm leading-relaxed text-ivory/60">
        ✨ More memories from the celebrations are on their way — stay tuned and keep
        checking back for updates.
      </p>

      <section className="relative px-4 pb-8 pt-4">
        <div className="mx-auto flex max-w-xl flex-wrap items-center justify-center gap-4">
          {ctas.map((c) =>
            c.highlight ? (
              <motion.div
                key={c.href}
                animate={{ scale: [1, 1.04, 1] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
                className="rounded-full"
              >
                <Link
                  href={c.href}
                  className="flex items-center gap-2 rounded-full border border-gold bg-gradient-to-r from-rose-deep to-rose px-8 py-3.5 font-body text-xs font-semibold uppercase tracking-[0.2em] text-ivory shadow-gold ring-2 ring-gold/40 ring-offset-2 ring-offset-transparent transition hover:brightness-110 focus-visible:outline"
                >
                  <span aria-hidden="true">♡</span>
                  {c.label}
                </Link>
              </motion.div>
            ) : (
              <Link
                key={c.href}
                href={c.href}
                className="rounded-full border border-gold/50 px-7 py-3 font-body text-xs uppercase tracking-[0.2em] text-gold-light transition hover:bg-gold/10 focus-visible:outline"
              >
                {c.label}
              </Link>
            ),
          )}
        </div>
      </section>

      <Footer onReplayIntro={onReplayIntro} />
    </motion.main>
  )
}
