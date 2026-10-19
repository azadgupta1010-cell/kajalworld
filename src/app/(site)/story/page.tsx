import type { Metadata } from 'next'
import { Story } from '@/components/sections/Story'

export const metadata: Metadata = {
  title: 'Our Story — Kajal & Daya Sagar',
}

export default function StoryPage() {
  return (
    <main className="pt-6">
      <Story />
    </main>
  )
}
