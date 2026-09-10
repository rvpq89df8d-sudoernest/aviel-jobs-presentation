import { LIVE_URL } from '@/i18n/copy.ts'
import { useLocale } from '@/i18n/LocaleContext.tsx'
import { motion } from 'framer-motion'

type LiveCtaProps = {
  className?: string
}

export function LiveCta({ className = '' }: LiveCtaProps) {
  const { t } = useLocale()

  return (
    <motion.a
      href={LIVE_URL}
      target="_blank"
      rel="noreferrer"
      className={`inline-flex items-center justify-center rounded-full bg-aj px-6 py-3 text-sm font-bold text-white shadow-[0_0_32px_rgba(29,78,216,0.55)] ${className}`}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.98 }}
      animate={{
        boxShadow: [
          '0 0 18px rgba(29,78,216,0.35)',
          '0 0 36px rgba(126,224,242,0.55)',
          '0 0 18px rgba(29,78,216,0.35)',
        ],
      }}
      transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
    >
      {t.live}
    </motion.a>
  )
}

export function BrandMark({ light = false }: { light?: boolean }) {
  return (
    <div className="flex items-center gap-1">
      <span
        className={`rounded-lg px-2.5 py-1 text-sm font-bold ${
          light ? 'bg-white text-sky-600 shadow-sm' : 'bg-white/95 text-sky-600'
        }`}
      >
        Aviel
      </span>
      <span className="rounded-lg bg-slate-900 px-2.5 py-1 text-sm font-bold text-white">Jobs</span>
    </div>
  )
}

export function BlurStat({ className = '' }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={`inline-block select-none blur-[7px] ${className}`}
    >
      ███
    </span>
  )
}
