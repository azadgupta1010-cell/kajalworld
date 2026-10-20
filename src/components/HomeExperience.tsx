'use client'

import { useRouter } from 'next/navigation'
import { AnimatePresence } from 'framer-motion'
import { IntroExperience } from '@/components/intro/IntroExperience'
import { IntroBoundary } from '@/components/IntroBoundary'
import { MainSite } from '@/components/MainSite'
import { useSessionFlag } from '@/hooks/useSessionFlag'
import { weddingConfig, eventsInOrder } from '@/config/weddingConfig'

const INTRO_FLAG = 'kw_intro_seen'

/**
 * Home experience. On first visit a blocking cinematic intro plays (envelope →
 * invitation). When the guest chooses to begin, we send them into the guided
 * event journey (Tilak → Sangeet → Mehndi → Haldi → Wedding), one page at a
 * time via Next. "Skip" goes straight to the main homepage.
 *
 * A sessionStorage flag means repeat visits don't force the intro again; the
 * guest sees the main homepage and can replay the invitation from the footer.
 */
export function HomeExperience() {
  const router = useRouter()
  const [introSeen, markSeen, clearSeen] = useSessionFlag(INTRO_FLAG)

  const firstEvent = eventsInOrder[0]?.slug ?? 'tilak'

  // "Begin the celebrations" — mark intro seen, then enter the journey.
  const beginJourney = () => {
    markSeen()
    router.push(`/events/${firstEvent}`)
  }

  // "Skip" — mark intro seen and just reveal the homepage.
  const skip = () => markSeen()

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
          <IntroBoundary key="intro" onComplete={beginJourney}>
            <IntroExperience
              monogram={weddingConfig.couple.monogram}
              onBegin={beginJourney}
              onSkip={skip}
            />
          </IntroBoundary>
        )}
      </AnimatePresence>

      {introSeen && <MainSite onReplayIntro={replay} />}
    </>
  )
}
