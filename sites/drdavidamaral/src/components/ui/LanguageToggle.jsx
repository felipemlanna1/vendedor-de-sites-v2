import { useTranslation } from 'react-i18next'
import { motion } from 'motion/react'

export default function LanguageToggle({ className = '' }) {
  const { i18n } = useTranslation()
  const isEN = i18n.language === 'en'

  const toggle = () => i18n.changeLanguage(isEN ? 'pt-BR' : 'en')

  return (
    <button
      onClick={toggle}
      className={`relative flex items-center gap-1 text-sm font-medium cursor-pointer px-3 py-2 min-h-[44px] ${className}`}
      aria-label={isEN ? 'Mudar para Português' : 'Switch to English'}
      data-language-toggle="true"
    >
      <span className={isEN ? 'text-text-secondary' : 'text-text-primary'}>PT</span>
      <div className="w-10 h-5 bg-surface rounded-full relative mx-1">
        <motion.div
          className="w-4 h-4 rounded-full bg-primary absolute top-0.5"
          animate={{ left: isEN ? '22px' : '2px' }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        />
      </div>
      <span className={isEN ? 'text-text-primary' : 'text-text-secondary'}>EN</span>
    </button>
  )
}
