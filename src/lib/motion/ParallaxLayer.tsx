import { motion, useTransform, type MotionValue } from 'framer-motion'
import type { ReactNode } from 'react'

export function ParallaxLayer({
  x,
  y,
  depth,
  className,
  children,
}: {
  x: MotionValue<number>
  y: MotionValue<number>
  depth: number
  className?: string
  children: ReactNode
}) {
  const dx = useTransform(x, (value) => value * depth * 16)
  const dy = useTransform(y, (value) => value * depth * 12)

  return (
    <motion.div className={className} style={{ x: dx, y: dy }}>
      {children}
    </motion.div>
  )
}
