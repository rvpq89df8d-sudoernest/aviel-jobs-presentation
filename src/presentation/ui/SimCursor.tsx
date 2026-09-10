import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

type SimCursorProps = {
  play: boolean
  target: string
  onClicked?: () => void
}

export function SimCursor({ play, target, onClicked }: SimCursorProps) {
  const [point, setPoint] = useState({ x: 72, y: 120, clicked: false })

  useEffect(() => {
    if (!play) {
      setPoint({ x: 72, y: 120, clicked: false })
      return
    }

    const node = document.querySelector<HTMLElement>(`[data-recordly-target="${target}"]`)
    if (!node) {
      return
    }

    const box = node.getBoundingClientRect()
    const dest = { x: box.left + box.width * 0.72, y: box.top + box.height * 0.55 }
    setPoint({ x: dest.x, y: dest.y, clicked: false })

    const clickTimer = window.setTimeout(() => {
      setPoint((current) => ({ ...current, clicked: true }))
      onClicked?.()
    }, 900)

    return () => window.clearTimeout(clickTimer)
  }, [play, target, onClicked])

  if (!play) {
    return null
  }

  return (
    <motion.div
      className="pointer-events-none fixed z-[70]"
      initial={{ x: 80, y: 160, opacity: 0 }}
      animate={{
        x: point.x,
        y: point.y,
        opacity: 1,
        scale: point.clicked ? 0.86 : 1,
      }}
      transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
    >
      <svg width="28" height="28" viewBox="0 0 28 28" aria-hidden>
        <path
          d="M4 3 22 14.2 13.4 15.6 11.2 25 4 3Z"
          fill="#f8fafc"
          stroke="#1d4ed8"
          strokeWidth="1.6"
        />
      </svg>
      {point.clicked ? (
        <span className="absolute start-4 top-4 size-8 rounded-full border-2 border-cyan/80" />
      ) : null}
    </motion.div>
  )
}
