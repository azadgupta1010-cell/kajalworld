'use client'

import { useMemo, type ReactNode } from 'react'
import { MusicProvider } from '@/components/audio/MusicContext'
import { weddingConfig } from '@/config/weddingConfig'
import { mediaUrl } from '@/lib/env'

/**
 * Client providers mounted once at the root so background music persists
 * continuously across every page. There is no music control — it simply plays
 * from the first user gesture onward.
 */
export function Providers({ children }: { children: ReactNode }) {
  const { music } = weddingConfig

  // Build the track list ONCE (stable identity) so the audio is never
  // recreated on re-render / navigation.
  const tracks = useMemo(() => {
    const raw = music.playlist && music.playlist.length > 0 ? music.playlist : music.src ? [music.src] : []
    return raw.filter(Boolean).map((p) => mediaUrl(p))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <MusicProvider tracks={tracks}>{children}</MusicProvider>
}
