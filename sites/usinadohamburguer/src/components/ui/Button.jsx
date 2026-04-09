import { motion } from 'motion/react'

export default function Button({ children, href, variant = 'primary', className = '', ...props }) {
  const base = 'inline-flex items-center justify-center gap-2 font-semibold rounded-full transition-colors min-h-[48px]'
  const variants = {
    primary: 'bg-[var(--color-primary)] text-[var(--color-accent)] px-8 py-3.5 hover:bg-[var(--color-primary-dark)] font-bold',
    secondary: 'border-2 border-[var(--color-primary)] text-[var(--color-primary)] px-8 py-3.5 hover:bg-[var(--color-primary)] hover:text-[var(--color-accent)]',
    ghost: 'text-[var(--color-text-secondary)] px-6 py-3 hover:text-[var(--color-primary)]',
    delivery: 'text-white px-6 py-3 font-bold text-sm',
  }
  const Component = href ? motion.a : motion.button
  return (
    <Component
      href={href}
      target={href?.startsWith('http') ? '_blank' : undefined}
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
