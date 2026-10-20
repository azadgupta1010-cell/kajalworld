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
  const { couple, hero, contact, credit } = weddingConfig

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

        {/* Cordial invitation / contact */}
        <div className="mt-12">
          <p className="font-body text-[0.7rem] uppercase tracking-[0.25em] text-rose-dusty">
            {contact.label}
          </p>
          <p className="mt-2 font-display text-lg text-ivory">
            {weddingConfig.invitation.invitedBy.join(' · ')}
          </p>
          <p className="mt-1 font-body text-xs leading-relaxed text-ivory/55">
            {weddingConfig.invitation.address}
          </p>
          <p className="mt-3 flex flex-wrap justify-center gap-x-4 gap-y-1 font-body text-xs text-gold-light/80">
            {contact.phones.map((p) => (
              <a key={p} href={`tel:${p}`} className="transition hover:text-gold-light focus-visible:outline">
                {p}
              </a>
            ))}
          </p>
        </div>

        <p className="mt-12 font-body text-xs text-ivory/40">
          Made with love. &copy; {new Date().getFullYear()}
        </p>
        <p className="mt-1 font-body text-[0.7rem] uppercase tracking-[0.25em] text-gold-light/60">
          Made by {credit.madeBy}
        </p>
      </Reveal>
    </footer>
  )
}
