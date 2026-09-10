import { LocaleProvider } from '@/i18n/LocaleContext.tsx'
import Presentation from '@/presentation/Presentation.tsx'

export default function App() {
  return (
    <LocaleProvider>
      <Presentation />
    </LocaleProvider>
  )
}
