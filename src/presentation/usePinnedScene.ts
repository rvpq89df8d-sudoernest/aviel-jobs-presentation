import { gsap, registerGsap, ScrollTrigger } from '@/lib/motion/gsapRuntime.ts'
import { useEffect, useRef, type RefObject } from 'react'

type PinOptions = {
  trigger: RefObject<HTMLElement | null>
  end?: string
  onProgress?: (progress: number) => void
}

export function usePinnedScene({ trigger, end = '+=160%', onProgress }: PinOptions) {
  const onProgressRef = useRef(onProgress)
  onProgressRef.current = onProgress

  useEffect(() => {
    const element = trigger.current
    if (!element) {
      return
    }

    registerGsap()
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: element,
        start: 'top top',
        end,
        pin: true,
        scrub: 0.65,
        anticipatePin: 1,
        onUpdate: (self) => {
          onProgressRef.current?.(self.progress)
        },
      })
    }, element)

    const timer = window.setTimeout(() => ScrollTrigger.refresh(), 80)

    return () => {
      window.clearTimeout(timer)
      ctx.revert()
    }
  }, [end, trigger])
}
