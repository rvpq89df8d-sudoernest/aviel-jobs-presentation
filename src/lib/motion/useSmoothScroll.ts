import Lenis from 'lenis'
import { useEffect } from 'react'
import { gsap, registerGsap, ScrollTrigger } from './gsapRuntime.ts'

export function useSmoothScroll() {
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) {
      return
    }

    registerGsap()

    const lenis = new Lenis({
      autoRaf: false,
      lerp: 0.075,
      smoothWheel: true,
    })

    lenis.on('scroll', ScrollTrigger.update)

    const onTick = (time: number) => {
      lenis.raf(time * 1000)
    }

    gsap.ticker.add(onTick)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(onTick)
      lenis.destroy()
    }
  }, [])
}
