import { useTranslation } from 'react-i18next'

export default function LanguageToggle({ className = '' }) {
  const { i18n } = useTranslation()
  const isEN = i18n.language === 'en'
  const toggle = () => i18n.changeLanguage(isEN ? 'pt-BR' : 'en')

  return (
    <button
      onClick={toggle}
      className={`relative z-10 inline-flex items-center gap-1 font-body font-semibold text-sm cursor-pointer px-4 py-2.5 rounded-full bg-[var(--color-surface)] border border-[var(--color-primary)]/20 hover:bg-[var(--color-primary-light)]/30 transition-colors min-h-[44px] min-w-[70px] justify-center shadow-[var(--shadow-sm)] ${className}`}
      aria-label={isEN ? 'Mudar para Português' : 'Switch to English'}
      type="button"
    >
      <span className={isEN ? 'text-[var(--color-text-secondary)]' : 'font-bold text-[var(--color-primary-dark)]'}>PT</span>
      <span className="text-[var(--color-text-secondary)]">/</span>
      <span className={isEN ? 'font-bold text-[var(--color-primary-dark)]' : 'text-[var(--color-text-secondary)]'}>EN</span>
    </button>
  )
}
