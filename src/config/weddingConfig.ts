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
  /**
   * Optional full-page background photo (under /public). Falls back to the
   * `background` gradient if the file is missing.
   */
  backgroundImage?: string
  /**
   * How the background image is used:
   *  - 'framed'  → a decorative BORDER image with an empty centre; the page
   *                renders the ceremony text in that centre (e.g. the Mehndi /
   *                Haldi frames). Image is shown full-bleed (cover).
   *  - 'poster'  → the image already contains all text; we show it whole
   *                (contain) and keep on-page text minimal.
   * Defaults to 'framed'.
   */
  backgroundMode?: 'framed' | 'poster'
  /**
   * Where the ceremony text sits inside a framed background. Use 'right' when
   * the art has a subject on the left and empty space on the right (e.g. the
   * Mehndi frame with the bride on the left). Defaults to 'center'.
   */
  framedAlign?: 'center' | 'left' | 'right'
  /** Ink colour to use for text when a framed background is active. */
  framedInk?: string
  framedInkSoft?: string
  /** Big brush-style tagline under the title (poster feel). */
  tagline?: string
  /** 3–4 short vibe words shown as a stacked list. */
  vibeWords?: string[]
  /** A short italic quote for the poster. */
  quote?: string
  /** A small footer line of the poster. */
  footline?: string
  /** Colour of the big title text. */
  titleColor?: string
  /** Decorative ornament palette for this page. */
  decor?: {
    ornament: string // hanging ornament / mandala stroke
    ornamentAccent: string
    leaf: string // botanical spray leaves
    flower: string // botanical spray blossoms
  }
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
  /** When true, the venue is shown as a highlighted banner on the page. */
  highlightVenue?: boolean
  /** Hide the venue line on the dedicated page (e.g. Tilak not finalised). */
  hideVenue?: boolean
  /** Hide the time/date meta line on the dedicated page. */
  hideTime?: boolean
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
    /** Fallback single track (used if playlist is empty). */
    src?: string
    title: string
    /**
     * Playlist of background tracks (filenames in the Supabase media bucket).
     * A random track is chosen on each load; when one ends the next random
     * track plays — so guests hear a different song each time.
     */
    playlist?: string[]
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
      'A cricket journalist and a teacher — two different worlds brought together by a beautiful beginning.',
      'Our story began with a first meeting on her birthday, and on 3rd June we celebrated our engagement — a special day that brought us one step closer to forever.',
      'With the love and blessings of our families, cherished traditions, and hearts full of hope, we are ready to begin a new chapter together.',
      'And so, our forever begins — one beautiful moment at a time. ♡',
    ],
    draft: false,
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
      hideVenue: true,
      hideTime: true,
      notes: ['Friday, 20th November 2026', 'At 9:15 A.M.'],
      description: 'The ceremonial beginning of the wedding celebrations.',
      invite: 'We warmly invite you to join us as the celebrations begin with the Tilak ceremony.',
      icon: 'tilak',
      order: 1,
      theme: {
        mood: 'A gentle, auspicious morning',
        background:
          'radial-gradient(120% 120% at 50% 15%, #B5894A 0%, #8A5A2B 45%, #3A2410 100%)',
        backgroundImage: '/media/tilak-bg.jpg',
        backgroundMode: 'framed',
        framedInk: '#7A4A12',
        framedInkSoft: 'rgba(122,74,18,0.85)',
        accent: '#B07A2A',
        accentSoft: '#9C6B2F',
        motif: '🪔',
        daytime: true,
        tagline: 'Where it all begins',
        vibeWords: ['Blessings', 'Rituals', 'New Beginnings'],
        quote: 'The first step of a beautiful journey.',
        footline: 'TRADITION · FAMILY · LOVE',
        titleColor: '#FFF4D8',
        decor: { ornament: '#E3C891', ornamentAccent: '#FFF4D8', leaf: '#B98A3E', flower: '#F0C96B' },
      },
    },
    {
      id: 'sangeet',
      slug: 'sangeet',
      name: 'Sangeet',
      dateTime: '2026-11-27T16:00:00+05:30',
      timeConfirmed: true,
      timeLabel: '4:00 P.M. · Dinner 7:00 P.M.',
      venue: 'Apar Place',
      venueConfirmed: true,
      city: 'Rewari Road, Narnaul, Haryana',
      mapUrl: 'https://maps.app.goo.gl/SqBKoFZ7F9kwWWA98',
      highlightVenue: true,
      notes: ['Friday, 27th November 2026', 'Programme: 4:00 P.M.', 'Dinner: 7:00 P.M.'],
      description: 'An evening of music, dance and celebration.',
      invite: 'Dance the night away with us at the Sangeet — an evening of music and joy.',
      icon: 'sangeet',
      order: 2,
      dressCode: {
        men: 'Black & blue party wear',
        women: 'Black & blue party wear',
        note: 'Black & blue party wear',
      },
      theme: {
        mood: 'A glamorous night of music',
        background:
          'radial-gradient(120% 120% at 50% 20%, #1B2A5B 0%, #121A38 50%, #070A18 100%)',
        backgroundImage: '/media/sangeet-bg.jpg',
        backgroundMode: 'framed',
        framedInk: '#1C2A5B',
        framedInkSoft: 'rgba(28,42,91,0.85)',
        accent: '#2C3E86',
        accentSoft: '#C5A16A',
        motif: '🎶',
        daytime: false,
        tagline: 'An evening of love, laughter & a little sparkle',
        vibeWords: ['Music', 'Dance', 'Lights', 'Celebration'],
        quote: 'Tonight we dance like nobody’s watching.',
        footline: 'RHYTHM · GLAMOUR · JOY',
        titleColor: '#EAF0FF',
        decor: { ornament: '#C5A16A', ornamentAccent: '#9FB6FF', leaf: '#6E7FB8', flower: '#C9D4FF' },
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
      city: 'Uttar Pradesh',
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
          'linear-gradient(160deg, #F6F0E2 0%, #EDE3CC 45%, #E4D9BE 100%)',
        backgroundImage: '/media/mehndi-bg.jpg',
        backgroundMode: 'framed',
        framedAlign: 'right',
        framedInk: '#5A2A33',
        framedInkSoft: 'rgba(90,42,51,0.82)',
        accent: '#2E6B3E',
        accentSoft: '#9C6B2F',
        motif: '🌿',
        daytime: true,
        tagline: 'Let mehndi tell our story',
        vibeWords: ['Traditions', 'Colours', 'Forever Ours'],
        quote: 'Some get their hands painted. We get our hearts a little brighter.',
        footline: 'TRADITIONS · COLOURS · FOREVER OURS',
        titleColor: '#2E6B3E',
        decor: { ornament: '#9C6B2F', ornamentAccent: '#2E6B3E', leaf: '#5E8C63', flower: '#C76B7E' },
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
      city: 'Uttar Pradesh',
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
        mood: 'My glow. My vibes. My forever.',
        background:
          'radial-gradient(120% 120% at 50% 10%, #FBF3DC 0%, #FBE6B0 32%, #F6A7C0 70%, #E86AA0 100%)',
        backgroundImage: '/media/haldi-bg.jpg',
        backgroundMode: 'framed',
        framedInk: '#B01458',
        framedInkSoft: 'rgba(176,20,88,0.85)',
        accent: '#C01E63',
        accentSoft: '#9D294B',
        motif: '🌼',
        daytime: true,
        tagline: 'My glow. My vibes. My forever.',
        vibeWords: ['Smiles', 'Laughter', 'Turmeric & Magic'],
        quote: 'Let the golden memories begin.',
        footline: 'GOOD PEOPLE · BRIGHT VIBES · BEAUTIFUL BEGINNINGS',
        titleColor: '#C01E63',
        decor: { ornament: '#C01E63', ornamentAccent: '#FFC24D', leaf: '#D94E86', flower: '#FF9EC4' },
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
        men: '',
        women: '',
        note: 'Wear what you love, bring your blessings, and let’s make memories together.',
      },
      theme: {
        mood: 'A luxurious wedding night under the stars',
        background:
          'radial-gradient(90% 70% at 50% 25%, #3a1824 0%, #21191B 55%, #160F12 100%)',
        backgroundImage: '/media/wedding-bg.jpg',
        backgroundMode: 'framed',
        framedInk: '#8A2140',
        framedInkSoft: 'rgba(138,33,64,0.85)',
        accent: '#A5824A',
        accentSoft: '#C78D9E',
        motif: '✨',
        daytime: false,
        tagline: 'The beginning of forever',
        vibeWords: ['Vows', 'Blessings', 'Forever'],
        quote: 'Two souls, one promise, under the winter stars.',
        footline: 'LOVE · FAMILY · FOREVER',
        titleColor: '#FFF4D8',
        decor: { ornament: '#E3C891', ornamentAccent: '#C78D9E', leaf: '#8A6B3E', flower: '#C78D9E' },
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
    src: '/media/gira.mp3', // fallback track
    title: 'Wedding Music',
    // All tracks live in the Supabase media bucket. A random one plays each
    // visit, and a new random track starts when the current one ends.
    playlist: [
      '/media/gira.mp3',
      '/media/Kut Kut Bajra.mp3',
      '/media/Aaj Sajeya.mp4',
      '/media/Chitta.mp4',
      '/media/Kale Rang Da Paranda.mp4',
    ],
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
