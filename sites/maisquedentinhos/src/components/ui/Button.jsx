import { motion } from 'motion/react'

export default function Button({ children, href, variant = 'primary', className = '', ...props }) {
  const base = 'inline-flex items-center justify-center gap-2 font-semibold rounded-full transition-colors cursor-pointer'
  const variants = {
    primary: 'bg-[var(--color-primary)] text-white px-8 py-3.5 hover:bg-[var(--color-primary-dark)] text-base',
    secondary: 'border-2 border-[var(--color-primary)] text-[var(--color-primary)] px-8 py-3.5 hover:bg-[var(--color-primary)] hover:text-white text-base',
    accent: 'bg-[var(--color-accent)] text-[var(--color-text-primary)] px-8 py-3.5 hover:brightness-110 text-base font-bold',
    ghost: 'text-[var(--color-text-secondary)] px-6 py-3 hover:text-[var(--color-primary)] text-sm',
    whatsapp: 'bg-[#075E54] text-white px-8 py-3.5 hover:bg-[#064E47] text-base font-bold',
  }
  const Component = href ? motion.a : motion.button
  return (
    <Component
      href={href}
      target={href?.startsWith('http') || href?.startsWith('https://wa.me') ? '_blank' : undefined}
      rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      className={`${base} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </Component>
  )
}
