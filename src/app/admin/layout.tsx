import type { ReactNode } from 'react'
import Link from 'next/link'
import { getAdminUser } from '@/lib/auth'

/**
 * Admin chrome with a REAL server-side gate. The authorization check runs via
 * getAdminUser() (valid Supabase session + allowlisted email). A guessable URL
 * alone is never sufficient. Full auth UI is wired in Phase 2.
 */
export default async function AdminLayout({ children }: { children: ReactNode }) {
  const admin = await getAdminUser()

  if (!admin) {
    return (
      <main className="mx-auto flex min-h-[70svh] max-w-md flex-col items-center justify-center px-4 text-center">
        <h1 className="font-display text-3xl font-semibold text-ivory">Admin access required</h1>
        <p className="mt-4 font-body text-sm leading-relaxed text-ivory/70">
          Please sign in with an authorized account to continue.
        </p>
        <p className="mt-2 font-body text-xs text-ivory/50">
          Admin sign-in is configured in Phase 2.
        </p>
        <Link
          href="/"
          className="mt-8 rounded-full border border-gold/50 px-6 py-2.5 font-body text-xs uppercase tracking-[0.2em] text-gold-light transition hover:bg-gold/10 focus-visible:outline"
        >
          Back to invitation
        </Link>
      </main>
    )
  }

  const navItems = [
    { href: '/admin', label: 'Overview' },
    { href: '/admin/events', label: 'Events' },
    { href: '/admin/guests', label: 'Guests' },
    { href: '/admin/albums', label: 'Albums' },
    { href: '/admin/settings', label: 'Settings' },
  ]

  return (
    <div className="mx-auto flex max-w-6xl gap-6 px-4 py-8 sm:flex-row flex-col">
      <aside className="sm:w-56 shrink-0">
        <p className="font-display text-lg text-gold-light">Admin</p>
        <p className="mt-1 truncate font-body text-xs text-ivory/50">{admin.email}</p>
        <nav aria-label="Admin" className="mt-6 flex flex-col gap-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-md px-3 py-2 font-body text-sm text-ivory/75 transition hover:bg-white/5 hover:text-gold-light focus-visible:outline"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>
      <section className="flex-1">{children}</section>
    </div>
  )
}
