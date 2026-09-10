import { useLocale } from '@/i18n/LocaleContext.tsx'
import { ParallaxLayer } from '@/lib/motion/ParallaxLayer.tsx'
import { jobCards } from '@/presentation/data/content.ts'
import { BlurStat, BrandMark } from '@/presentation/ui/LiveCta.tsx'
import type { MotionValue } from 'framer-motion'

type LightDashboardProps = {
  x: MotionValue<number>
  y: MotionValue<number>
  highlightJobs?: boolean
  zoomed?: boolean
}

export function LightDashboard({ x, y, highlightJobs = false, zoomed = false }: LightDashboardProps) {
  const { locale, t } = useLocale()
  const cards = jobCards[locale]
  const metrics = [t.metricJobs, t.metricWait, t.metricConsult, t.metricViews]
  const nav = [t.overview, t.dashJobs, t.vacancies, t.candidates, t.messages, t.settings]

  return (
    <div
      className={`flex h-full min-h-0 min-w-0 overflow-x-visible overflow-y-auto rounded-[28px] bg-[#f4f7fb] text-slate-800 shadow-[0_24px_60px_rgba(0,0,0,0.28)] transition-transform duration-700 ${
        zoomed ? 'origin-center scale-[1.08]' : ''
      }`}
    >
      <aside className="flex w-[min(11.5rem,28%)] shrink-0 flex-col border-e border-slate-200 bg-[#eef4fb] p-3">
        <BrandMark light />
        <nav className="mt-5 space-y-1 text-sm">
          {nav.map((item) => {
            const jobs = item === t.dashJobs
            return (
              <div
                key={item}
                data-recordly-target={jobs ? 'branch-jobs' : undefined}
                className={`break-words rounded-xl px-3 py-2 ${
                  jobs && highlightJobs
                    ? 'bg-aj font-semibold text-white shadow-lg ring-4 ring-sky-300'
                    : jobs
                      ? 'bg-white font-semibold text-aj shadow-sm'
                      : 'text-slate-500'
                }`}
              >
                {item}
              </div>
            )
          })}
        </nav>
        <button type="button" className="mt-auto rounded-xl bg-white px-3 py-2 text-sm text-rose-500">
          {t.logout}
        </button>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 px-4 py-3 text-sm">
          <div className="flex min-w-0 flex-wrap items-center gap-x-4 gap-y-1 text-slate-500">
            <span className="font-medium text-slate-800">{t.myAccount}</span>
            <span>{t.vacancies}</span>
            <span>{t.resumes}</span>
            <span>{t.about}</span>
          </div>
          <span className="rounded-full bg-slate-100 px-2 py-1 text-[11px] font-bold">
            {locale === 'he' ? 'HE' : 'EN'}
          </span>
        </header>

        <div className="min-w-0 flex-1 overflow-x-visible p-4 md:p-5">
          <p className="text-sm text-slate-500">{t.dashWelcome}</p>
          <div className="mt-4 grid grid-cols-2 gap-3 xl:grid-cols-4">
            {metrics.map((label, index) => (
              <ParallaxLayer key={label} x={x} y={y} depth={0.35 + index * 0.12}>
                <article className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                  <p className="text-xs break-words text-slate-500">{label}</p>
                  <p className="mt-2 text-2xl font-bold text-aj">
                    <BlurStat />
                  </p>
                </article>
              </ParallaxLayer>
            ))}
          </div>

          <div className="mt-5 flex flex-wrap items-center justify-between gap-2">
            <h3
              data-recordly-target="branch-jobs-title"
              className={`text-xl font-bold break-words text-aj ${highlightJobs ? 'underline decoration-2' : ''}`}
            >
              {t.dashJobs}
            </h3>
            <div className="flex flex-wrap gap-2">
              <span className="rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs">{t.allBranches}</span>
              <span className="rounded-xl bg-aj px-3 py-1.5 text-xs font-bold text-white">{t.postJob}</span>
            </div>
          </div>

          <div className="mt-3 space-y-2">
            {cards.map((card, index) => (
              <ParallaxLayer key={card.title} x={x} y={y} depth={0.55 + index * 0.18}>
                <article className="flex min-w-0 flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
                  <div className="flex min-w-0 items-center gap-3">
                    <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-sky-100 text-sm font-bold text-aj">
                      {card.title.slice(0, 1)}
                    </span>
                    <div className="min-w-0">
                      <p className="font-semibold break-words">{card.title}</p>
                      <p className="text-xs text-slate-500">
                        {card.city} · {t.hq} · {card.tag}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center gap-3 text-xs">
                    <span className="font-semibold text-emerald-600">{t.statusActive}</span>
                    <span>
                      {t.candidates} <BlurStat className="align-middle" />
                    </span>
                    <span className="rounded-lg bg-sky-50 px-2 py-1 font-semibold text-aj">{t.addCandidate}</span>
                  </div>
                </article>
              </ParallaxLayer>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
