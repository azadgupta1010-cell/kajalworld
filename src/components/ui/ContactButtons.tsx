'use client'

import { weddingConfig } from '@/config/weddingConfig'

/**
 * Floating Call + WhatsApp buttons (bottom-left, so they never clash with the
 * music control at bottom-right). Tapping Call opens the dialer; WhatsApp opens
 * a chat with the configured number. Numbers come from weddingConfig.contact.
 */
export function ContactButtons() {
  const { callNumber, whatsappNumber } = weddingConfig.contact
  if (!callNumber && !whatsappNumber) return null

  const wa = whatsappNumber ? `91${whatsappNumber.replace(/\D/g, '')}` : ''

  return (
    <div className="fixed bottom-5 left-5 z-[80] flex flex-col items-center gap-3">
      {whatsappNumber && (
        <a
          href={`https://wa.me/${wa}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
          className="flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] shadow-lg ring-2 ring-white/20 transition hover:brightness-110 focus-visible:outline"
        >
          <svg width="28" height="28" viewBox="0 0 32 32" fill="#fff" aria-hidden="true">
            <path d="M16.004 3.2c-7.06 0-12.8 5.74-12.8 12.8 0 2.257.59 4.46 1.71 6.4L3.2 28.8l6.58-1.72a12.74 12.74 0 0 0 6.223 1.586h.005c7.06 0 12.8-5.74 12.8-12.8 0-3.42-1.332-6.635-3.75-9.054A12.72 12.72 0 0 0 16.004 3.2Zm0 23.04h-.004a10.63 10.63 0 0 1-5.42-1.485l-.389-.231-4.03 1.056 1.075-3.93-.253-.403a10.6 10.6 0 0 1-1.627-5.647c0-5.867 4.774-10.64 10.645-10.64 2.843 0 5.515 1.108 7.525 3.12a10.57 10.57 0 0 1 3.117 7.527c0 5.867-4.774 10.64-10.64 10.64Zm5.834-7.967c-.32-.16-1.892-.933-2.185-1.04-.293-.107-.507-.16-.72.16-.213.32-.826 1.04-1.013 1.253-.187.213-.373.24-.693.08-.32-.16-1.35-.498-2.571-1.587-.95-.848-1.592-1.895-1.779-2.215-.187-.32-.02-.493.14-.653.144-.143.32-.373.48-.56.16-.187.213-.32.32-.533.107-.213.053-.4-.027-.56-.08-.16-.72-1.735-.986-2.375-.26-.624-.524-.54-.72-.55l-.613-.011c-.213 0-.56.08-.853.4-.293.32-1.12 1.093-1.12 2.667 0 1.573 1.146 3.093 1.306 3.307.16.213 2.255 3.443 5.463 4.827.763.33 1.358.527 1.822.675.766.243 1.463.209 2.014.127.614-.092 1.892-.774 2.159-1.52.266-.747.266-1.387.186-1.52-.08-.133-.293-.213-.613-.373Z" />
          </svg>
        </a>
      )}

      {callNumber && (
        <a
          href={`tel:+91${callNumber.replace(/\D/g, '')}`}
          aria-label="Call us"
          className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-gold bg-rose-deep shadow-gold ring-2 ring-gold/30 transition hover:bg-rose focus-visible:outline"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="#E3C891" aria-hidden="true">
            <path d="M6.6 10.8a15.3 15.3 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.24c1.1.37 2.3.57 3.5.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.2.2 2.4.57 3.5a1 1 0 0 1-.24 1l-2.23 2.3Z" />
          </svg>
        </a>
      )}
    </div>
  )
}
