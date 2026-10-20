'use client'

import type { ReactNode } from 'react'
import { MusicProvider } from '@/components/audio/MusicContext'
import { MusicToggle } from '@/components/ui/MusicToggle'
import { weddingConfig } from '@/config/weddingConfig'

/**
 * Client providers mounted once at the root so background music persists across
 * every page and the music control is available everywhere.
 */
export function Providers({ children }: { children: ReactNode }) {
  return (
    <MusicProvider src={weddingConfig.music.src}>
      {children}
      <MusicToggle title={weddingConfig.music.title} />
    </MusicProvider>
  )
}
