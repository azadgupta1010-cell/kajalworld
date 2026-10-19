'use client'

import Link from 'next/link'
import { Reveal } from '@/components/ui/Reveal'
import { GoldDivider } from '@/components/decor/GoldDivider'
import { WaxSeal } from '@/components/decor/WaxSeal'
import { weddingConfig } from '@/config/weddingConfig'

interface FooterProps {
  onReplayIntro?: () => void
}

const navLinks = [
  { href: '/story', label: 'Story' },
  { href: '/events', label: 'Events' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/rsvp', label: 'RSVP' },
  { href: '/guestbook', label: 'Guestbook' },
  { href: '/travel', label: 'Travel' },
]

export function Footer({ onReplayIntro }: FooterProps) {
  const { couple, hero } = weddingConfig

  return (
    <footer className="relative px-4 pb-16 pt-24 text-center">
      <Reveal className="mx-auto max-w-lg">
        <div className="flex justify-center">
          <WaxSeal monogram={couple.monogram} size={80} />
        </div>

        <p className="mt-6 font-script text-4xl text-gold-light">
          {couple.bride.name} &amp; {couple.groom.name}
        </p>
        <p className="mt-2 font-body text-sm text-ivory/60">{hero.dateLabel}</p>

        <div className="my-8 flex justify-center">
          <GoldDivider width={200} />
        </div>

        <nav aria-label="Footer" className="flex flex-wrap justify-center gap-x-6 gap-y-3">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="font-body text-xs uppercase tracking-[0.2em] text-ivory/70 transition hover:text-gold-light focus-visible:outline"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {onReplayIntro && (
          <button
            type="button"
            onClick={onReplayIntro}
            className="mt-10 rounded-full border border-gold/40 px-6 py-2.5 font-body text-xs uppercase tracking-[0.2em] text-gold-light/90 transition hover:bg-gold/10"
          >
            Replay the invitation
          </button>
        )}

        <p className="mt-10 font-body text-xs text-ivory/40">
          Made with love. &copy; {new Date().getFullYear()}
        </p>
      </Reveal>
    </footer>
  )
}
