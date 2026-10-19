'use client'

import { AnimatePresence } from 'framer-motion'
import { IntroExperience } from '@/components/intro/IntroExperience'
import { IntroBoundary } from '@/components/IntroBoundary'
import { MainSite } from '@/components/MainSite'
import { useSessionFlag } from '@/hooks/useSessionFlag'
import { weddingConfig } from '@/config/weddingConfig'

const INTRO_FLAG = 'kw_intro_seen'

/**
 * Client-side home experience. Reproduces the old App.tsx logic: a blocking
 * intro gated by a sessionStorage flag (so repeat navigations skip it), with a
 * static error-boundary fallback, then the main site. Replayable from the footer.
 */
export function HomeExperience() {
  const [introSeen, markSeen, clearSeen] = useSessionFlag(INTRO_FLAG)

  const complete = () => markSeen()
  const replay = () => {
    clearSeen()
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'auto' })
    }
  }

  return (
    <>
      <AnimatePresence mode="wait">
        {!introSeen && (
          <IntroBoundary key="intro" onComplete={complete}>
            <IntroExperience monogram={weddingConfig.couple.monogram} onComplete={complete} />
          </IntroBoundary>
        )}
      </AnimatePresence>

      {introSeen && <MainSite onReplayIntro={replay} />}
    </>
  )
}
