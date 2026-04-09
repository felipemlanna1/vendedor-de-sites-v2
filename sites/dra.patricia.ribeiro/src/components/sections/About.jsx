import { useTranslation } from 'react-i18next'
import { motion } from 'motion/react'
import ScrollReveal from '../ui/ScrollReveal'
import { siteData } from '../../data/content'
import { MapPin, Award } from 'lucide-react'

export default function About() {
  const { t } = useTranslation()

  return (
    <section id="about" className="relative py-20 md:py-28 lg:py-36 bg-[var(--color-background)] overflow-hidden">
      <div className="mx-auto max-w-[var(--max-width)] px-5 md:px-8 lg:px-16">
        {/* Layout: imagem overlapping com texto — NAO e split 50/50 */}
        <div className="relative">
          {/* Imagem com parallax — ocupa mais esquerda no desktop */}
          <div className="lg:absolute lg:left-0 lg:top-0 lg:w-[45%] lg:h-full mb-8 lg:mb-0">
            <div className="rounded-2xl h-72 md:h-96 lg:h-full lg:min-h-[500px] overflow-hidden">
              <img
                src={siteData.images.about}
                alt="Dra. Patrícia Ribeiro em atendimento profissional"
                className="w-full h-full object-cover"
                style={{ objectPosition: 'center top' }}
                loading="lazy"
              />
            </div>
          </div>

          {/* Texto — overlapping na imagem no desktop (right-aligned com bg surface) */}
          <div className="lg:ml-[35%] relative z-10">
            <div className="bg-[var(--color-surface)] rounded-2xl p-8 md:p-12 lg:p-16 shadow-[var(--shadow-lg)]">
              <ScrollReveal>
                <span className="text-sm font-medium text-[var(--color-secondary)] tracking-wide uppercase block mb-4">
                  {t('about.label')}
                </span>
              </ScrollReveal>

              <ScrollReveal delay={0.1}>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-[var(--font-display)] font-bold text-[var(--color-primary-dark)] mb-6 leading-tight">
                  {t('about.title')}
                </h2>
              </ScrollReveal>

              <ScrollReveal delay={0.2}>
                <p className="text-base md:text-lg text-[var(--color-text-secondary)] leading-relaxed mb-8">
                  {t('about.description')}
                </p>
              </ScrollReveal>

              {/* Credenciais em badges */}
              <ScrollReveal delay={0.3}>
                <div className="flex flex-col sm:flex-row gap-4">
                  <motion.div
                    whileHover={{ y: -2 }}
                    className="flex items-center gap-3 bg-[var(--color-background)] rounded-xl px-5 py-3.5"
                  >
                    <Award size={20} className="text-[var(--color-secondary)] flex-shrink-0" />
                    <div>
                      <p className="text-sm text-[var(--color-text-muted)] uppercase tracking-wider">{t('about.credential_label')}</p>
                      <p className="text-sm font-semibold text-[var(--color-primary)]">{t('about.credentials')}</p>
                    </div>
                  </motion.div>

                  <motion.div
                    whileHover={{ y: -2 }}
                    className="flex items-center gap-3 bg-[var(--color-background)] rounded-xl px-5 py-3.5"
                  >
                    <MapPin size={20} className="text-[var(--color-secondary)] flex-shrink-0" />
                    <div>
                      <p className="text-sm text-[var(--color-text-muted)] uppercase tracking-wider">{t('about.location_label')}</p>
                      <p className="text-sm font-semibold text-[var(--color-primary)]">{t('about.location')}</p>
                    </div>
                  </motion.div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
