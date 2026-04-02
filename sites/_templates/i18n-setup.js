// === i18n/index.js ===
// Copie este arquivo para sites/{lead_id}/src/i18n/index.js
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import ptBR from './pt-BR.json'
import en from './en.json'

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      'pt-BR': { translation: ptBR },
      en: { translation: en },
    },
    lng: 'pt-BR',
    fallbackLng: 'pt-BR',
    interpolation: { escapeValue: false },
    detection: {
      order: ['querystring', 'localStorage', 'navigator'],
      lookupQuerystring: 'lang',
      caches: ['localStorage'],
    },
  })

export default i18n

// === i18n/pt-BR.json — ESTRUTURA OBRIGATORIA ===
// Todas as chaves abaixo DEVEM existir e ser preenchidas com conteudo REAL do briefing.
// {
//   "nav": {
//     "home": "Inicio",
//     "about": "Sobre",
//     "services": "Servicos",
//     "testimonials": "Depoimentos",
//     "contact": "Contato",
//     "cta": "Agende Agora"
//   },
//   "hero": {
//     "title": "Texto principal do hero",
//     "subtitle": "Subtitulo do hero",
//     "cta": "Texto do botao CTA"
//   },
//   "about": {
//     "title": "Titulo da secao sobre",
//     "description": "Texto descritivo completo",
//     "credentials": "Credenciais e registro"
//   },
//   "services": {
//     "title": "Titulo da secao",
//     "items": {
//       "item1": { "name": "Nome", "description": "Descricao" },
//       "item2": { "name": "Nome", "description": "Descricao" }
//     }
//   },
//   "testimonials": {
//     "title": "Titulo",
//     "items": {
//       "t1": { "text": "Depoimento real", "author": "Nome", "platform": "Doctoralia" }
//     }
//   },
//   "contact": {
//     "title": "Entre em Contato",
//     "phone": "Telefone",
//     "email": "Email",
//     "address": "Endereco completo",
//     "hours": "Horario de funcionamento",
//     "whatsapp_cta": "Fale pelo WhatsApp"
//   },
//   "footer": {
//     "copyright": "2026 Nome. Todos os direitos reservados.",
//     "social": "Siga nas redes"
//   },
//   "lang": {
//     "pt": "Portugues",
//     "en": "English"
//   }
// }
//
// === i18n/en.json ===
// MESMA estrutura, traduzido naturalmente. Nomes proprios ficam em portugues.
