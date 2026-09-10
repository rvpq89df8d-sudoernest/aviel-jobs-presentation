import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

let registered = false

export function registerGsap() {
  if (registered) {
    return
  }

  gsap.registerPlugin(ScrollTrigger)
  gsap.config({ nullTargetWarn: false })
  registered = true
}

export { gsap, ScrollTrigger }
