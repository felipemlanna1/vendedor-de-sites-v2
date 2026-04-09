import { motion } from 'motion/react'

// Dente com asas — icone classico de fada do dente
function WingedTooth({ className = '' }) {
  return (
    <svg viewBox="0 0 64 64" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Asas esquerda */}
      <path d="M12 22c-6-2-10 3-8 8s6 6 10 4" stroke="var(--color-primary-light)" strokeWidth="1.5" fill="var(--color-primary-light)" opacity="0.3" />
      <path d="M14 26c-4-1-6 2-5 5s4 4 6 2" stroke="var(--color-primary-light)" strokeWidth="1" fill="var(--color-primary-light)" opacity="0.2" />
      {/* Asas direita */}
      <path d="M52 22c6-2 10 3 8 8s-6 6-10 4" stroke="var(--color-primary-light)" strokeWidth="1.5" fill="var(--color-primary-light)" opacity="0.3" />
      <path d="M50 26c4-1 6 2 5 5s-4 4-6 2" stroke="var(--color-primary-light)" strokeWidth="1" fill="var(--color-primary-light)" opacity="0.2" />
      {/* Dente */}
      <path d="M24 20c0-6 4-10 8-10s8 4 8 10c0 4-1 12-2 18-1 4-2 6-3 6s-1.5-2-3-6-3-6-3-6-2-14 2-18c-1-6-5-12-7-12z" fill="var(--color-surface)" stroke="var(--color-primary)" strokeWidth="1.5" />
      {/* Brilho no dente */}
      <ellipse cx="29" cy="22" rx="2" ry="3" fill="white" opacity="0.5" />
      {/* Sorriso */}
      <path d="M29 28c1 1.5 3 1.5 4 0" stroke="var(--color-primary)" strokeWidth="1" strokeLinecap="round" fill="none" />
      {/* Olhos */}
      <circle cx="29" cy="24" r="1" fill="var(--color-primary-dark)" />
      <circle cx="35" cy="24" r="1" fill="var(--color-primary-dark)" />
    </svg>
  )
}

// Varinha magica com estrela
function MagicWand({ className = '' }) {
  return (
    <svg viewBox="0 0 48 48" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Vareta */}
      <line x1="12" y1="40" x2="30" y2="18" stroke="var(--color-accent)" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="12" y1="40" x2="30" y2="18" stroke="var(--color-primary-light)" strokeWidth="1" strokeLinecap="round" opacity="0.5" />
      {/* Estrela na ponta */}
      <polygon points="30,8 32,14 38,15 33,19 34,25 30,21 26,25 27,19 22,15 28,14" fill="var(--color-accent)" />
      {/* Brilhos ao redor */}
      <circle cx="36" cy="10" r="1" fill="var(--color-accent)" opacity="0.6" />
      <circle cx="24" cy="10" r="0.8" fill="var(--color-secondary)" opacity="0.5" />
      <circle cx="34" cy="22" r="0.8" fill="var(--color-accent)" opacity="0.4" />
    </svg>
  )
}

// Estrela de 4 pontas (sparkle)
function FourPointStar({ className = '' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="var(--color-accent)" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 0c0 0 2 8 4 10s8 2 8 2-8 2-10 4-2 8-2 8-2-8-4-10S0 12 0 12s8-2 10-4 2-8 2-8z" opacity="0.5" />
    </svg>
  )
}

// Coroa
function TinyCrown({ className = '' }) {
  return (
    <svg viewBox="0 0 32 24" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2 20L6 6l6 8 6-12 6 12 6-8-4 14z" fill="var(--color-accent)" opacity="0.35" />
      <rect x="2" y="20" width="28" height="3" rx="1" fill="var(--color-accent)" opacity="0.4" />
    </svg>
  )
}

const elements = [
  { Component: WingedTooth, x: '5%', y: '15%', size: 50, delay: 0, duration: 18 },
  { Component: MagicWand, x: '88%', y: '25%', size: 38, delay: 2, duration: 22 },
  { Component: FourPointStar, x: '92%', y: '55%', size: 20, delay: 4, duration: 15 },
  { Component: TinyCrown, x: '8%', y: '45%', size: 30, delay: 3, duration: 20 },
  { Component: FourPointStar, x: '15%', y: '70%', size: 16, delay: 1, duration: 17 },
  { Component: WingedTooth, x: '85%', y: '78%', size: 42, delay: 5, duration: 19 },
  { Component: MagicWand, x: '12%', y: '88%', size: 32, delay: 6, duration: 21 },
  { Component: FourPointStar, x: '78%', y: '10%', size: 18, delay: 1.5, duration: 16 },
  { Component: TinyCrown, x: '50%', y: '35%', size: 24, delay: 4.5, duration: 23 },
  { Component: FourPointStar, x: '70%', y: '92%', size: 14, delay: 7, duration: 14 },
]

export default function FloatingFairyElements() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {elements.map((el, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{ left: el.x, top: el.y, width: el.size, height: el.size }}
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0, 0.35, 0.2, 0.35, 0],
            y: [0, -30, -10, -25, 0],
            rotate: [0, 10, -5, 8, 0],
          }}
          transition={{
            duration: el.duration,
            delay: el.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <el.Component className="w-full h-full" />
        </motion.div>
      ))}
    </div>
  )
}
