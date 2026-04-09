import { useTranslation } from 'react-i18next'
import { motion } from 'motion/react'

export default function LanguageToggle({ className = '' }) {
  const { i18n } = useTranslation()
  const isEN = i18n.language === 'en'
  const toggle = () => i18n.changeLanguage(isEN ? 'pt-BR' : 'en')
  return (
    <button onClick={toggle} className={`relative flex items-center gap-1.5 text-sm font-semibold cursor-pointer px-4 py-2.5 rounded-full hover:bg-[var(--color-primary)]/5 transition-colors ${className}`} aria-label="Toggle language">
      <span className={isEN ? 'text-[var(--color-text-secondary)]' : 'text-[var(--color-text-primary)]'}>PT</span>
      <div className="w-10 h-5 bg-[var(--color-background)] rounded-full relative border border-[var(--color-text-muted)]/30">
        <motion.div
          className="w-4 h-4 rounded-full bg-[var(--color-primary)] absolute top-0.5"
          animate={{ left: isEN ? '22px' : '2px' }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        />
      </div>
      <span className={isEN ? 'text-[var(--color-text-primary)]' : 'text-[var(--color-text-secondary)]'}>EN</span>
    </button>
  )
}
