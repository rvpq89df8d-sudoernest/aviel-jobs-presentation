import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion'

type LiveCtaFilmProps = {
  label: string
}

export function LiveCtaFilm({ label }: LiveCtaFilmProps) {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()
  const scale = spring({ frame, fps, config: { damping: 12, stiffness: 90 } })
  const glow = interpolate(frame % 40, [0, 20, 40], [0.35, 0.8, 0.35])

  return (
    <AbsoluteFill
      style={{
        background: 'transparent',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div
        style={{
          transform: `scale(${scale})`,
          background: '#1d4ed8',
          color: 'white',
          padding: '16px 36px',
          borderRadius: 999,
          fontFamily: 'Heebo, sans-serif',
          fontWeight: 800,
          fontSize: 22,
          boxShadow: `0 0 ${28 + glow * 24}px rgba(126,224,242,${glow})`,
        }}
      >
        {label}
      </div>
    </AbsoluteFill>
  )
}

export const CTA_DURATION = 90
export const CTA_FPS = 30
export const CTA_WIDTH = 640
export const CTA_HEIGHT = 180
