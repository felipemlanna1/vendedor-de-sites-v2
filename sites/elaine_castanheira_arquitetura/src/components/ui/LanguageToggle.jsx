import { useTranslation } from 'react-i18next'
import { motion } from 'motion/react'

export default function LanguageToggle({ className = '' }) {
  const { i18n } = useTranslation()
  const isEN = i18n.language === 'en'
  const toggle = () => i18n.changeLanguage(isEN ? 'pt-BR' : 'en')
  return (
    <button onClick={toggle} className={`relative flex items-center gap-2 text-sm font-medium cursor-pointer px-3 py-2.5 min-h-[44px] rounded-lg bg-[var(--color-background)]/80 backdrop-blur-sm hover:bg-[var(--color-surface)] transition-colors ${className}`} aria-label="Toggle language">
      <span className={isEN ? 'text-[var(--color-text-muted)]' : 'text-[var(--color-text-primary)]'}>PT</span>
      <div className="w-10 h-5 bg-[var(--color-surface)] rounded-full relative mx-1">
        <motion.div
          className="w-4 h-4 rounded-full bg-[var(--color-primary)] absolute top-0.5"
          animate={{ left: isEN ? '22px' : '2px' }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        />
      </div>
      <span className={isEN ? 'text-[var(--color-text-primary)]' : 'text-[var(--color-text-muted)]'}>EN</span>
    </button>
  )
}
