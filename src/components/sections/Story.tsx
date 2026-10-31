import { Reveal } from '@/components/ui/Reveal'
import { GoldDivider } from '@/components/decor/GoldDivider'
import { FloralCorner } from '@/components/decor/FloralCorner'
import { weddingConfig } from '@/config/weddingConfig'
import { mediaUrl } from '@/lib/env'

export function Story() {
  const { story, couple } = weddingConfig

  return (
    <section id="story" className="relative px-4 py-24">
      <div
        className="pointer-events-none absolute inset-0 opacity-50"
        style={{
          background:
            'radial-gradient(70% 50% at 50% 50%, rgba(181,101,118,0.12), transparent 70%)',
        }}
      />
      <div className="relative mx-auto max-w-3xl">
        <Reveal className="text-center">
          <p className="font-body text-xs uppercase tracking-[0.3em] text-rose-dusty">A little about us</p>
          <h2 className="mt-3 font-display text-4xl font-semibold text-ivory sm:text-5xl">{story.heading}</h2>
          <div className="mt-5 flex justify-center">
            <GoldDivider width={220} />
          </div>
        </Reveal>

        <Reveal className="relative mt-12" delay={0.1}>
          <div className="relative rounded-2xl border border-gold/20 bg-white/[0.03] p-8 sm:p-12">
            <FloralCorner corner="tl" size={80} className="absolute -left-2 -top-2 opacity-70" />
            <FloralCorner corner="br" size={80} className="absolute -bottom-2 -right-2 opacity-70" />

            {story.draft ? (
              // Elegant, timeless placeholder — intentional, not a TODO banner.
              <div className="flex flex-col items-center text-center">
                <span
                  className="flex h-20 w-20 items-center justify-center rounded-full border border-gold/40 font-script text-3xl text-gold-light"
                  aria-hidden="true"
                >
                  {couple.monogram}
                </span>

                <p className="mt-8 max-w-xl text-balance font-display text-2xl italic leading-relaxed text-ivory/90 sm:text-3xl">
                  &ldquo;Every love story is beautiful, but ours is our favourite.&rdquo;
                </p>

                <p className="mt-8 font-script text-3xl text-gold-light">
                  {couple.bride.name} &amp; {couple.groom.name}
                </p>

                <p className="mt-6 font-body text-[0.7rem] uppercase tracking-[0.2em] text-rose-dusty/80">
                  Full story coming soon
                </p>
              </div>
            ) : (
              <>
                {story.photo && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={mediaUrl(story.photo)}
                    alt={`${couple.bride.name} and ${couple.groom.name}`}
                    loading="lazy"
                    className="mx-auto mb-8 max-h-96 w-full rounded-lg object-cover"
                  />
                )}

                {story.paragraphs.map((p, i) => (
                  <p
                    key={i}
                    className="mb-5 text-center font-body text-base leading-relaxed text-ivory/85 last:mb-0"
                  >
                    {p}
                  </p>
                ))}

                <p className="mt-8 text-center font-script text-3xl text-gold-light">
                  {couple.bride.name} &amp; {couple.groom.name}
                </p>
              </>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
