import { useTranslation } from 'react-i18next'
import { motion } from 'motion/react'

export default function LanguageToggle({ variant = 'light' }) {
  const { i18n } = useTranslation()
  const isEN = i18n.language === 'en'
  const toggle = () => i18n.changeLanguage(isEN ? 'pt-BR' : 'en')

  // Light variant: for dark backgrounds (navbar). Dark variant: for light backgrounds.
  const textActive = variant === 'light' ? 'text-[var(--color-background)]' : 'text-[var(--color-text-primary)]'
  const textInactive = variant === 'light' ? 'text-[var(--color-background)]/50' : 'text-[var(--color-text-muted)]'
  const trackBg = variant === 'light' ? 'bg-[var(--color-primary-dark)]' : 'bg-[var(--color-surface)]'

  return (
    <button
      onClick={toggle}
      aria-label={isEN ? 'Mudar para Portugues' : 'Switch to English'}
      data-testid="language-toggle"
      className="relative flex items-center gap-1.5 text-sm font-medium py-2.5 px-3.5 min-h-[44px]"
    >
      <span className={isEN ? textInactive : textActive}>
        PT
      </span>
      <div className={`w-10 h-5 ${trackBg} rounded-full relative mx-1`}>
        <motion.div
          className="w-4 h-4 rounded-full bg-[var(--color-accent)] absolute top-0.5"
          animate={{ left: isEN ? '22px' : '2px' }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        />
      </div>
      <span className={isEN ? textActive : textInactive}>
        EN
      </span>
    </button>
  )
}
