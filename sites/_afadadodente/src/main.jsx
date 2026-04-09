// i18n DEVE ser importado ANTES do App (armadilha react-i18next)
import './i18n/index.js'

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import App from './App.jsx'
import './index.css'

// Fontes @fontsource-variable
import '@fontsource-variable/fredoka'
import '@fontsource-variable/quicksand'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </StrictMode>
)
