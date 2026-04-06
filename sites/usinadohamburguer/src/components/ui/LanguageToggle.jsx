import { useTranslation } from 'react-i18next'
import { motion } from 'motion/react'

export default function LanguageToggle({ className = '' }) {
  const { i18n } = useTranslation()
  const isEN = i18n.language === 'en'
  const toggle = () => i18n.changeLanguage(isEN ? 'pt-BR' : 'en')
  return (
    <button
      onClick={toggle}
      aria-label={isEN ? 'Mudar para Portugues' : 'Switch to English'}
      data-hover="true"
      className={`relative flex items-center gap-1.5 text-sm font-bold cursor-pointer px-3 py-2 rounded-full bg-white/15 hover:bg-white/25 transition-colors min-h-[44px] min-w-[88px] ${className}`}
    >
      <span style={{ color: isEN ? 'rgba(255,255,255,0.4)' : '#D4A017' }}>PT</span>
      <div className="w-10 h-5 bg-white/20 rounded-full relative mx-0.5">
        <motion.div
          className="w-4 h-4 rounded-full bg-[var(--color-primary)] absolute top-0.5"
          animate={{ left: isEN ? '22px' : '2px' }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        />
      </div>
      <span style={{ color: isEN ? '#D4A017' : 'rgba(255,255,255,0.4)' }}>EN</span>
    </button>
  )
}
