/**
 * ============================================================================
 *  WEDDING CONFIG — Kajal Gupta & Daya Sagar
 * ============================================================================
 *  All details below are taken from the official printed invitation (PDF).
 *  All personal text renders as selectable HTML. Nothing personal is baked
 *  into decorative artwork.
 * ============================================================================
 */

export const TIMEZONE = 'Asia/Kolkata'

/** Per-event visual theme used to style each ceremony's dedicated page. */
export interface EventTheme {
  /** Short mood label shown on the page. */
  mood: string
  /** Background gradient (CSS). */
  background: string
  /** Primary accent colour for headings/rings. */
  accent: string
  /** Soft secondary accent. */
  accentSoft: string
  /** Emoji/glyph motif for ambient decoration (kept subtle). */
  motif: string
  /** Whether the scene is daytime (affects light styling). */
  daytime: boolean
}

export interface DressCode {
  men: string
  women: string
  /** A gentle English note for events without a fixed dress code. */
  note?: string
}

export interface EventItem {
  id: string
  slug: string
  name: string
  /** ISO date-time WITH +05:30 offset (Asia/Kolkata). */
  dateTime: string
  timeConfirmed: boolean
  /** Human time label when it helps (e.g. "9:15 A.M."). */
  timeLabel?: string
  venue: string
  venueConfirmed: boolean
  city?: string
  mapUrl?: string
  notes?: string[]
  description?: string
  /** Longer, warm invitation-style line for the dedicated page. */
  invite?: string
  icon: 'tilak' | 'sangeet' | 'mehndi' | 'haldi' | 'wedding'
  theme: EventTheme
  dressCode?: DressCode
  /** Order within the guided next→next journey. */
  order: number
}

export interface WeddingConfig {
  couple: {
    bride: { name: string; initial: string }
    groom: { name: string; initial: string }
    monogram: string
  }
  weddingDate: string
  weddingTimeConfirmed: boolean
  hero: {
    tagline: string
    dateLabel: string
    venueLabel: string
  }
  invitation: {
    openingTextHi: string
    openingTextEn: string
    familyMessage: string
    grandparents: string
    brideParents: string
    groomParents: string
    invitedBy: string[]
    address: string
    blessing: string
    draft: boolean
  }
  story: {
    heading: string
    paragraphs: string[]
    photo?: string
    draft: boolean
  }
  events: EventItem[]
  gallery: { src: string; alt: string }[]
  assets: {
    /** Ganesh / Shri Ganeshai Namah logo. Drop file at this path. */
    ganeshLogo?: string
    engagement: string[]
  }
  music: {
    /** Background music file. Never autoplays with sound. */
    src?: string
    title: string
  }
  credit: {
    madeBy: string
    madeByUrl?: string
  }
  contact: { label: string; phones: string[] }
}

export const weddingConfig: WeddingConfig = {
  couple: {
    bride: { name: 'Kajal Gupta', initial: 'K' },
    groom: { name: 'Daya Sagar', initial: 'D' },
    monogram: 'K & D',
  },

  weddingDate: '2026-12-04T19:00:00+05:30', // 4 Dec 2026, dinner 7 PM
  weddingTimeConfirmed: true,

  hero: {
    tagline: 'Together with their families, request the pleasure of your company',
    dateLabel: 'Friday, 4th December 2026',
    venueLabel: 'Manorma Resort, Jangal Kaudiya, Gorakhpur (U.P.)',
  },

  invitation: {
    openingTextHi:
      'विघ्न हरण मंगल करण, श्री गणपति महाराज। प्रथम निमंत्रण आपको, पूरण कीजै काज॥',
    openingTextEn: 'Shri Ganeshai Namah',
    familyMessage:
      'Mrs. Meera Devi & Mr. Kailash Gupta request your gracious presence on the auspicious occasion of the Wedding Ceremony of their beloved daughter',
    grandparents: 'Smt. Anarkali Devi & Late Sh. Ram Nayan Gupta',
    brideParents: 'Mrs. Meera Devi & Mr. Kailash Gupta',
    groomParents: 'Mrs. Asha Devi & Mr. Omprakash Gupta',
    invitedBy: ['Sh. Harihar Gupta', 'Sh. Kailash Gupta'],
    address: 'Gali No. 19, Kailash Nagar, Rewari Road, Narnaul, Haryana - 123001',
    blessing: 'With the blessings of our grandparents and the love of all our family.',
    draft: false,
  },

  story: {
    heading: 'Our Story',
    paragraphs: [
      'Draft — Kajal and Daya Sagar can share their story here and it will appear on this page.',
    ],
    draft: true,
  },

  events: [
    {
      id: 'tilak',
      slug: 'tilak',
      name: 'Tilak',
      dateTime: '2026-11-20T09:15:00+05:30',
      timeConfirmed: true,
      timeLabel: '9:15 A.M.',
      venue: 'Narnaul',
      venueConfirmed: false,
      city: 'Narnaul, Haryana',
      notes: ['Friday, 20th November 2026', 'At 9:15 A.M.'],
      description: 'The ceremonial beginning of the wedding celebrations.',
      invite: 'We warmly invite you to join us as the celebrations begin with the Tilak ceremony.',
      icon: 'tilak',
      order: 1,
      theme: {
        mood: 'A gentle, auspicious morning',
        background:
          'radial-gradient(120% 120% at 50% 15%, #B5894A 0%, #8A5A2B 45%, #3A2410 100%)',
        accent: '#F0D08A',
        accentSoft: '#E3C891',
        motif: '🪔',
        daytime: true,
      },
    },
    {
      id: 'sangeet',
      slug: 'sangeet',
      name: 'Sangeet',
      dateTime: '2026-11-27T16:00:00+05:30',
      timeConfirmed: true,
      timeLabel: '4:00 P.M.',
      venue: 'Apar Place',
      venueConfirmed: true,
      city: 'Rewari Road, Narnaul, Haryana',
      mapUrl: 'https://maps.app.goo.gl/SqBKoFZ7F9kwWWA98',
      notes: ['Friday, 27th November 2026', 'Programme: 4:00 P.M.', 'Dinner: 7:00 P.M.'],
      description: 'An evening of music, dance and celebration.',
      invite: 'Dance the night away with us at the Sangeet — an evening of music and joy.',
      icon: 'sangeet',
      order: 2,
      dressCode: {
        men: 'Dark party wear — black or blue',
        women: 'Dark party wear — black or blue',
      },
      theme: {
        mood: 'A glamorous night of music',
        background:
          'radial-gradient(120% 120% at 50% 20%, #1B2A5B 0%, #121A38 50%, #070A18 100%)',
        accent: '#9FB6FF',
        accentSoft: '#C5A16A',
        motif: '🎶',
        daytime: false,
      },
    },
    {
      id: 'mehndi',
      slug: 'mehndi',
      name: 'Mehndi Night',
      dateTime: '2026-12-02T18:00:00+05:30',
      timeConfirmed: true,
      timeLabel: '6:00 P.M.',
      venue: 'Gorakhpur',
      venueConfirmed: false,
      city: 'Gorakhpur, Uttar Pradesh',
      mapUrl: 'https://maps.app.goo.gl/a6v4Y1LwZQnUiRD16',
      notes: ['Wednesday, 2nd December 2026', '6:00 P.M. onwards'],
      description: 'A colourful night of henna, music and song.',
      invite: 'Join us for a vibrant Mehndi Night filled with henna, colour and song.',
      icon: 'mehndi',
      order: 3,
      dressCode: {
        men: 'Dark ethnic wear',
        women: 'Sharara, garara or skirts — any colour you love',
      },
      theme: {
        mood: 'A warm, festive henna night',
        background:
          'radial-gradient(120% 120% at 50% 20%, #1E4D3A 0%, #143528 50%, #0A1A14 100%)',
        accent: '#8FD6A8',
        accentSoft: '#E3C891',
        motif: '🌿',
        daytime: false,
      },
    },
    {
      id: 'haldi',
      slug: 'haldi',
      name: 'Haldi',
      dateTime: '2026-12-03T11:00:00+05:30',
      timeConfirmed: true,
      timeLabel: '11:00 A.M.',
      venue: 'Gorakhpur',
      venueConfirmed: false,
      city: 'Gorakhpur, Uttar Pradesh',
      mapUrl: 'https://maps.app.goo.gl/a6v4Y1LwZQnUiRD16',
      notes: ['Thursday, 3rd December 2026', '11:00 A.M. onwards'],
      description: 'The auspicious turmeric ceremony, under the morning sun.',
      invite: 'Come celebrate the joyful Haldi ceremony with us on a bright winter morning.',
      icon: 'haldi',
      order: 4,
      dressCode: {
        men: 'White with pink',
        women: 'Shades of pink',
      },
      theme: {
        mood: 'A sunny, playful morning',
        background:
          'radial-gradient(120% 120% at 50% 15%, #FFD873 0%, #F6B24A 45%, #E58A6B 100%)',
        accent: '#9D294B',
        accentSoft: '#C78D9E',
        motif: '🌼',
        daytime: true,
      },
    },
    {
      id: 'wedding',
      slug: 'wedding',
      name: 'Wedding Ceremony',
      dateTime: '2026-12-04T19:00:00+05:30',
      timeConfirmed: true,
      timeLabel: 'Dinner 7:00 P.M. · Baraat 9:00 P.M.',
      venue: 'Manorma Resort',
      venueConfirmed: true,
      city: 'Jangal Kaudiya, Gorakhpur (U.P.)',
      mapUrl: 'https://maps.app.goo.gl/y7v3R611UPaWxFMD9',
      notes: ['Friday, 4th December 2026', 'Dinner at 7:00 P.M.', 'Reception of Baraat at 9:00 P.M.'],
      description: 'The sacred vows, under the winter stars.',
      invite: 'With hearts full of joy, we invite you to witness our wedding vows.',
      icon: 'wedding',
      order: 5,
      dressCode: {
        men: 'Wear whatever makes you feel your most elegant',
        women: 'Wear whatever makes you feel your most elegant',
        note: 'There is no fixed dress code for the wedding. Simply wear whatever you find beautiful and feel wonderful in — your presence is what matters most to us.',
      },
      theme: {
        mood: 'A luxurious wedding night under the stars',
        background:
          'radial-gradient(90% 70% at 50% 25%, #3a1824 0%, #21191B 55%, #160F12 100%)',
        accent: '#E3C891',
        accentSoft: '#C78D9E',
        motif: '✨',
        daytime: false,
      },
    },
  ],

  // Gallery uses engagement photos when present; falls back to placeholders.
  gallery: [
    { src: '/media/engagement-1.jpg', alt: 'Kajal & Daya Sagar with family' },
    { src: '/media/engagement-2.jpg', alt: 'Kajal & Daya Sagar with their families' },
  ],

  assets: {
    ganeshLogo: '/media/ganesh-logo.png', // drop the Shri Ganeshai Namah logo here
    engagement: ['/media/engagement-1.jpg', '/media/engagement-2.jpg'],
  },

  music: {
    src: '/media/gira.mp3', // drop the background music file here
    title: 'Gira',
  },

  credit: {
    madeBy: 'Exflow',
  },

  contact: {
    label: 'A Cordial Invitation From',
    phones: ['9466884664', '7988376347', '8053317489'],
  },
}

/** Events in guided-journey order (Tilak → Sangeet → Mehndi → Haldi → Wedding). */
export const eventsInOrder = [...weddingConfig.events].sort((a, b) => a.order - b.order)
