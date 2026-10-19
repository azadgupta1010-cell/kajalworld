'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { weddingConfig } from '@/config/weddingConfig'

const links = [
  { href: '/', label: 'Home' },
  { href: '/story', label: 'Story' },
  { href: '/events', label: 'Events' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/rsvp', label: 'RSVP' },
  { href: '/guestbook', label: 'Guestbook' },
  { href: '/travel', label: 'Travel' },
]

/**
 * Slim top navigation shared across public pages (not the home intro).
 * Champagne-gold on a dark translucent bar; responsive with a mobile menu.
 */
export function SiteNav() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const { couple } = weddingConfig

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href)

  return (
    <header className="sticky top-0 z-40 border-b border-gold/15 bg-night/80 backdrop-blur">
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3" aria-label="Primary">
        <Link
          href="/"
          className="font-script text-2xl text-gold-light focus-visible:outline"
          aria-label="Home"
        >
          {couple.monogram}
        </Link>

        {/* Desktop links */}
        <ul className="hidden items-center gap-6 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className={
                  'font-body text-xs uppercase tracking-[0.18em] transition focus-visible:outline ' +
                  (isActive(l.href) ? 'text-gold-light' : 'text-ivory/70 hover:text-gold-light')
                }
                aria-current={isActive(l.href) ? 'page' : undefined}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile toggle */}
        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-md border border-gold/30 text-gold-light md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((v) => !v)}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
            {open ? (
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <ul id="mobile-nav" className="border-t border-gold/15 px-4 py-3 md:hidden">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                onClick={() => setOpen(false)}
                className={
                  'block py-2 font-body text-sm uppercase tracking-[0.18em] transition focus-visible:outline ' +
                  (isActive(l.href) ? 'text-gold-light' : 'text-ivory/80 hover:text-gold-light')
                }
                aria-current={isActive(l.href) ? 'page' : undefined}
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
