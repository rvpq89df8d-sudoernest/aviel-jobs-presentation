import { useLocale } from '@/i18n/LocaleContext.tsx'
import { consultRows } from '@/presentation/data/content.ts'
import { BrandMark } from '@/presentation/ui/LiveCta.tsx'
import { motion } from 'framer-motion'

type ConsultingTableProps = {
  highlightRow?: boolean
  zoomed?: boolean
}

export function ConsultingTable({ highlightRow = false, zoomed = false }: ConsultingTableProps) {
  const { locale, t } = useLocale()
  const rows = consultRows[locale]
  const dates = ['02/02/2025', '08/08/2024', '12/11/2024', '03/03/2025']

  return (
    <div
      className={`flex h-full min-w-0 overflow-x-visible overflow-y-auto rounded-[28px] bg-[#f4f7fb] text-slate-800 shadow-[0_24px_60px_rgba(0,0,0,0.28)] transition-transform duration-700 ${
        zoomed ? 'scale-[1.06]' : ''
      }`}
    >
      <aside className="w-[min(10.5rem,30%)] shrink-0 border-e border-slate-200 bg-[#e8eef8] p-3">
        <BrandMark light />
        <div className="mt-6 space-y-2 text-sm">
          <div className="break-words rounded-xl px-3 py-2 text-slate-500">{t.jobs}</div>
          <div className="break-words rounded-xl px-3 py-2 text-slate-500">{t.candidates}</div>
          <div className="break-words rounded-xl bg-sky-100 px-3 py-2 font-semibold text-aj">{t.consultTable}</div>
        </div>
      </aside>
      <div className="flex min-w-0 flex-1 flex-col p-4 md:p-5">
        <p className="text-sm text-slate-500">{t.dashWelcome}</p>
        <div className="mt-2 flex flex-wrap items-end justify-between gap-2">
          <h3 className="text-xl font-bold break-words text-aj md:text-2xl">{t.consultTable}</h3>
          <span className="rounded-full bg-rose-500 px-2 py-0.5 text-[11px] font-bold text-white">3 {t.newBadge}</span>
        </div>
        <div className="mt-4 min-w-0 overflow-x-auto rounded-2xl bg-white">
          <div className="grid min-w-[640px] grid-cols-6 border-b border-slate-100 px-4 py-2 text-[11px] font-bold text-slate-400">
            <span>{t.number}</span>
            <span>{t.date}</span>
            <span>{t.category}</span>
            <span>{t.subcat}</span>
            <span>{locale === 'he' ? 'מטא' : 'Meta'}</span>
            <span />
          </div>
          {rows.map((row, index) => (
            <motion.div
              key={row.sub}
              data-recordly-target={index === 0 ? 'consult-row' : undefined}
              className={`grid min-w-[640px] grid-cols-6 items-center border-b border-slate-50 px-4 py-3 text-sm ${
                highlightRow && index === 0 ? 'bg-sky-100 ring-2 ring-aj' : ''
              }`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08 * index }}
            >
              <span>{index + 1}</span>
              <span>{dates[index]}</span>
              <span className="pe-2 break-words">{row.cat}</span>
              <span className="font-medium break-words">{row.sub}</span>
              <span className="text-xs text-slate-500">{row.meta}</span>
              <span className="flex justify-end gap-2 text-xs">
                <span className="text-aj">{t.edit}</span>
                <span className="text-rose-500">✕</span>
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
