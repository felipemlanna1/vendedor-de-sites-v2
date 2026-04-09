import { useTranslation } from 'react-i18next'
import { motion } from 'motion/react'

export default function LanguageToggle({ className = '' }) {
  const { i18n } = useTranslation()
  const isEN = i18n.language === 'en'
  const toggle = () => i18n.changeLanguage(isEN ? 'pt-BR' : 'en')
  return (
    <button
      onClick={toggle}
      className={`relative flex items-center gap-2 text-sm font-medium min-h-[48px] px-4 py-2 rounded-full ${className}`}
      style={{ backgroundColor: '#333333', padding: '8px 16px' }}
      aria-label={isEN ? 'Mudar para Portugues' : 'Switch to English'}
    >
      <span style={{ color: isEN ? '#999' : '#FAFAF5', backgroundColor: '#333333' }}>PT</span>
      <div className="w-10 h-5 rounded-full relative mx-1" style={{ backgroundColor: '#555' }}>
        <motion.div
          className="w-4 h-4 rounded-full absolute top-0.5"
          style={{ backgroundColor: '#D4A017' }}
          animate={{ left: isEN ? '22px' : '2px' }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        />
      </div>
      <span style={{ color: isEN ? '#FAFAF5' : '#999', backgroundColor: '#333333' }}>EN</span>
    </button>
  )
}
