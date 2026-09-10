import { MotionConfig } from 'framer-motion'
import type { ReactNode } from 'react'

type UiMotionRootProps = {
  children: ReactNode
}

export function UiMotionRoot({ children }: UiMotionRootProps) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>
}
