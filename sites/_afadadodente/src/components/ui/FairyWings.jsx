import { motion } from 'motion/react'

// Asas de fada que emolduram conteudo — usadas na secao Impact
export default function FairyWings({ children, className = '' }) {
  return (
    <div className={`relative inline-flex items-center justify-center ${className}`}>
      {/* Asa esquerda */}
      <motion.svg
        viewBox="0 0 120 200"
        className="absolute -left-16 md:-left-24 top-1/2 -translate-y-1/2 w-16 md:w-24 h-auto"
        animate={{ scaleX: [1, 1.05, 1], opacity: [0.2, 0.35, 0.2] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden="true"
      >
        <path
          d="M110 100 C80 40, 20 10, 10 60 C0 100, 30 110, 50 100 C30 120, 0 150, 10 170 C20 190, 70 160, 110 100Z"
          fill="var(--color-primary-light)"
          opacity="0.3"
        />
        <path
          d="M110 100 C85 55, 35 30, 25 65 C35 90, 55 95, 65 90"
          fill="none"
          stroke="var(--color-primary)"
          strokeWidth="0.8"
          opacity="0.3"
        />
        <path
          d="M110 100 C90 120, 40 140, 30 155 C50 145, 80 120, 90 105"
          fill="none"
          stroke="var(--color-primary)"
          strokeWidth="0.8"
          opacity="0.25"
        />
      </motion.svg>

      {/* Asa direita */}
      <motion.svg
        viewBox="0 0 120 200"
        className="absolute -right-16 md:-right-24 top-1/2 -translate-y-1/2 w-16 md:w-24 h-auto"
        style={{ transform: 'translateY(-50%) scaleX(-1)' }}
        animate={{ scaleX: [-1, -1.05, -1], opacity: [0.2, 0.35, 0.2] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
        aria-hidden="true"
      >
        <path
          d="M110 100 C80 40, 20 10, 10 60 C0 100, 30 110, 50 100 C30 120, 0 150, 10 170 C20 190, 70 160, 110 100Z"
          fill="var(--color-primary-light)"
          opacity="0.3"
        />
        <path
          d="M110 100 C85 55, 35 30, 25 65 C35 90, 55 95, 65 90"
          fill="none"
          stroke="var(--color-primary)"
          strokeWidth="0.8"
          opacity="0.3"
        />
        <path
          d="M110 100 C90 120, 40 140, 30 155 C50 145, 80 120, 90 105"
          fill="none"
          stroke="var(--color-primary)"
          strokeWidth="0.8"
          opacity="0.25"
        />
      </motion.svg>

      {children}
    </div>
  )
}
