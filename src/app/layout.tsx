import type { Metadata, Viewport } from 'next'
import { Cormorant_Garamond, Jost, Pinyon_Script } from 'next/font/google'
import './globals.css'

const display = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-display',
  display: 'swap',
})
const body = Jost({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-body',
  display: 'swap',
})
const script = Pinyon_Script({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-script',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://kajalworld.in'),
  title: 'Kajal & Daya Sagar — Wedding Invitation',
  description:
    'Together with their families, Kajal Gupta and Daya Sagar invite you to celebrate their wedding on 4 December 2026.',
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
  openGraph: {
    title: 'Kajal & Daya Sagar — Wedding Invitation',
    description: 'Join us in celebrating our wedding on 4 December 2026.',
    url: 'https://kajalworld.in',
    siteName: 'Kajalworld',
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'Kajal & Daya Sagar — 4 December 2026',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kajal & Daya Sagar — Wedding Invitation',
    description: 'Join us in celebrating our wedding on 4 December 2026.',
    images: ['/opengraph-image'],
  },
}

export const viewport: Viewport = {
  themeColor: '#9D294B',
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
}

import { Providers } from '@/components/Providers'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${script.variable}`}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
