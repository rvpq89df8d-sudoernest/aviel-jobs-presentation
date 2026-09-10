import { useLocale } from '@/i18n/LocaleContext.tsx'
import { chatScript } from '@/presentation/data/content.ts'
import { BlurStat } from '@/presentation/ui/LiveCta.tsx'
import { motion } from 'framer-motion'

type DarkCrmProps = {
  highlightLead?: boolean
  synced?: boolean
}

export function DarkCrm({ highlightLead = false, synced = false }: DarkCrmProps) {
  const { locale, t } = useLocale()
  const messages = chatScript[locale]
  const leads =
    locale === 'he'
      ? ['ליד חדש · וואטסאפ', 'סניף צפון · ממתין', 'סניף מרכז · בטיפול']
      : ['New lead · WhatsApp', 'North cell · waiting', 'Center cell · in progress']
  const columns =
    locale === 'he' ? ['חדש', 'בטיפול', 'נסגר'] : ['New', 'Working', 'Closed']

  return (
    <div className="flex h-full min-w-0 overflow-x-visible overflow-y-auto rounded-[28px] bg-[#12151c] text-zinc-100 shadow-[0_24px_60px_rgba(0,0,0,0.4)]">
      <section className="w-[min(16rem,28%)] shrink-0 border-e border-white/10 p-4">
        <p className="text-sm font-semibold text-cyan">{t.crmKanban}</p>
        <div className="mt-3 grid gap-2">
          {columns.map((column, index) => (
            <div key={column} className="rounded-2xl bg-white/5 p-2">
              <p className="px-2 text-[11px] text-zinc-400">{column}</p>
              {index === 0 ? (
                <div
                  data-recordly-target="crm-lead"
                  className={`mt-2 rounded-xl px-3 py-2 text-sm ${
                    highlightLead ? 'bg-cyan/20 ring-2 ring-cyan' : 'bg-white/5'
                  }`}
                >
                  {leads[0]}
                </div>
              ) : (
                <div className="mt-2 rounded-xl bg-white/5 px-3 py-2 text-sm text-zinc-400">{leads[index]}</div>
              )}
            </div>
          ))}
        </div>
        {synced ? (
          <motion.p
            className="mt-4 rounded-xl bg-emerald-500/15 px-3 py-2 text-xs text-emerald-300"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {t.crmWebhook} → {t.crmWarehouse}
          </motion.p>
        ) : null}
      </section>

      <section className="flex min-w-0 w-[44%] flex-col bg-[#0e1116]">
        <header className="flex items-center justify-between border-b border-white/10 px-4 py-3">
          <p className="font-semibold">{t.crmChat}</p>
          <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-[11px] text-emerald-400">{t.crmConnected}</span>
        </header>
        <div className="flex-1 space-y-3 overflow-x-visible p-4">
          {messages.map((message) => (
            <div
              key={message.text}
              className={`max-w-[92%] rounded-2xl px-3 py-2 text-sm leading-relaxed break-words ${
                message.from === 'ai' ? 'ms-auto bg-[#075e54] text-white' : 'bg-[#2a3344] text-zinc-100'
              }`}
            >
              {message.text}
              <p className="mt-1 text-[10px] text-white/50">✓✓</p>
            </div>
          ))}
        </div>
        <div className="flex gap-2 border-t border-white/10 p-3">
          <div className="flex-1 rounded-full bg-white/5 px-4 py-2 text-sm text-zinc-500">{t.write}</div>
          <span className="rounded-full bg-aj px-4 py-2 text-sm font-bold">{t.send}</span>
        </div>
      </section>

      <section className="flex min-w-0 w-[28%] flex-col p-5">
        <p className="self-start text-sm font-semibold">{t.crmProfile}</p>
        <span className="mt-6 grid size-16 place-items-center rounded-full bg-aj text-lg font-bold">A</span>
        <p className="mt-3 font-semibold">{locale === 'he' ? 'מועמד/ת' : 'Candidate'}</p>
        <p className="text-xs text-zinc-400">
          {locale === 'he' ? 'טלפון' : 'Phone'} <BlurStat />
        </p>
        <div className="mt-6 w-full space-y-2 text-sm">
          <div className="rounded-xl bg-white/5 px-3 py-2">{t.vacancies}</div>
          <div className="rounded-xl bg-white/5 px-3 py-2">{t.addCandidate}</div>
          <div className="rounded-xl bg-white/5 px-3 py-2">{t.metricConsult}</div>
        </div>
        <p className="mt-auto text-center text-[10px] leading-relaxed text-zinc-500">{t.crmFooter}</p>
      </section>
    </div>
  )
}
