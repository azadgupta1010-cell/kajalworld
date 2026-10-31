'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { weddingConfig } from '@/config/weddingConfig'
import { mediaUrl } from '@/lib/env'

// Real logo image, served from Supabase. Drop a file named "kd-logo.png" in the
// media bucket and it appears automatically; until then the K|D text shows.
const LOGO_SRC = mediaUrl('/media/kd-logo.png')

const links = [
  { href: '/', label: 'Home' },
  { href: '/story', label: 'Our Story' },
  { href: '/events', label: 'Events' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/rsvp', label: 'RSVP' },
  { href: '/guestbook', label: 'Blessings' },
  { href: '/travel', label: 'Venue' },
]

/**
 * Transparent overlay header for the home page — sits on top of the hero
 * image (like the reference mockup): K|D monogram on the left, primary links
 * in the centre, and a music control on the right. Turns into a solid bar
 * once the guest scrolls past the hero so links stay readable.
 */
export function HomeHeader() {
  const { couple } = weddingConfig
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [logoOk, setLogoOk] = useState(true)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={
        'fixed inset-x-0 top-0 z-50 transition-colors duration-300 ' +
        (scrolled ? 'border-b border-gold/30 bg-plum/90 backdrop-blur' : 'bg-gradient-to-b from-black/45 to-transparent')
      }
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4" aria-label="Primary">
        {/* Logo (image if present, else K|D text) */}
        <Link href="/" aria-label="Home" className="flex items-center gap-2 focus-visible:outline">
          {logoOk ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={LOGO_SRC}
              alt={`${couple.bride.name} & ${couple.groom.name} logo`}
              className="h-11 w-auto drop-shadow"
              onError={() => setLogoOk(false)}
            />
          ) : (
            <span className="flex items-center gap-2">
              <span className="font-display text-2xl font-semibold tracking-[0.15em] text-gold-light drop-shadow">
                {couple.bride.initial}
              </span>
              <span className="text-gold/70">|</span>
              <span className="font-display text-2xl font-semibold tracking-[0.15em] text-gold-light drop-shadow">
                {couple.groom.initial}
              </span>
            </span>
          )}
        </Link>

        {/* Desktop links */}
        <ul className="hidden items-center gap-7 lg:flex">
          {links.map((l) => (
            <li key={l.label}>
              <Link
                href={l.href}
                className="font-body text-xs uppercase tracking-[0.2em] text-ivory/90 drop-shadow transition hover:text-gold-light focus-visible:outline"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile toggle */}
        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-md border border-gold/40 text-gold-light lg:hidden"
          aria-expanded={open}
          aria-controls="home-mobile-nav"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((v) => !v)}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
            {open ? <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" /> : <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />}
          </svg>
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <ul id="home-mobile-nav" className="border-t border-gold/20 bg-plum/95 px-5 py-3 lg:hidden">
          {links.map((l) => (
            <li key={l.label}>
              <Link
                href={l.href}
                onClick={() => setOpen(false)}
                className="block py-2 font-body text-sm uppercase tracking-[0.2em] text-ivory/85 transition hover:text-gold-light focus-visible:outline"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </header>
  )
}
