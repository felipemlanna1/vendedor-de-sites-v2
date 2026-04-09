import { useTranslation } from 'react-i18next'
import { motion } from 'motion/react'
import ScrollReveal from '../ui/ScrollReveal'
import AnimatedText from '../ui/AnimatedText'
import { doctorData } from '../../data/content'
import { MessageCircle, Phone } from 'lucide-react'

export default function Contato() {
  const { t } = useTranslation()

  return (
    <section
      id="contato"
      className="relative py-20 md:py-28 lg:py-36 bg-primary-dark bg-gradient-to-br from-primary-dark via-primary to-primary-light overflow-hidden"
    >
      {/* Decorative circles */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />

      <div className="relative mx-auto max-w-3xl px-5 md:px-8 lg:px-16 text-center">
        <ScrollReveal>
          <span className="text-sm font-medium text-white/90 uppercase tracking-widest">
            {t('contato.sectionLabel')}
          </span>
        </ScrollReveal>

        <AnimatedText
          text={t('contato.title')}
          tag="h2"
          className="font-[family-name:var(--font-display)] text-3xl md:text-5xl font-bold tracking-tight text-white mt-4 mb-6"
          delay={0.1}
        />

        <ScrollReveal delay={0.2}>
          <p className="text-lg md:text-xl text-white/80 leading-relaxed max-w-2xl mx-auto mb-10">
            {t('contato.subtitle')}
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.3}>
          <motion.a
            href={doctorData.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center justify-center gap-3 bg-[#0D6B5E] text-white px-10 py-4 md:px-12 md:py-5 rounded-full text-lg md:text-xl font-semibold shadow-lg hover:shadow-2xl hover:bg-[#075E54] transition-all cursor-pointer"
          >
            <MessageCircle className="w-6 h-6" />
            {t('contato.cta')}
          </motion.a>
        </ScrollReveal>

        <ScrollReveal delay={0.4}>
          <div className="mt-8 flex items-center justify-center gap-2 text-white/80 text-sm">
            <Phone className="w-4 h-4" />
            <span>{t('contato.whatsapp')}</span>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
