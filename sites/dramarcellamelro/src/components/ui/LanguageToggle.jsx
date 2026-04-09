import { useTranslation } from 'react-i18next'

export default function LanguageToggle({ className = '' }) {
  const { i18n } = useTranslation()
  const currentLang = i18n.language?.startsWith('pt') ? 'pt-BR' : 'en'
  const isPT = currentLang === 'pt-BR'

  return (
    <button
      onClick={() => i18n.changeLanguage(isPT ? 'en' : 'pt-BR')}
      aria-label={isPT ? 'Switch to English' : 'Mudar para Português'}
      className={`px-3 py-2 text-sm font-medium rounded-full border border-[var(--color-text-muted)]/30 transition-colors duration-200 hover:bg-[var(--color-surface)] ${className}`}
    >
      {isPT ? 'PT' : 'EN'}
    </button>
  )
}
