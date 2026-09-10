import { aboutOfficial } from '@/i18n/copy.ts'
import { useLocale } from '@/i18n/LocaleContext.tsx'
import { ParallaxLayer } from '@/lib/motion/ParallaxLayer.tsx'
import { useMouseParallax } from '@/lib/motion/useMouseParallax.ts'
import { agents, safetyControls } from '@/presentation/data/content.ts'
import { Reveal, SlideShell, type SlideProps } from '@/presentation/Reveal.tsx'
import { AdminBoard } from '@/presentation/ui/AdminBoard.tsx'
import { ConsultingTable } from '@/presentation/ui/ConsultingTable.tsx'
import { DarkCrm } from '@/presentation/ui/DarkCrm.tsx'
import { LightDashboard } from '@/presentation/ui/LightDashboard.tsx'
import { BrandMark, LiveCta } from '@/presentation/ui/LiveCta.tsx'
import { LondonIntake } from '@/presentation/ui/LondonIntake.tsx'
import { SimCursor } from '@/presentation/ui/SimCursor.tsx'
import { motion } from 'framer-motion'
import { lazy, Suspense, useState } from 'react'

const RecordlyStage = lazy(() => import('@/presentation/recordly/RecordlyStage.tsx'))
const RemotionCta = lazy(async () => ({
  default: (await import('@/presentation/remotion/Players.tsx')).LiveCtaPlayer,
}))

export const SLIDE_STEPS = [3, 3, 4, 1, 4, 4, 4, 4, 4, 3, 3, 3, 3] as const

function StageFallback({ label }: { label: string }) {
  return <div className="grid h-full place-items-center rounded-[28px] bg-panel text-sm text-muted">{label}</div>
}

export function HeroSlide({ step }: SlideProps) {
  const { t } = useLocale()
  const { x, y } = useMouseParallax()
  const cards = [t.hudControl, t.hudBranches, t.hudAgents, t.hudConsult]

  return (
    <SlideShell>
      <div className="relative flex min-h-full flex-col justify-center">
        <Reveal at={0} step={step}>
          <p className="inline-flex max-w-full rounded-full border border-cyan bg-aj/20 px-4 py-2 text-sm font-medium text-white">
            {t.navHint}
          </p>
          <ParallaxLayer x={x} y={y} depth={0.35} className="mt-6">
            <BrandMark />
            <h1 className="mt-5 max-w-5xl font-sans text-4xl font-extrabold leading-[1.2] text-white md:text-6xl">
              {t.heroTitle}
            </h1>
          </ParallaxLayer>
        </Reveal>
        <Reveal at={1} step={step} className="mt-5 max-w-3xl">
          <p className="text-lg text-muted">{t.heroSubtitle}</p>
        </Reveal>
        <Reveal at={2} step={step} className="mt-8">
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {cards.map((card, index) => (
              <ParallaxLayer key={card} x={x} y={y} depth={0.3 + index * 0.12}>
                <article className="rounded-2xl border border-line bg-panel px-4 py-4 text-sm">{card}</article>
              </ParallaxLayer>
            ))}
          </div>
        </Reveal>
      </div>
    </SlideShell>
  )
}

export function AboutSlide({ step }: SlideProps) {
  const { t } = useLocale()
  const lines = aboutOfficial.split('\n')

  return (
    <SlideShell>
      <Reveal at={0} step={step}>
        <p className="font-mono text-[11px] tracking-[0.2em] text-gold uppercase">{t.aboutKicker}</p>
        <h2 className="mt-2 font-serif text-4xl md:text-6xl">{t.aboutTitle}</h2>
      </Reveal>
      <Reveal at={1} step={step} className="mt-8 max-w-4xl">
        <div className="space-y-4 rounded-[28px] border border-line bg-panel p-6 text-lg leading-relaxed md:p-8">
          {lines.slice(0, 3).map((line) => (
            <p key={line} className="whitespace-pre-wrap">
              {line}
            </p>
          ))}
        </div>
      </Reveal>
      <Reveal at={2} step={step} className="mt-4 max-w-4xl">
        <div className="space-y-3 rounded-[28px] border border-cyan/30 bg-panel p-6 text-lg">
          {lines.slice(3).map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>
      </Reveal>
    </SlideShell>
  )
}

export function JourneySlide({ step }: SlideProps) {
  const { t } = useLocale()
  const frames = [
    { src: './journey/image_ab0fb8.jpg', alt: 'Shauli in Israel' },
    { src: './journey/image_ab0fdb.jpg', alt: 'Shauli in Europe' },
    { src: './journey/image_ab0ffa.jpg', alt: 'Shauli in France' },
  ]

  return (
    <SlideShell>
      <h2 className="shrink-0 text-center font-sans text-xl font-bold leading-snug text-white md:text-3xl">
        {t.journeyHeader}
      </h2>
      <div className="mt-4 grid min-h-0 flex-1 grid-cols-3 items-stretch gap-3">
        {frames.map((frame, index) => (
          <div key={frame.src} className="relative flex h-full min-h-0 min-w-0 items-center justify-center">
            {step >= index + 1 ? (
              <motion.img
                src={frame.src}
                alt={frame.alt}
                className="h-auto max-h-full w-auto max-w-full object-contain"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45 }}
              />
            ) : null}
            {index < 2 && step >= index + 2 ? (
              <motion.div
                className="pointer-events-none absolute top-1/2 -end-3 z-10 hidden -translate-y-1/2 text-cyan lg:block"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <svg viewBox="0 0 40 40" className="size-8">
                  <path d="M32 20H8" stroke="currentColor" strokeWidth="3" />
                  <path d="M14 12 6 20l8 8" fill="none" stroke="currentColor" strokeWidth="3" />
                </svg>
              </motion.div>
            ) : null}
          </div>
        ))}
      </div>
    </SlideShell>
  )
}

export function ThinkSlide({ step }: SlideProps) {
  const { t } = useLocale()

  return (
    <SlideShell>
      <div className="flex min-h-full min-w-0 flex-col">
        <Reveal at={0} step={step} className="shrink-0">
          <div className="rounded-3xl border border-white/15 bg-black/55 px-6 py-5 shadow-[0_20px_60px_rgba(0,0,0,0.35)] backdrop-blur-xl">
            <h2 className="text-center font-sans text-3xl font-extrabold leading-snug text-white md:text-5xl">
              {t.thinkTitle}
            </h2>
            <p className="mx-auto mt-3 max-w-4xl text-center text-base leading-relaxed text-white/80 md:text-xl">
              {t.thinkBody}
            </p>
          </div>
        </Reveal>
        <div className="mt-4 flex min-h-0 flex-1 items-center justify-center">
          <img
            src="./journey/image_b5f85f.jpg"
            alt="שאלה, חשיבה, ורעיון מעל הגלובוס"
            className="h-full w-full object-contain"
          />
        </div>
      </div>
    </SlideShell>
  )
}

export function DashboardSlide({ step }: SlideProps) {
  const { t } = useLocale()
  const { x, y } = useMouseParallax()
  const zoomed = step >= 3

  return (
    <SlideShell>
      <div className="mb-3 flex flex-wrap items-end justify-between gap-3">
        <div className="min-w-0">
          <p className="font-mono text-[11px] tracking-[0.2em] text-cyan uppercase">{t.dashKicker}</p>
          <h2 className="mt-1 font-serif text-3xl md:text-5xl">{t.dashTitle}</h2>
        </div>
        <LiveCta />
      </div>
      <Reveal at={1} step={step} className="relative min-h-0 min-w-0 flex-1">
        <LightDashboard x={x} y={y} highlightJobs={step >= 2} zoomed={zoomed} />
        <SimCursor play={step >= 2} target="branch-jobs" />
        {zoomed ? (
          <div className="pointer-events-none absolute inset-0">
            <Suspense fallback={<StageFallback label={t.recordly} />}>
              <RecordlyStage active variant="warehouse" className="h-full opacity-80" />
            </Suspense>
          </div>
        ) : null}
      </Reveal>
    </SlideShell>
  )
}

export function IntakeSlide({ step }: SlideProps) {
  const { t } = useLocale()

  return (
    <SlideShell>
      <p className="font-mono text-[11px] tracking-[0.2em] text-gold uppercase">{t.intakeKicker}</p>
      <h2 className="mt-1 font-serif text-3xl md:text-5xl">{t.intakeTitle}</h2>
      <Reveal at={1} step={step} className="relative mt-4 min-h-0 flex-1">
        <LondonIntake showFile={step >= 2} assigned={step >= 3} />
        <SimCursor play={step >= 2} target="candidate-file" />
        {step >= 3 ? (
          <div className="pointer-events-none absolute inset-0">
            <Suspense fallback={<StageFallback label={t.recordly} />}>
              <RecordlyStage active variant="intake" className="h-full opacity-75" />
            </Suspense>
          </div>
        ) : null}
      </Reveal>
    </SlideShell>
  )
}

export function ConsultingSlide({ step }: SlideProps) {
  const { t } = useLocale()

  return (
    <SlideShell>
      <p className="font-mono text-[11px] tracking-[0.2em] text-gold uppercase">{t.consultKicker}</p>
      <h2 className="mt-1 font-serif text-3xl md:text-5xl">{t.consultTitle}</h2>
      <p className="mt-2 max-w-3xl text-sm text-muted">{t.consultHint}</p>
      <Reveal at={1} step={step} className="relative mt-4 min-h-0 flex-1">
        <ConsultingTable highlightRow={step >= 2} zoomed={step >= 3} />
        <SimCursor play={step >= 2} target="consult-row" />
        {step >= 3 ? (
          <div className="pointer-events-none absolute inset-0">
            <Suspense fallback={<StageFallback label={t.recordly} />}>
              <RecordlyStage active variant="consulting" className="h-full opacity-80" />
            </Suspense>
          </div>
        ) : null}
      </Reveal>
    </SlideShell>
  )
}

export function CrmSlide({ step }: SlideProps) {
  const { t } = useLocale()

  return (
    <SlideShell>
      <div className="flex items-center gap-3">
        <img
          src="./brand/image_b8373c.png"
          alt="Aviel Jobs — א.ו. אביאל בע״מ — המחסן הדיגיטלי"
          className="h-8 w-auto max-h-10 shrink-0 object-contain md:h-10"
        />
        <h2 className="min-w-0 font-serif text-3xl md:text-5xl">{t.crmTitle}</h2>
      </div>
      <Reveal at={1} step={step} className="relative mt-4 min-h-0 flex-1">
        <DarkCrm highlightLead={step >= 2} synced={step >= 3} />
        <SimCursor play={step >= 2} target="crm-lead" />
        {step >= 3 ? (
          <div className="pointer-events-none absolute inset-0">
            <Suspense fallback={<StageFallback label={t.recordly} />}>
              <RecordlyStage active variant="crm" className="h-full opacity-75" />
            </Suspense>
          </div>
        ) : null}
      </Reveal>
    </SlideShell>
  )
}

export function AgentsSlide({ step }: SlideProps) {
  const { locale, t } = useLocale()
  const people = agents[locale]

  return (
    <SlideShell>
      <p className="font-mono text-[11px] tracking-[0.2em] text-gold uppercase">{t.agentsKicker}</p>
      <Reveal at={0} step={step}>
        <h2 className="mt-1 font-serif text-3xl md:text-5xl">{t.agentsTitle}</h2>
        <p className="mt-4 max-w-4xl whitespace-pre-line text-lg text-muted">{t.agentsBody}</p>
      </Reveal>
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {people.map((agent, index) => (
          <Reveal key={agent.name} at={index + 1} step={step}>
            <article className="rounded-[28px] border border-line bg-panel p-6">
              <div className="flex items-center gap-3">
                <span className="relative grid size-14 place-items-center rounded-full bg-aj text-lg font-bold">
                  {agent.name.slice(0, 1)}
                  <span className="absolute -end-0.5 -top-0.5 size-3 rounded-full bg-emerald-400">
                    <span className="absolute inset-0 animate-ping rounded-full bg-emerald-400/70" />
                  </span>
                </span>
                <div>
                  <p className="font-mono text-[10px] tracking-[0.16em] text-gold uppercase">{agent.role}</p>
                  <h3 className="font-serif text-3xl">{agent.name}</h3>
                </div>
              </div>
              <p className="mt-4 text-muted">{agent.line}</p>
              <p className="mt-4 inline-flex rounded-full bg-cyan/10 px-3 py-1 text-sm text-cyan">{agent.task}</p>
            </article>
          </Reveal>
        ))}
      </div>
    </SlideShell>
  )
}

export function HubSlide({ step }: SlideProps) {
  const { locale, t } = useLocale()
  const controls = safetyControls[locale]
  const [focus, setFocus] = useState(0)

  return (
    <SlideShell>
      <p className="font-mono text-[11px] tracking-[0.2em] text-gold uppercase">{t.hubKicker}</p>
      <h2 className="mt-1 font-serif text-3xl md:text-5xl">{t.hubTitle}</h2>
      <Reveal at={1} step={step} className="mt-2 max-w-3xl">
        <p className="text-sm text-muted">{t.hubBody}</p>
      </Reveal>
      <Reveal at={2} step={step} className="mt-4 grid min-h-0 flex-1 grid-cols-2 gap-2 overflow-x-visible lg:grid-cols-7">
        {controls.map((control, index) => (
          <motion.article
            key={control.name}
            className="rounded-2xl border border-line bg-panel p-3"
            onHoverStart={() => setFocus(index)}
            animate={{
              scale: focus === index ? 1.04 : 1,
              borderColor: focus === index ? 'rgba(126,224,242,0.7)' : 'rgba(232,228,217,0.12)',
            }}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
          >
            <p className="font-mono text-[10px] text-cyan">{String(index + 1).padStart(2, '0')}</p>
            <p className="mt-1 text-sm font-medium break-words">{control.name}</p>
            <p className="mt-1 text-[11px] leading-relaxed text-muted">{control.detail}</p>
          </motion.article>
        ))}
      </Reveal>
    </SlideShell>
  )
}

export function AdminSlide({ step }: SlideProps) {
  const { t } = useLocale()

  return (
    <SlideShell>
      <p className="font-mono text-[11px] tracking-[0.2em] text-gold uppercase">{t.adminKicker}</p>
      <h2 className="mt-1 font-serif text-3xl md:text-5xl">{t.adminTitle}</h2>
      <Reveal at={1} step={step} className="mt-4 min-h-0 flex-1 overflow-x-visible overflow-y-auto">
        <AdminBoard />
      </Reveal>
      <Reveal at={2} step={step} className="mt-3 text-sm text-muted">
        {t.adminSub}
      </Reveal>
    </SlideShell>
  )
}

export function GeoSlide({ step }: SlideProps) {
  const { t } = useLocale()

  return (
    <SlideShell>
      <p className="font-mono text-[11px] tracking-[0.2em] text-gold uppercase">{t.geoKicker}</p>
      <h2 className="mt-2 max-w-4xl font-serif text-4xl md:text-6xl">{t.geoTitle}</h2>
      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <Reveal at={1} step={step}>
          <article className="rounded-[28px] border border-gold/40 bg-panel p-8">
            <p className="font-mono text-[11px] tracking-[0.2em] text-gold uppercase">{t.geoLocal}</p>
            <h3 className="mt-4 font-serif text-3xl">Digital Job Interviews</h3>
            <p className="mt-3 font-serif text-2xl">ראיונות עבודה דיגיטליים</p>
            <p className="mt-5 text-muted">{t.geoLocalBody}</p>
          </article>
        </Reveal>
        <Reveal at={2} step={step}>
          <article className="rounded-[28px] border border-cyan/40 bg-panel p-8">
            <p className="font-mono text-[11px] tracking-[0.2em] text-cyan uppercase">{t.geoGlobal}</p>
            <h3 className="mt-4 font-serif text-3xl">Business Consulting connecting to the business</h3>
            <p className="mt-3 font-serif text-2xl">ייעוץ מחבר לבית העסק</p>
            <p className="mt-5 text-muted">{t.geoGlobalBody}</p>
            <p className="mt-6 text-ink">{t.geoCandidate}</p>
          </article>
        </Reveal>
      </div>
    </SlideShell>
  )
}

export function CloseSlide({ step }: SlideProps) {
  const { t } = useLocale()

  return (
    <SlideShell>
      <div className="flex min-h-full flex-col items-start justify-center">
        <Reveal at={0} step={step}>
          <p className="font-mono text-[11px] tracking-[0.2em] text-gold uppercase">{t.branchControl}</p>
          <h2 className="mt-4 max-w-5xl font-serif text-4xl leading-[1.12] md:text-6xl">{t.closeTitle}</h2>
        </Reveal>
        <Reveal at={1} step={step} className="mt-8 max-w-3xl">
          <p className="text-lg text-muted">{t.closeBody}</p>
        </Reveal>
        <Reveal at={2} step={step} className="mt-10 w-full max-w-lg">
          <Suspense fallback={<LiveCta />}>
            <RemotionCta />
          </Suspense>
        </Reveal>
      </div>
    </SlideShell>
  )
}
