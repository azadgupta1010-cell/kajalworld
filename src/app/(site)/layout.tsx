import type { ReactNode } from 'react'
import { SiteNav } from '@/components/SiteNav'

/**
 * Shared chrome for all public pages EXCEPT the home intro. Route groups do
 * not affect the URL, so `/story`, `/events`, etc. still resolve as expected.
 *
 * The music control is mounted once at the root layout (Providers), so it is
 * available on every page — nothing to mount here.
 */
export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <SiteNav />
      <div className="min-h-[60svh]">{children}</div>
    </>
  )
}
