import { useTranslation } from 'react-i18next'
import { GraduationCap, Award, Heart } from 'lucide-react'
import ScrollReveal from '../ui/ScrollReveal'
import ParallaxImage from '../ui/ParallaxImage'
import AnimatedText from '../ui/AnimatedText'
import Button from '../ui/Button'
import Section from '../layout/Section'
import { images, business } from '../../data/content'

export default function About() {
  const { t } = useTranslation()
  const whatsappUrl = `https://wa.me/${business.whatsapp}?text=${encodeURIComponent(business.whatsappMessage)}`

  return (
    <Section id="sobre">
      <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">
        {/* Image left with parallax */}
        <ScrollReveal direction="left" className="w-full md:w-[45%]">
          <div className="relative">
            <ParallaxImage
              src={images.about}
              alt={`${business.legalName} em seu consultório odontopediátrico`}
              speed={0.15}
              className="rounded-[var(--radius-xl)] aspect-square shadow-[var(--shadow-lg)]"
            />
            {/* CRO badge overlay */}
            <div className="absolute bottom-4 left-4 bg-[var(--color-surface)]/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-[var(--shadow-md)] flex items-center gap-2">
              <Award className="w-4 h-4 text-[var(--color-accent)]" />
              <span className="font-body text-sm font-semibold text-[var(--color-text-primary)]">
                {t('about.credentials')}
              </span>
            </div>
          </div>
        </ScrollReveal>

        {/* Text right */}
        <div className="w-full md:w-[55%]">
          <AnimatedText
            text={t('about.title')}
            tag="h2"
            className="font-display font-bold text-3xl md:text-4xl lg:text-5xl text-[var(--color-text-primary)] tracking-tight"
          />

          <ScrollReveal delay={0.15}>
            <p className="mt-6 text-base md:text-lg leading-relaxed text-[var(--color-text-secondary)] max-w-[60ch]">
              {t('about.description')}
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.25}>
            <p className="mt-4 text-base md:text-lg leading-relaxed text-[var(--color-text-secondary)] max-w-[60ch]">
              {t('about.description2')}
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.35}>
            <div className="mt-8 flex flex-wrap gap-4">
              <div className="flex items-center gap-2 bg-[var(--color-primary-light)]/20 px-4 py-2 rounded-full">
                <GraduationCap className="w-4 h-4 text-[var(--color-primary)]" />
                <span className="font-body text-sm text-[var(--color-text-secondary)]">
                  {t('about.university')}
                </span>
              </div>
              <div className="flex items-center gap-2 bg-[var(--color-secondary)]/20 px-4 py-2 rounded-full">
                <Heart className="w-4 h-4 text-[var(--color-secondary)]" />
                <span className="font-body text-sm text-[var(--color-text-secondary)]">
                  {t('about.specialty')}
                </span>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.45}>
            <div className="mt-8">
              <Button href={whatsappUrl} variant="secondary">
                {t('about.cta')}
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </Section>
  )
}
