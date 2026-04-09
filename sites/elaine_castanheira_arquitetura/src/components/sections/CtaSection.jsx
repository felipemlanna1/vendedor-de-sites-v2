import { useTranslation } from 'react-i18next'
import { motion } from 'motion/react'
import ScrollReveal from '../ui/ScrollReveal'
import { siteData } from '../../data/content'
import { MessageCircle } from 'lucide-react'

export default function CtaSection() {
  const { t } = useTranslation()

  return (
    <section className="px-6 py-20 md:py-28 bg-[var(--color-accent)] overflow-hidden">
      <div className="mx-auto max-w-[var(--max-width)] text-center">
        <ScrollReveal>
          <h2 className="font-[var(--font-display)] text-3xl md:text-4xl lg:text-5xl font-medium text-white leading-[1.1] tracking-tight mb-4">
            {t('cta_section.title')}
          </h2>
          <p className="text-white/70 text-base md:text-lg max-w-xl mx-auto mb-10">
            {t('cta_section.subtitle')}
          </p>
          <motion.a
            href={siteData.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-3 bg-white text-[var(--color-accent)] px-10 py-4 rounded-full font-medium text-base md:text-lg hover:bg-white/90 transition-colors"
          >
            <MessageCircle className="w-5 h-5" strokeWidth={1.5} />
            {t('cta_section.button')}
          </motion.a>
        </ScrollReveal>
      </div>
    </section>
  )
}
