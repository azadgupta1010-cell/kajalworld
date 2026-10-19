'use client'

import { motion } from 'framer-motion'
import { WaxSeal } from '@/components/decor/WaxSeal'

interface EnvelopeProps {
  monogram: string
  opened: boolean
  reduced: boolean
  onOpen: () => void
}

/**
 * Layered envelope: back body, inner card slot, front pockets, flap, wax seal.
 * The flap rotates on its top edge (rotateX) to open. Transform/opacity only.
 */
export function Envelope({ monogram, opened, reduced, onOpen }: EnvelopeProps) {
  return (
    <div
      className="relative mx-auto"
      style={{ width: 'min(86vw, 420px)', aspectRatio: '3 / 2', perspective: 1200 }}
    >
      {/* Envelope back */}
      <div
        className="absolute inset-0 rounded-md"
        style={{
          background: 'linear-gradient(145deg,#8A2846,#6E162F)',
          boxShadow: '0 30px 60px -24px rgba(0,0,0,0.7)',
        }}
      />

      {/* Card that rises out when opened */}
      <motion.div
        className="absolute left-1/2 top-1/2 flex items-center justify-center rounded-sm bg-ivory"
        style={{
          width: '86%',
          height: '116%',
          x: '-50%',
          y: '-50%',
          transformOrigin: 'center bottom',
          boxShadow: '0 20px 40px -18px rgba(0,0,0,0.6)',
        }}
        initial={false}
        animate={
          reduced
            ? { y: opened ? '-58%' : '-50%', opacity: opened ? 1 : 0 }
            : opened
              ? { y: '-108%', opacity: 1, scale: 1 }
              : { y: '-50%', opacity: 0, scale: 0.92 }
        }
        transition={{ duration: reduced ? 0 : 0.9, ease: [0.22, 1, 0.36, 1], delay: opened && !reduced ? 0.3 : 0 }}
      >
        <div className="px-6 text-center">
          <p className="font-script text-2xl text-rose-dusty">You're Invited</p>
          <p className="mt-1 font-display text-lg font-medium gold-foil">{monogram}</p>
        </div>
      </motion.div>

      {/* Front pocket (triangle sides) covering the lower card */}
      <div
        className="absolute inset-0 overflow-hidden rounded-md"
        style={{ clipPath: 'polygon(0 38%, 50% 100%, 100% 38%, 100% 100%, 0 100%)' }}
      >
        <div
          className="h-full w-full"
          style={{ background: 'linear-gradient(160deg,#9b3152,#7a1f3d)' }}
        />
      </div>
      {/* subtle gold seam on pocket */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          clipPath: 'polygon(0 38%, 50% 100%, 100% 38%, 100% 39%, 50% 101%, 0 39%)',
          background: 'rgba(201,162,75,0.5)',
        }}
      />

      {/* Flap */}
      <motion.div
        className="absolute left-0 top-0 w-full"
        style={{
          height: '64%',
          transformOrigin: 'top center',
          transformStyle: 'preserve-3d',
          zIndex: opened ? 1 : 5,
        }}
        initial={false}
        animate={{ rotateX: reduced ? (opened ? -175 : 0) : opened ? -175 : 0 }}
        transition={{ duration: reduced ? 0 : 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <div
          className="h-full w-full"
          style={{
            clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
            background: 'linear-gradient(180deg,#9b3152,#7a1f3d)',
            backfaceVisibility: 'hidden',
            boxShadow: '0 4px 18px -6px rgba(0,0,0,0.5)',
          }}
        />
      </motion.div>

      {/* Wax seal + open button */}
      <motion.button
        type="button"
        onClick={onOpen}
        aria-label="Open your invitation"
        className="absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2 rounded-full"
        initial={false}
        animate={
          opened
            ? { scale: reduced ? 1 : 1.1, opacity: 0 }
            : reduced
              ? { scale: 1, opacity: 1 }
              : { scale: [1, 1.04, 1], opacity: 1 }
        }
        transition={
          opened
            ? { duration: reduced ? 0 : 0.4 }
            : reduced
              ? { duration: 0 }
              : { duration: 2.4, repeat: Infinity, ease: 'easeInOut' }
        }
        style={{ pointerEvents: opened ? 'none' : 'auto', top: '42%' }}
      >
        <WaxSeal monogram={monogram} size={92} />
      </motion.button>
    </div>
  )
}
