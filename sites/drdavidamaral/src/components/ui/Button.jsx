import { motion } from 'motion/react'

export default function Button({ children, href, variant = 'primary', className = '', ...props }) {
  const base = 'inline-flex items-center justify-center gap-2 font-medium rounded-full transition-colors cursor-pointer'

  const variants = {
    primary: 'bg-primary text-white px-8 py-3.5 hover:bg-primary-dark',
    secondary: 'border-2 border-primary text-primary px-8 py-3.5 hover:bg-primary hover:text-white',
    ghost: 'text-text-secondary px-6 py-3 hover:text-primary',
    whatsapp: 'bg-[#0D6B5E] text-white px-8 py-3.5 hover:bg-[#075E54]',
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
