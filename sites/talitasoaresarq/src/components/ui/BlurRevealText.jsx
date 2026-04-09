import { motion } from 'motion/react'

/**
 * BlurRevealText — words appear with blur-to-sharp transition
 * Used in the Manifesto/About section for the main phrase.
 */
export default function BlurRevealText({ text, tag: Tag = 'h2', className = '', highlightWords = [] }) {
  const words = text.split(' ')

  return (
    <Tag className={className}>
      {words.map((word, i) => {
        const isHighlight = highlightWords.some(hw => word.toLowerCase().includes(hw.toLowerCase()))
        return (
          <motion.span
            key={i}
            initial={{ opacity: 0.35, filter: 'blur(8px)' }}
            whileInView={{ opacity: 1, filter: 'blur(0px)' }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{
              duration: 0.7,
              delay: i * 0.12,
              ease: [0.22, 1, 0.36, 1],
            }}
            className={`inline-block mr-[0.3em] ${isHighlight ? 'text-[var(--terracota)]' : ''}`}
          >
            {word}
          </motion.span>
        )
      })}
    </Tag>
  )
}
