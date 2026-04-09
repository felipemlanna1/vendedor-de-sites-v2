import { motion } from 'motion/react'

export default function Button({ children, href, variant = 'primary', className = '', ...props }) {
  const base = 'inline-flex items-center justify-center gap-2 font-display font-medium rounded-full transition-colors cursor-pointer'
  const variants = {
    primary: 'bg-[var(--color-primary-dark)] text-white px-8 py-3.5 hover:bg-[var(--color-primary)] shadow-[var(--shadow-glow)]',
    secondary: 'border-2 border-[var(--color-primary-dark)] text-[var(--color-primary-dark)] px-8 py-3.5 hover:bg-[var(--color-primary-dark)] hover:text-white',
    ghost: 'text-[var(--color-text-secondary)] px-6 py-3 hover:text-[var(--color-primary)]',
    whatsapp: 'bg-[#25D366] text-[#052e16] px-8 py-3.5 hover:bg-[#20c05c] shadow-lg font-bold',
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
