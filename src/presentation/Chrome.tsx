import { useLocale } from '@/i18n/LocaleContext.tsx'
import { LiveCta } from '@/presentation/ui/LiveCta.tsx'
import { motion } from 'framer-motion'

type ChromeProps = {
  title: string
  index: number
  total: number
  onPrev: () => void
  onNext: () => void
  onJump: (index: number) => void
}

export function Chrome({ title, index, total, onPrev, onNext, onJump }: ChromeProps) {
  const { t, toggle, locale } = useLocale()
  const progress = (index + 1) / total

  return (
    <div data-chrome className="pointer-events-none fixed inset-x-0 top-0 z-50">
      <div className="pointer-events-auto flex min-w-0 items-center justify-between gap-3 px-3 py-3 md:px-6">
        <p className="min-w-0 shrink font-mono text-[10px] tracking-[0.18em] break-words text-gold uppercase">
          {t.brand} · {t.branchControl}
        </p>
        <p className="hidden min-w-0 max-w-[42vw] text-center text-[10px] leading-snug break-words text-muted lg:block">
          {title}
        </p>
        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            onClick={toggle}
            title={t.translateHint}
            className="rounded-full border border-line bg-panel/80 px-3 py-1.5 text-[11px] font-semibold tracking-[0.14em] text-cyan uppercase"
          >
            {t.translate}
          </button>
          <LiveCta className="!px-4 !py-1.5 text-[11px]" />
        </div>
      </div>
      <div className="h-px w-full bg-line">
        <motion.div className="h-px bg-gold" style={{ width: `${Math.round(progress * 100)}%` }} />
      </div>
      <div
        data-chrome
        className="pointer-events-auto fixed inset-x-0 bottom-0 flex min-w-0 items-center justify-between gap-2 px-3 py-3 md:px-6"
      >
        <button
          type="button"
          onClick={onPrev}
          className="shrink-0 rounded-full border border-line bg-panel/80 px-4 py-2 text-sm"
        >
          {t.prev}
        </button>
        <div className="flex max-w-[min(640px,58vw)] flex-wrap items-center justify-center gap-1">
          {Array.from({ length: total }, (_, dot) => (
            <button
              key={dot}
              type="button"
              aria-label={`${t.slideOf} ${dot + 1}`}
              onClick={() => onJump(dot)}
              className={`h-2 rounded-full transition-all ${dot === index ? 'w-5 bg-gold' : 'w-2 bg-white/25'}`}
            />
          ))}
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <span className="font-mono text-[11px] text-muted">
            {index + 1}/{total}
          </span>
          <button
            type="button"
            onClick={onNext}
            className="rounded-full bg-aj px-4 py-2 text-sm font-semibold text-white"
          >
            {locale === 'he' ? '← ' : ''}
            {t.next}
            {locale === 'en' ? ' →' : ''}
          </button>
        </div>
      </div>
    </div>
  )
}
