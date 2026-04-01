import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import ptBR from './pt-BR.json'
import en from './en.json'

const saved = typeof window !== 'undefined' ? localStorage.getItem('i18nextLng') : null
const params = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : null
const lng = params?.get('lng') || saved || 'pt-BR'

i18n
  .use(initReactI18next)
  .init({
    resources: {
      'pt-BR': { translation: ptBR },
      en: { translation: en }
    },
    lng,
    fallbackLng: 'pt-BR',
    interpolation: { escapeValue: false }
  })

// Save language choice
i18n.on('languageChanged', (lng) => {
  localStorage.setItem('i18nextLng', lng)
})

export default i18n
