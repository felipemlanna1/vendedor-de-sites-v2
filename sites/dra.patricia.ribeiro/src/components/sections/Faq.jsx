import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'motion/react'
import { useState } from 'react'
import ScrollReveal from '../ui/ScrollReveal'
import { ChevronDown } from 'lucide-react'

const faqKeys = ['q1', 'q2', 'q3', 'q4', 'q5', 'q6']

export default function Faq() {
  const { t } = useTranslation()
  const [openIndex, setOpenIndex] = useState(null)

  const toggle = (i) => setOpenIndex(openIndex === i ? null : i)

  return (
    <section id="faq" className="py-20 md:py-28 lg:py-36 bg-[var(--color-background)]">
      <div className="mx-auto max-w-[var(--max-width)] px-5 md:px-8 lg:px-16">
        {/* Split layout: titulo esquerda, accordion direita */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">

          {/* Titulo sticky no desktop */}
          <div className="w-full lg:w-[35%] lg:sticky lg:top-32 lg:self-start">
            <ScrollReveal>
              <span className="text-sm font-medium text-[var(--color-secondary)] tracking-wide uppercase block mb-4">
                {t('faq.label')}
              </span>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-[var(--font-display)] font-bold text-[var(--color-primary-dark)] leading-tight">
                {t('faq.title')}
              </h2>
            </ScrollReveal>
          </div>

          {/* Accordion customizado */}
          <div className="w-full lg:w-[65%]">
            <div className="flex flex-col gap-3">
              {faqKeys.map((key, i) => (
                <ScrollReveal key={key} delay={i * 0.06}>
                  <div className="border border-[var(--color-accent)]/30 rounded-xl overflow-hidden bg-[var(--color-surface)]">
                    <button
                      onClick={() => toggle(i)}
                      className="w-full flex items-center justify-between gap-4 p-5 md:p-6 text-left cursor-pointer group"
                      aria-expanded={openIndex === i}
                    >
                      <span className="text-base md:text-lg font-[var(--font-display)] font-semibold text-[var(--color-primary-dark)] group-hover:text-[var(--color-secondary)] transition-colors">
                        {t(`faq.items.${key}.question`)}
                      </span>
                      <motion.div
                        animate={{ rotate: openIndex === i ? 180 : 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="flex-shrink-0"
                      >
                        <ChevronDown size={20} className="text-[var(--color-text-muted)]" />
                      </motion.div>
                    </button>

                    <AnimatePresence initial={false}>
                      {openIndex === i && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
                          className="overflow-hidden"
                        >
                          <div className="px-5 md:px-6 pb-5 md:pb-6">
                            <p className="text-sm md:text-base text-[var(--color-text-secondary)] leading-relaxed">
                              {t(`faq.items.${key}.answer`)}
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
