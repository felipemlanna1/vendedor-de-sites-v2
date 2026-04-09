import { useTranslation } from 'react-i18next'
import { motion } from 'motion/react'

export default function LanguageToggle({ className = '' }) {
  const { i18n } = useTranslation()
  const isEN = i18n.language === 'en'
  const toggle = () => i18n.changeLanguage(isEN ? 'pt-BR' : 'en')

  return (
    <button
      onClick={toggle}
      className={`relative flex items-center gap-1.5 text-sm tracking-widest uppercase font-medium min-h-[44px] min-w-[80px] ${className}`}
      style={{ padding: '10px 14px' }}
      aria-label={isEN ? 'Mudar para Portugu\u00eas' : 'Switch to English'}
    >
      <span className={isEN ? 'opacity-40' : 'text-[var(--carvao)]'}>PT</span>
      <div className="w-9 h-[18px] bg-[var(--pergaminho)] rounded-full relative mx-0.5">
        <motion.div
          className="w-3.5 h-3.5 rounded-full bg-[var(--terracota)] absolute top-[2px]"
          animate={{ left: isEN ? '18px' : '2px' }}
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        />
      </div>
      <span className={isEN ? 'text-[var(--carvao)]' : 'opacity-40'}>EN</span>
    </button>
  )
}
