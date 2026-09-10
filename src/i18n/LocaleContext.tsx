import { copy, type Locale } from '@/i18n/copy.ts'
import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'

type LocaleContextValue = {
  locale: Locale
  t: (typeof copy)[Locale]
  toggle: () => void
}

const LocaleContext = createContext<LocaleContextValue | null>(null)

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>('he')

  useEffect(() => {
    document.documentElement.lang = locale === 'he' ? 'he' : 'en'
    document.documentElement.dir = locale === 'he' ? 'rtl' : 'ltr'
  }, [locale])

  const value = useMemo(
    () => ({
      locale,
      t: copy[locale],
      toggle: () => setLocale((current) => (current === 'he' ? 'en' : 'he')),
    }),
    [locale],
  )

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
}

export function useLocale() {
  const context = useContext(LocaleContext)
  if (!context) {
    throw new Error('useLocale must be used inside LocaleProvider')
  }
  return context
}
