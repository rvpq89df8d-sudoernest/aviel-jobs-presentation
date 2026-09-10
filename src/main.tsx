import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { UiMotionRoot } from './lib/motion/UiMotionRoot.tsx'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <UiMotionRoot>
      <App />
    </UiMotionRoot>
  </StrictMode>,
)
