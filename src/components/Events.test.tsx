import { describe, it, expect, vi, afterEach } from 'vitest'
import { render, screen, cleanup } from '@testing-library/react'
import { Events } from '@/components/sections/Events'
import { weddingConfig } from '@/config/weddingConfig'

// next/link renders a plain anchor in tests.
vi.mock('next/link', () => ({
  default: ({ href, children, ...props }: { href: string; children: React.ReactNode }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}))

afterEach(() => cleanup())

describe('Events', () => {
  it('renders every event name from config', () => {
    render(<Events />)
    for (const event of weddingConfig.events) {
      expect(screen.getAllByText(event.name).length).toBeGreaterThan(0)
    }
  })

  it('shows a Get Directions link for events with a mapUrl', () => {
    render(<Events />)
    const withMap = weddingConfig.events.filter((e) => e.mapUrl)
    expect(withMap.length).toBeGreaterThan(0)

    const directions = screen.getAllByRole('link', { name: /get directions/i })
    expect(directions.length).toBe(withMap.length)

    // Each directions link points at a configured mapUrl.
    const hrefs = directions.map((a) => a.getAttribute('href'))
    for (const event of withMap) {
      expect(hrefs).toContain(event.mapUrl)
    }
  })

  it('does not render Get Directions for events without a mapUrl', () => {
    render(<Events events={weddingConfig.events.filter((e) => !e.mapUrl)} />)
    expect(screen.queryByRole('link', { name: /get directions/i })).toBeNull()
  })
})
