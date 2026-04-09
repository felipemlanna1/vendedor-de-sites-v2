import { useTranslation } from 'react-i18next'
import ScrollReveal from '../ui/ScrollReveal'
import AnimatedText from '../ui/AnimatedText'
import Button from '../ui/Button'
import Section from '../layout/Section'
import { siteData } from '../../data/content'
import { MessageCircle } from 'lucide-react'

export default function About() {
  const { t } = useTranslation()

  return (
    <Section id="about" background="bg-[var(--color-background)]">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        {/* Left: image collage */}
        <ScrollReveal direction="left">
          <div className="relative flex items-center justify-center">
            <div className="relative w-full max-w-md mx-auto">
              {/* Main image */}
              <div className="rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="/images/crianca-sorrindo-consultorio.jpg"
                  alt="Crianca sorrindo no consultorio odontologico"
                  className="w-full h-auto object-cover aspect-[4/5]"
                  loading="lazy"
                  width={480}
                  height={600}
                />
              </div>
              {/* Small overlapping image */}
              <div
                className="absolute -bottom-6 -right-6 w-40 h-40 md:w-48 md:h-48 rounded-2xl overflow-hidden shadow-xl border-4 border-[var(--color-background)]"
              >
                <img
                  src="/images/dentista-com-bebe.jpg"
                  alt="Atendimento odontopediatrico"
                  className="w-full h-full object-cover"
                  loading="lazy"
                  width={192}
                  height={192}
                />
              </div>
              {/* Decorative accent */}
              <div
                className="absolute -top-4 -left-4 w-24 h-24 rounded-full -z-10"
                style={{ background: 'var(--color-secondary)', opacity: 0.3 }}
              />
            </div>
          </div>
        </ScrollReveal>

        {/* Right: editorial text */}
        <div>
          <ScrollReveal>
            <p className="text-sm font-semibold tracking-widest uppercase text-[var(--color-primary)] mb-3">
              {t('about.subtitle')}
            </p>
          </ScrollReveal>

          <AnimatedText
            text={t('about.title')}
            tag="h2"
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--color-text-primary)] leading-tight"
          />

          <ScrollReveal delay={0.2}>
            <p className="mt-6 text-lg text-[var(--color-text-secondary)] leading-relaxed">
              {t('about.p1')}
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <p className="mt-4 text-lg text-[var(--color-text-secondary)] leading-relaxed">
              {t('about.p2')}
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.4}>
            <p className="mt-4 text-lg text-[var(--color-text-secondary)] leading-relaxed">
              {t('about.p3')}
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.5}>
            <div className="mt-8">
              <Button href={siteData.whatsappLink} variant="secondary">
                <MessageCircle size={18} />
                {t('about.cta')}
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </Section>
  )
}
