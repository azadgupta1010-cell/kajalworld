import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Admin — Overview',
}

/**
 * Admin overview placeholder. The admin layout already enforces the server-side
 * gate, so reaching this page means the viewer is an authorized admin.
 * Phase 2 fleshes out real dashboards (events, guests, albums, settings).
 */
export default function AdminOverviewPage() {
  return (
    <div>
      <h1 className="font-display text-3xl font-semibold text-ivory">Overview</h1>
      <p className="mt-4 font-body text-sm leading-relaxed text-ivory/70">
        Welcome to the admin area. This is a gated placeholder — full management tools for events,
        guests, albums and settings arrive in Phase 2.
      </p>
    </div>
  )
}
