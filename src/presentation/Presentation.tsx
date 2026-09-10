import { useLocale } from '@/i18n/LocaleContext.tsx'
import { Chrome } from '@/presentation/Chrome.tsx'
import {
  AboutSlide,
  AdminSlide,
  AgentsSlide,
  CloseSlide,
  ConsultingSlide,
  CrmSlide,
  DashboardSlide,
  GeoSlide,
  HeroSlide,
  HubSlide,
  IntakeSlide,
  JourneySlide,
  SLIDE_STEPS,
  ThinkSlide,
} from '@/presentation/slides.tsx'
import { AnimatePresence, motion } from 'framer-motion'
import { useCallback, useEffect, useRef, useState, type TouchEvent } from 'react'

const SLIDES = [
  HeroSlide,
  AboutSlide,
  JourneySlide,
  ThinkSlide,
  DashboardSlide,
  IntakeSlide,
  ConsultingSlide,
  CrmSlide,
  AgentsSlide,
  HubSlide,
  AdminSlide,
  GeoSlide,
  CloseSlide,
] as const

export default function Presentation() {
  const { locale, t } = useLocale()
  const [index, setIndex] = useState(0)
  const [step, setStep] = useState(0)
  const [direction, setDirection] = useState(1)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)
  const indexRef = useRef(0)
  const stepRef = useRef(0)
  indexRef.current = index
  stepRef.current = step

  const titles = [
    t.heroTitle,
    t.aboutTitle,
    t.journeyHeader,
    t.thinkTitle,
    t.dashTitle,
    t.intakeTitle,
    t.consultTitle,
    t.crmTitle,
    t.agentsTitle,
    t.hubTitle,
    t.adminTitle,
    t.geoTitle,
    t.closeTitle,
  ]

  const goSlide = useCallback((nextIndex: number, dir: number) => {
    const wrapped = (nextIndex + SLIDES.length) % SLIDES.length
    setDirection(dir)
    setIndex(wrapped)
    setStep(0)
  }, [])

  const advance = useCallback(() => {
    const current = indexRef.current
    const currentStep = stepRef.current
    const max = SLIDE_STEPS[current]
    if (currentStep < max - 1) {
      setStep(currentStep + 1)
      return
    }
    goSlide(current + 1, 1)
  }, [goSlide])

  const retreat = useCallback(() => {
    const current = indexRef.current
    const currentStep = stepRef.current
    if (currentStep > 0) {
      setStep(currentStep - 1)
      return
    }
    const prevIndex = (current - 1 + SLIDES.length) % SLIDES.length
    setDirection(-1)
    setIndex(prevIndex)
    setStep(SLIDE_STEPS[prevIndex] - 1)
  }, [])

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA'].includes((event.target as HTMLElement).tagName)) {
        return
      }
      if (event.key === ' ' || event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
        event.preventDefault()
      }
      if (event.key === ' ') {
        advance()
      }
      if (event.key === 'ArrowLeft') {
        if (locale === 'he') {
          advance()
        } else {
          retreat()
        }
      }
      if (event.key === 'ArrowRight') {
        if (locale === 'he') {
          retreat()
        } else {
          advance()
        }
      }
    }

    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('keydown', onKey)
    }
  }, [advance, locale, retreat])

  const onTouchStart = useCallback((event: TouchEvent<HTMLDivElement>) => {
    setTouchEnd(null)
    setTouchStart(event.targetTouches[0].clientX)
  }, [])

  const onTouchEnd = useCallback(
    (event: TouchEvent<HTMLDivElement>) => {
      const endX = event.changedTouches[0].clientX
      setTouchEnd(endX)
      if (touchStart === null) {
        return
      }
      const delta = (touchEnd ?? endX) - touchStart
      if (delta > 50) {
        advance()
        return
      }
      if (delta < -50) {
        retreat()
      }
    },
    [advance, retreat, touchStart],
  )

  const Slide = SLIDES[index]
  const enterX = (locale === 'he' ? -1 : 1) * direction * 36

  return (
    <div
      className="relative h-svh min-w-0 overflow-x-hidden overflow-y-hidden bg-void text-ink"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <Chrome
        title={titles[index]}
        index={index}
        total={SLIDES.length}
        onPrev={retreat}
        onNext={advance}
        onJump={(target) => goSlide(target, target > index ? 1 : -1)}
      />
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={`${index}-${locale}`}
          className="absolute inset-0 min-w-0 pt-[4.6rem] pb-[4.6rem]"
          initial={{ opacity: 0, x: enterX }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: enterX * -0.5 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          onClick={(event) => {
            const target = event.target as HTMLElement
            if (target.closest('a,button,input,textarea,[data-chrome]')) {
              return
            }
            advance()
          }}
        >
          <Slide step={step} />
        </motion.div>
      </AnimatePresence>
      <span className="sr-only">{t.navHint}</span>
    </div>
  )
}
