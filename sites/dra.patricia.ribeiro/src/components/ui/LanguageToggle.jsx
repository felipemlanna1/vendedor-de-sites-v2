import { useTranslation } from 'react-i18next'

export default function LanguageToggle({ className = '' }) {
  const { i18n } = useTranslation()
  const isEN = i18n.language === 'en'
  const toggle = () => i18n.changeLanguage(isEN ? 'pt-BR' : 'en')

  return (
    <button
      onClick={toggle}
      className={`text-sm font-semibold cursor-pointer px-3 py-2.5 rounded-lg transition-colors hover:bg-[var(--color-accent)]/10 min-w-[44px] min-h-[44px] flex items-center justify-center text-[var(--color-text-secondary)] ${className}`}
      aria-label={isEN ? 'Mudar para Português' : 'Switch to English'}
    >
      {isEN ? 'PT' : 'EN'}
    </button>
  )
}
