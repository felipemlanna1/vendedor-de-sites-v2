import { useTranslation } from 'react-i18next'
import { motion } from 'motion/react'

export default function LanguageToggle({ className = '' }) {
  const { i18n } = useTranslation()
  const isEN = i18n.language === 'en'

  const toggle = () => i18n.changeLanguage(isEN ? 'pt-BR' : 'en')

  return (
    <button
      onClick={toggle}
      aria-label={isEN ? 'Mudar para Português' : 'Switch to English'}
      className={`relative flex items-center gap-1.5 text-sm font-medium font-body px-3 py-2 rounded-full hover:bg-[var(--color-border-light)] transition-colors duration-300 ${className}`}
    >
      <span
        className={
          isEN
            ? 'text-[var(--color-text-secondary)]'
            : 'text-[var(--color-text-primary)]'
        }
      >
        PT
      </span>
      <div className="w-10 h-5 bg-[var(--color-border)] rounded-full relative mx-1">
        <motion.div
          className="w-4 h-4 rounded-full bg-[var(--color-primary)] absolute top-0.5"
          animate={{ left: isEN ? '22px' : '2px' }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        />
      </div>
      <span
        className={
          isEN
            ? 'text-[var(--color-text-primary)]'
            : 'text-[var(--color-text-secondary)]'
        }
      >
        EN
      </span>
    </button>
  )
}
