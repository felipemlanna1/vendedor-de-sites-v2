import { useTranslation } from 'react-i18next'
import { motion } from 'motion/react'

export default function LanguageToggle({ className = '' }) {
  const { i18n } = useTranslation()
  const isEN = i18n.language === 'en'
  const toggle = () => i18n.changeLanguage(isEN ? 'pt-BR' : 'en')
  return (
    <button
      onClick={toggle}
      className={`relative flex items-center gap-1.5 text-sm font-medium cursor-pointer px-3 py-2 rounded-full hover:bg-[var(--color-primary-light)]/10 transition-colors min-h-[44px] min-w-[44px] ${className}`}
      aria-label="Toggle language"
    >
      <span className={`text-sm ${isEN ? 'text-[var(--color-text-secondary)]' : 'text-[var(--color-text-primary)] font-semibold'}`}>PT</span>
      <div className="w-10 h-5 bg-[var(--color-primary-light)]/20 rounded-full relative mx-0.5 border border-[var(--color-primary-light)]/30">
        <motion.div
          className="w-4 h-4 rounded-full bg-[var(--color-secondary)] absolute top-0.5"
          animate={{ left: isEN ? '22px' : '2px' }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        />
      </div>
      <span className={`text-sm ${isEN ? 'text-[var(--color-text-primary)] font-semibold' : 'text-[var(--color-text-secondary)]'}`}>EN</span>
    </button>
  )
}
