import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion'

const HUBS = [
  { name: 'New York', x: 220, y: 210 },
  { name: 'London', x: 520, y: 170 },
  { name: 'Dubai', x: 680, y: 280 },
  { name: 'Tokyo', x: 980, y: 220 },
  { name: 'Singapore', x: 900, y: 360 },
  { name: 'Sydney', x: 1080, y: 460 },
] as const

const LINKS: Array<[number, number]> = [
  [0, 1],
  [1, 2],
  [2, 3],
  [2, 4],
  [4, 5],
  [0, 2],
  [1, 4],
]

type MapFilmProps = {
  liveLabel: string
  prompt: string
  here: string
}

export function MapFilm({ liveLabel, prompt, here }: MapFilmProps) {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()
  const promptX = interpolate(frame, [0, 24], [80, 0], { extrapolateRight: 'clamp' })
  const promptOpacity = interpolate(frame, [0, 18], [0, 1], { extrapolateRight: 'clamp' })
  const mapOpacity = interpolate(frame, [20, 40], [0, 1], { extrapolateRight: 'clamp' })
  const lineT = interpolate(frame, [36, 110], [0, 1], { extrapolateRight: 'clamp' })
  const ctaScale = spring({
    frame: Math.max(0, frame - 90),
    fps,
    config: { damping: 14, stiffness: 80 },
  })

  return (
    <AbsoluteFill
      style={{
        background:
          'radial-gradient(circle at 50% 30%, #dbeafe 0%, #eff6ff 42%, #f8fafc 100%)',
        fontFamily: 'Heebo, sans-serif',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 36,
          borderRadius: 28,
          background: 'linear-gradient(180deg, #e0f2fe, #f0f9ff)',
          opacity: mapOpacity,
          overflow: 'hidden',
        }}
      >
        <svg width="100%" height="100%" viewBox="0 0 1280 720" preserveAspectRatio="xMidYMid slice">
          <ellipse cx="640" cy="360" rx="520" ry="250" fill="#bfdbfe" opacity="0.45" />
          {LINKS.map(([a, b], index) => {
            const from = HUBS[a]
            const to = HUBS[b]
            const length = Math.hypot(to.x - from.x, to.y - from.y)
            const drawn = Math.min(1, Math.max(0, lineT * LINKS.length - index))
            return (
              <path
                key={`${from.name}-${to.name}`}
                d={`M ${from.x} ${from.y} Q ${(from.x + to.x) / 2} ${Math.min(from.y, to.y) - 50} ${to.x} ${to.y}`}
                fill="none"
                stroke="#2563eb"
                strokeWidth="2.4"
                strokeDasharray={length}
                strokeDashoffset={length * (1 - drawn)}
                opacity="0.85"
              />
            )
          })}
          {HUBS.map((hub, index) => {
            const appear = interpolate(frame, [40 + index * 6, 52 + index * 6], [0, 1], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            })
            return (
              <g key={hub.name} opacity={appear}>
                <circle cx={hub.x} cy={hub.y} r="9" fill="#1d4ed8" />
                <circle cx={hub.x} cy={hub.y} r="16" fill="none" stroke="#93c5fd" strokeWidth="2" />
                <text x={hub.x + 18} y={hub.y - 10} fill="#0f172a" fontSize="16" fontWeight="700">
                  {hub.name}
                </text>
              </g>
            )
          })}
        </svg>
        <div
          style={{
            position: 'absolute',
            left: '50%',
            top: 28,
            transform: 'translateX(-50%)',
            textAlign: 'center',
          }}
        >
          <div style={{ fontSize: 34, fontWeight: 800, color: '#1e3a8a', letterSpacing: 1 }}>
            AVIEL JOBS
          </div>
          <div style={{ fontSize: 13, fontWeight: 700, color: '#1d4ed8', letterSpacing: 3 }}>
            GLOBAL RECRUITMENT & STAFFING
          </div>
        </div>
        <div
          style={{
            position: 'absolute',
            left: '50%',
            bottom: 36,
            transform: 'translateX(-50%)',
            display: 'flex',
            alignItems: 'flex-end',
            gap: 12,
          }}
        >
          <div
            style={{
              width: 54,
              height: 54,
              borderRadius: 27,
              background: '#1e3a8a',
            }}
          />
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 32,
              background: '#1d4ed8',
            }}
          />
        </div>
        <div
          style={{
            position: 'absolute',
            right: 28,
            top: 24,
            background: '#0f172a',
            color: 'white',
            fontSize: 11,
            padding: '6px 12px',
            borderRadius: 999,
            letterSpacing: 1,
          }}
        >
          RECRUITING GLOBALLY SINCE 2010
        </div>
      </div>

      <div
        style={{
          position: 'absolute',
          top: 28,
          insetInlineStart: 28,
          width: 360,
          background: '#0b0f16',
          color: '#e8e4d9',
          borderRadius: 22,
          padding: 18,
          opacity: promptOpacity,
          transform: `translateX(${promptX}px)`,
        }}
      >
        <div style={{ color: '#7ee0f2', fontSize: 12, fontWeight: 700 }}>TTNT AI</div>
        <p style={{ fontSize: 13, lineHeight: 1.45, marginTop: 8 }}>{prompt}</p>
        <p style={{ fontSize: 12, color: '#93c5fd', marginTop: 10 }}>{here}</p>
      </div>

      <div
        style={{
          position: 'absolute',
          bottom: 28,
          left: '50%',
          transform: `translateX(-50%) scale(${ctaScale})`,
          background: '#1d4ed8',
          color: 'white',
          padding: '12px 28px',
          borderRadius: 999,
          fontWeight: 800,
          boxShadow: '0 0 28px rgba(29,78,216,0.55)',
        }}
      >
        {liveLabel}
      </div>
    </AbsoluteFill>
  )
}

export const MAP_DURATION = 150
export const MAP_FPS = 30
export const MAP_WIDTH = 1280
export const MAP_HEIGHT = 720
