import { motion } from 'motion/react'

export default function AnimatedText({ text, tag: Tag = 'h2', className = '', delay = 0 }) {
  const words = text.split(' ')
  return (
    <Tag className={`overflow-hidden ${className}`}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden mr-[0.2em]">
          <motion.span
            initial={{ y: '100%' }}
            whileInView={{ y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay: delay + i * 0.06, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="inline-block"
          >
            {word}
          </motion.span>
        </span>
      ))}
    </Tag>
  )
}
