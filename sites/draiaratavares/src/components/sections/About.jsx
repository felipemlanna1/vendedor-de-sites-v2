import { useTranslation } from 'react-i18next'
import { Award, MapPin } from 'lucide-react'
import ScrollReveal from '../ui/ScrollReveal'
import AnimatedText from '../ui/AnimatedText'
import { siteData } from '../../data/content'

export default function About() {
  const { t } = useTranslation()

  return (
    <section
      id="about"
      className="px-5 py-[var(--space-section)] md:px-8 lg:px-16 bg-[var(--color-surface)]"
    >
      <div className="mx-auto max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
        {/* Image */}
        <ScrollReveal direction="left" className="order-2 md:order-1">
          <div className="relative rounded-[var(--radius-xl)] overflow-hidden aspect-[3/4] max-w-md mx-auto md:mx-0">
            <img
              src={siteData.images.about}
              alt="Dra. Iara Tavares - Portrait profissional"
              className="w-full h-full object-cover"
              loading="eager"
              width={480}
              height={640}
            />
            {/* Gold accent line */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[var(--color-primary)] to-transparent" />
          </div>
        </ScrollReveal>

        {/* Text */}
        <div className="order-1 md:order-2 flex flex-col gap-6">
          <ScrollReveal>
            <span className="font-body text-sm tracking-[0.2em] uppercase text-[var(--color-primary)]">
              {t('about.subtitle')}
            </span>
          </ScrollReveal>

          <AnimatedText
            text={t('about.title')}
            tag="h2"
            className="font-heading text-3xl md:text-4xl lg:text-5xl font-semibold text-[var(--color-text-primary)]"
          />

          <ScrollReveal delay={0.2}>
            <p className="font-body text-base md:text-lg text-[var(--color-text-secondary)] leading-relaxed">
              {t('about.description')}
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <p className="font-body text-base italic text-[var(--color-text-secondary)] leading-relaxed border-l-2 border-[var(--color-primary)] pl-5">
              {t('about.philosophy')}
            </p>
          </ScrollReveal>

          {/* Credentials */}
          <ScrollReveal delay={0.4}>
            <div className="flex flex-col sm:flex-row gap-6 mt-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[var(--color-primary-light)]/15 flex items-center justify-center">
                  <Award size={18} className="text-[var(--color-primary)]" />
                </div>
                <div>
                  <span className="font-body text-sm tracking-wide uppercase text-[var(--color-text-secondary)] block">
                    {t('about.credential_label')}
                  </span>
                  <span className="font-body text-sm font-medium text-[var(--color-text-primary)]">
                    {t('about.credential_value')}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[var(--color-primary-light)]/15 flex items-center justify-center">
                  <MapPin size={18} className="text-[var(--color-primary)]" />
                </div>
                <div>
                  <span className="font-body text-sm tracking-wide uppercase text-[var(--color-text-secondary)] block">
                    {t('about.location_label')}
                  </span>
                  <span className="font-body text-sm font-medium text-[var(--color-text-primary)]">
                    {t('about.location_value')}
                  </span>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
