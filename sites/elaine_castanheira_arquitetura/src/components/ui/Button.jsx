import { motion } from 'motion/react'

export default function Button({ children, href, variant = 'primary', className = '', ...props }) {
  const base = 'inline-flex items-center justify-center gap-2 font-medium rounded-full transition-colors cursor-pointer'
  const variants = {
    primary: 'bg-[var(--color-primary)] text-white px-8 py-3.5 hover:bg-[var(--color-primary-dark)]',
    secondary: 'border-2 border-[var(--color-primary)] text-[var(--color-primary)] px-8 py-3.5 hover:bg-[var(--color-primary)] hover:text-white',
    ghost: 'text-[var(--color-text-secondary)] px-6 py-3 hover:text-[var(--color-primary)]',
    accent: 'bg-[var(--color-accent)] text-white px-8 py-3.5 hover:opacity-90',
  }
  const Component = href ? motion.a : motion.button
  return (
    <Component
      href={href}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      className={`${base} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </Component>
  )
}
