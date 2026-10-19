import type { Metadata } from 'next'
import { Events } from '@/components/sections/Events'

export const metadata: Metadata = {
  title: 'Celebrations — Kajal & Daya Sagar',
}

export default function EventsPage() {
  return (
    <main className="pt-6">
      <Events heading="The Celebrations" eyebrow="The full schedule" />
    </main>
  )
}
