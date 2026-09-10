import { useMotionValue, useSpring } from 'framer-motion'
import { useEffect } from 'react'

export function useMouseParallax() {
  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)
  const x = useSpring(rawX, { stiffness: 46, damping: 18, mass: 0.35 })
  const y = useSpring(rawY, { stiffness: 46, damping: 18, mass: 0.35 })

  useEffect(() => {
    const onMove = (event: MouseEvent) => {
      rawX.set((event.clientX / window.innerWidth - 0.5) * 2)
      rawY.set((event.clientY / window.innerHeight - 0.5) * 2)
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [rawX, rawY])

  return { x, y }
}
