import { motion } from 'motion/react'

// SVG de fada voando com varinha — elemento assinatura unico da "Fada do Dente"
function Sparkle({ cx, cy, delay, size = 4 }) {
  return (
    <motion.circle
      cx={cx}
      cy={cy}
      r={size}
      fill="var(--color-accent)"
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: [0, 1, 0.8, 0],
        scale: [0, 1.2, 0.8, 0],
      }}
      transition={{
        duration: 2.4,
        delay,
        repeat: Infinity,
        repeatDelay: 1.5,
        ease: 'easeInOut',
      }}
    />
  )
}

function TrailDot({ cx, cy, delay }) {
  return (
    <motion.circle
      cx={cx}
      cy={cy}
      r={2}
      fill="var(--color-accent)"
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 0.7, 0] }}
      transition={{
        duration: 1.8,
        delay,
        repeat: Infinity,
        repeatDelay: 2,
      }}
    />
  )
}

export default function FairySignature({ className = '', size = 200 }) {
  return (
    <motion.svg
      viewBox="0 0 200 200"
      width={size}
      height={size}
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: 1.5 }}
      aria-hidden="true"
    >
      {/* Fairy body — graceful silhouette */}
      <motion.g
        animate={{ y: [0, -6, 0], rotate: [0, 2, -1, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      >
        {/* Wings */}
        <motion.ellipse
          cx="88" cy="80" rx="22" ry="30"
          fill="var(--color-primary-light)"
          opacity={0.35}
          transform="rotate(-20 88 80)"
          animate={{ rx: [22, 25, 22], opacity: [0.35, 0.5, 0.35] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.ellipse
          cx="112" cy="80" rx="22" ry="30"
          fill="var(--color-primary-light)"
          opacity={0.35}
          transform="rotate(20 112 80)"
          animate={{ rx: [22, 25, 22], opacity: [0.35, 0.5, 0.35] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 0.15 }}
        />
        {/* Smaller inner wings */}
        <motion.ellipse
          cx="92" cy="85" rx="13" ry="20"
          fill="var(--color-secondary)"
          opacity={0.25}
          transform="rotate(-15 92 85)"
          animate={{ ry: [20, 22, 20] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.ellipse
          cx="108" cy="85" rx="13" ry="20"
          fill="var(--color-secondary)"
          opacity={0.25}
          transform="rotate(15 108 85)"
          animate={{ ry: [20, 22, 20] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut', delay: 0.15 }}
        />

        {/* Head */}
        <circle cx="100" cy="72" r="10" fill="var(--color-primary)" />
        {/* Hair flowing */}
        <path
          d="M92 68 C88 60, 95 55, 100 58 C105 55, 112 60, 108 68"
          fill="var(--color-primary-dark)"
          opacity={0.7}
        />
        {/* Dress/body */}
        <path
          d="M94 80 L100 110 L106 80 Z"
          fill="var(--color-primary)"
        />
        <path
          d="M96 80 L100 105 L104 80 Z"
          fill="var(--color-primary-light)"
          opacity={0.5}
        />

        {/* Wand arm extended to the right */}
        <line x1="106" y1="85" x2="135" y2="65" stroke="var(--color-accent)" strokeWidth="1.5" strokeLinecap="round" />

        {/* Wand star */}
        <motion.g
          animate={{ scale: [1, 1.3, 1], rotate: [0, 15, -10, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          style={{ transformOrigin: '137px 62px' }}
        >
          <polygon
            points="137,54 139,60 145,61 140,65 141,71 137,67 133,71 134,65 129,61 135,60"
            fill="var(--color-accent)"
          />
        </motion.g>
      </motion.g>

      {/* Magic trail — sparkles flowing from wand */}
      <Sparkle cx={145} cy={55} delay={0} size={3} />
      <Sparkle cx={152} cy={48} delay={0.3} size={2.5} />
      <Sparkle cx={148} cy={42} delay={0.6} size={2} />
      <Sparkle cx={155} cy={38} delay={0.9} size={3.5} />
      <Sparkle cx={160} cy={52} delay={0.4} size={2} />
      <Sparkle cx={140} cy={45} delay={1.2} size={1.5} />

      {/* Fairy dust trail behind */}
      <TrailDot cx={80} cy={95} delay={0.2} />
      <TrailDot cx={72} cy={100} delay={0.5} />
      <TrailDot cx={65} cy={98} delay={0.8} />
      <TrailDot cx={58} cy={103} delay={1.1} />
      <TrailDot cx={50} cy={100} delay={1.4} />
    </motion.svg>
  )
}
