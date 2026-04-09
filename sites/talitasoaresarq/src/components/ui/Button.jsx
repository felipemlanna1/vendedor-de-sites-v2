import { motion } from 'motion/react'

const variantStyles = {
  primary: {
    className: 'primary bg-[var(--terracota)] text-white rounded-sm hover:bg-[var(--terracota-hover)] shadow-sm hover:shadow-md',
    style: { padding: '14px 32px' },
  },
  secondary: {
    className: 'border border-[var(--terracota)] text-[var(--terracota)] rounded-sm hover:bg-[var(--terracota)] hover:text-white',
    style: { padding: '14px 32px' },
  },
  ghost: {
    className: 'text-[var(--grafite)] hover:text-[var(--terracota)] underline-offset-4 hover:underline',
    style: { padding: '12px 24px' },
  },
}

export default function Button({ children, href, variant = 'primary', className = '', ...props }) {
  const v = variantStyles[variant]
  const Component = href ? motion.a : motion.button
  return (
    <Component
      href={href}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`inline-flex items-center justify-center gap-2 font-medium transition-all duration-300 ${v.className} ${className}`}
      style={v.style}
      {...props}
    >
      {children}
    </Component>
  )
}
