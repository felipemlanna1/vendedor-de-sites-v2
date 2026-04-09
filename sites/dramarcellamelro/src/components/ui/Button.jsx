import { motion } from 'motion/react'

export default function Button({ children, href, variant = 'primary', className = '', ...props }) {
  const base = 'inline-flex items-center justify-center gap-2 font-medium rounded-full transition-colors font-[var(--font-body)] text-base uppercase tracking-widest'
  const variants = {
    primary: 'bg-[var(--color-accent)] text-[var(--color-text-primary)] px-8 py-3.5 hover:bg-[var(--color-secondary)]',
    secondary: 'border-2 border-[var(--color-primary-dark)] text-[var(--color-primary-dark)] px-8 py-3.5 hover:bg-[var(--color-primary-dark)] hover:text-white',
    outline: 'border border-[var(--color-secondary)] text-[var(--color-text-secondary)] px-8 py-3.5 hover:bg-[var(--color-surface)] hover:text-[var(--color-text-primary)]',
    ghost: 'text-[var(--color-text-secondary)] px-6 py-3 hover:text-[var(--color-primary)]',
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
