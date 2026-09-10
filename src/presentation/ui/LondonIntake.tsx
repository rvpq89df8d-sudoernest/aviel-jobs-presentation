import { useLocale } from '@/i18n/LocaleContext.tsx'
import { BlurStat } from '@/presentation/ui/LiveCta.tsx'

type LondonIntakeProps = {
  showFile?: boolean
  assigned?: boolean
}

export function LondonIntake({ showFile = false, assigned = false }: LondonIntakeProps) {
  const { locale, t } = useLocale()

  return (
    <div className="grid h-full min-w-0 grid-cols-1 gap-4 lg:grid-cols-2">
      <article className="mx-auto flex w-full min-w-0 max-w-[260px] flex-col rounded-[36px] border border-line bg-panel p-4">
        <p className="text-center text-xs text-muted">{t.intakePhone}</p>
        <div className="mt-3 flex-1 rounded-[28px] bg-[#0b1220] p-4 text-sm">
          <p className="text-cyan">{t.intakeCity}</p>
          <p className="mt-2 font-semibold">{t.intakeName}</p>
          <p className="mt-3 text-muted">{t.thinkBody}</p>
          <div className="mt-6 space-y-2">
            <div className="rounded-xl bg-white/5 px-3 py-2">{t.intakeApply}</div>
            <div className="rounded-xl bg-aj px-3 py-2 text-center font-bold">{t.intakeBook}</div>
          </div>
        </div>
      </article>

      <div className="min-w-0 rounded-[28px] border border-line bg-panel p-5">
        <div
          data-recordly-target="candidate-file"
          className={`rounded-2xl border px-4 py-3 ${showFile ? 'border-cyan bg-cyan/10' : 'border-line'}`}
        >
          <p className="text-sm text-muted">{t.intakeFile}</p>
          <p className="mt-1 font-semibold">{t.intakeName}</p>
          <p className="text-xs text-muted">
            {t.intakeCity} · {locale === 'he' ? 'טלפון' : 'Phone'} <BlurStat />
          </p>
        </div>
        <div className="mt-4 rounded-2xl border border-line px-4 py-3">
          <p className="text-sm text-muted">{t.intakeAssign}</p>
          <p className="mt-1 font-semibold">
            {locale === 'he' ? 'סניף מערב לונדון' : 'West London branch'}
          </p>
          {assigned ? (
            <p className="mt-3 rounded-xl bg-emerald-500/15 px-3 py-2 text-sm text-emerald-300">{t.intakeSynced}</p>
          ) : (
            <p className="mt-3 text-sm text-muted">{t.crmWebhook}</p>
          )}
        </div>
      </div>
    </div>
  )
}
