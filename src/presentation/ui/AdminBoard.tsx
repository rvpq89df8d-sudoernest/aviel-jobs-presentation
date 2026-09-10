import { adminRows, adminRowsEn } from '@/i18n/copy.ts'
import { useLocale } from '@/i18n/LocaleContext.tsx'
import { BlurStat, BrandMark } from '@/presentation/ui/LiveCta.tsx'
import { motion } from 'framer-motion'

export function AdminBoard() {
  const { locale, t } = useLocale()
  const rows = locale === 'he' ? adminRows : adminRowsEn

  return (
    <div className="mx-auto h-full max-w-3xl overflow-x-visible overflow-y-auto rounded-[28px] bg-gradient-to-b from-sky-50 to-white p-6 text-slate-800 shadow-[0_30px_80px_rgba(0,0,0,0.28)]">
      <div className="flex items-center justify-between">
        <BrandMark light />
        <div className="flex gap-2 text-xs">
          <a href="https://www.avieljobs.co.il/" target="_blank" rel="noreferrer" className="rounded-xl bg-white px-3 py-2 text-aj">
            {t.openSite}
          </a>
          <span className="rounded-xl bg-white px-3 py-2">{t.logout}</span>
        </div>
      </div>
      <h3 className="mt-6 text-center text-2xl font-extrabold tracking-wide text-aj">{t.adminTitle}</h3>
      <p className="mt-1 text-center text-sm text-slate-500">{t.adminSub}</p>
      <div className="mt-5 overflow-hidden rounded-2xl border border-sky-100">
        {rows.map((row, index) => (
          <motion.div
            key={row}
            className={`flex min-w-0 items-center justify-between gap-3 px-4 py-2.5 text-sm ${
              index % 2 === 0 ? 'bg-sky-50/80' : 'bg-white'
            }`}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.04 * index, duration: 0.35 }}
          >
            <span className="min-w-0 font-medium break-words">{row}</span>
            <div className="flex shrink-0 items-center gap-3">
              <BlurStat className="select-none blur-[8px]" />
              {index < 10 ? (
                <span className="rounded-lg bg-aj px-3 py-1 text-xs font-bold text-white">{t.add}</span>
              ) : null}
              <span className="rounded-lg border border-aj px-3 py-1 text-xs text-aj">{t.edit}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
