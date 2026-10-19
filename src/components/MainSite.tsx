'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Hero } from '@/components/sections/Hero'
import { Events } from '@/components/sections/Events'
import { Story } from '@/components/sections/Story'
import { Gallery } from '@/components/gallery/Gallery'
import { Footer } from '@/components/sections/Footer'
import { MusicToggle } from '@/components/ui/MusicToggle'
import { placeholderItems } from '@/components/gallery/placeholderItems'

interface MainSiteProps {
  onReplayIntro: () => void
}

const ctas = [
  { href: '/rsvp', label: 'RSVP' },
  { href: '/upload', label: 'Share Photos' },
  { href: '/guestbook', label: 'Leave a Blessing' },
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
      <Gallery items={placeholderItems} />

      <section className="relative px-4 pb-8 pt-4">
        <div className="mx-auto flex max-w-xl flex-wrap justify-center gap-4">
          {ctas.map((c) => (
            <Link
              key={c.href}
              href={c.href}
              className="rounded-full border border-gold/50 px-7 py-3 font-body text-xs uppercase tracking-[0.2em] text-gold-light transition hover:bg-gold/10 focus-visible:outline"
            >
              {c.label}
            </Link>
          ))}
        </div>
      </section>

      <Footer onReplayIntro={onReplayIntro} />
      <MusicToggle />
    </motion.main>
  )
}
