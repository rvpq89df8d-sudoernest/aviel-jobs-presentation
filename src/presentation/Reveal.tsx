import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

export type SlideProps = {
  step: number
}

export function Reveal({
  at,
  step,
  className,
  children,
}: {
  at: number
  step: number
  className?: string
  children: ReactNode
}) {
  if (step < at) {
    return null
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

export function SlideShell({ children }: { children: ReactNode }) {
  return <div className="slide-shell mx-auto w-full max-w-7xl px-8">{children}</div>
}
