import { ImageResponse } from 'next/og'

// Lightweight, asset-free share image rendered at the edge.
export const runtime = 'edge'
export const alt = 'Kajal & Daya Sagar — 4 December 2026'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'radial-gradient(120% 120% at 50% 20%, #9D294B 0%, #86203F 45%, #5E1930 100%)',
          color: '#E3C891',
          fontFamily: 'Georgia, serif',
        }}
      >
        <div style={{ fontSize: 34, letterSpacing: 10, textTransform: 'uppercase', color: '#F3DDE2' }}>
          We&apos;re getting married
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            marginTop: 28,
            fontSize: 96,
            fontWeight: 600,
            color: '#FFF9F2',
          }}
        >
          Kajal
          <span style={{ margin: '0 28px', fontSize: 72, color: '#C78D9E' }}>&amp;</span>
          Daya Sagar
        </div>
        <div style={{ marginTop: 10, width: 320, height: 2, background: '#C5A16A' }} />
        <div style={{ marginTop: 32, fontSize: 40, color: '#E3C891' }}>4 December 2026</div>
      </div>
    ),
    { ...size },
  )
}
