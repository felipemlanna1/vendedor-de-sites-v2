import { useTranslation } from 'react-i18next'
import Section from '../layout/Section'
import ScrollReveal from '../ui/ScrollReveal'
import AnimatedText from '../ui/AnimatedText'
import ParallaxImage from '../ui/ParallaxImage'
import Button from '../ui/Button'
import { siteData } from '../../data/content'

export default function About() {
  const { t } = useTranslation()

  return (
    <Section id="sobre" background="bg-[var(--color-background)]">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        <ScrollReveal direction="left" className="order-2 lg:order-1">
          <p className="text-sm font-medium tracking-[0.15em] uppercase text-[var(--color-primary)] mb-4">
            {t('about.label')}
          </p>
          <AnimatedText
            text={t('about.title')}
            tag="h2"
            className="font-[var(--font-display)] text-3xl md:text-4xl lg:text-5xl text-[var(--color-text-primary)] leading-[1.1] tracking-tight mb-8"
          />
          <p className="text-base md:text-lg text-[var(--color-text-secondary)] leading-relaxed mb-6 max-w-[60ch]">
            {t('about.description')}
          </p>
          <p className="text-base md:text-lg text-[var(--color-text-secondary)] leading-relaxed mb-8 max-w-[60ch]">
            {t('about.philosophy')}
          </p>
          <div className="flex flex-col sm:flex-row items-start gap-4">
            <Button
              href="#projetos"
              onClick={(e) => {
                e.preventDefault()
                document.querySelector('#projetos')?.scrollIntoView({ behavior: 'smooth' })
              }}
            >
              {t('about.cta')}
            </Button>
            <span className="text-sm text-[var(--color-text-muted)] self-center">
              {t('about.credentials')}
            </span>
          </div>
        </ScrollReveal>

        <ScrollReveal direction="right" delay={0.2} className="order-1 lg:order-2">
          <div className="rounded-lg overflow-hidden">
            <img
              src={siteData.images.living}
              alt="Living do projeto Costa Azul com vista para o mar em Florianopolis"
              className="w-full h-auto object-cover rounded-lg"
              width={800}
              height={533}
            />
          </div>
        </ScrollReveal>
      </div>
    </Section>
  )
}
