import { motion } from 'motion/react'

// Divisor tematico entre secoes — trilha de po magico com estrelinhas
export default function FairyDustDivider() {
  const stars = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    left: `${5 + i * 8}%`,
    delay: i * 0.15,
    size: 4 + Math.random() * 6,
    y: -8 + Math.random() * 16,
  }))

  return (
    <div className="relative w-full py-6 overflow-hidden" aria-hidden="true">
      {/* Central line — golden gradient */}
      <div className="mx-auto max-w-[80%] h-px bg-gradient-to-r from-transparent via-[var(--color-accent)]/40 to-transparent" />

      {/* Floating stars along the line */}
      {stars.map((star) => (
        <motion.svg
          key={star.id}
          viewBox="0 0 12 12"
          width={star.size}
          height={star.size}
          className="absolute"
          style={{ left: star.left, top: `calc(50% + ${star.y}px)` }}
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: [0, 0.8, 0.4], scale: [0, 1.2, 0.8] }}
          transition={{
            duration: 2,
            delay: star.delay,
            repeat: Infinity,
            repeatDelay: 3,
          }}
          viewport={{ once: false }}
        >
          <polygon
            points="6,0 7.5,4 12,4.5 8.5,7.5 9.5,12 6,9.5 2.5,12 3.5,7.5 0,4.5 4.5,4"
            fill="var(--color-accent)"
          />
        </motion.svg>
      ))}
    </div>
  )
}
