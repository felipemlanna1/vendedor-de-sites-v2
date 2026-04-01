import { motion } from 'motion/react'

export default function Button({ children, href, variant = 'primary', className = '', ...props }) {
  const base = 'inline-flex items-center justify-center gap-2 font-medium tracking-wider uppercase text-sm transition-all duration-300'
  const variants = {
    primary: 'bg-[var(--color-primary)] text-[var(--color-background)] px-8 py-4 hover:bg-[var(--color-primary-light)] hover:shadow-[0_0_30px_rgba(200,164,92,0.3)]',
    outline: 'border border-[var(--color-primary)] text-[var(--color-primary)] px-8 py-4 hover:bg-[var(--color-primary)] hover:text-[var(--color-background)]',
    ghost: 'text-[var(--color-primary)] px-4 py-2 hover:text-[var(--color-primary-light)]'
  }

  const Tag = href ? motion.a : motion.button
  return (
    <Tag
      href={href}
      target={href?.startsWith('http') ? '_blank' : undefined}
      rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
      className={`${base} ${variants[variant]} ${className}`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      {...props}
    >
      {children}
    </Tag>
  )
}
