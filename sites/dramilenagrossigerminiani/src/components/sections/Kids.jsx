import { useTranslation } from 'react-i18next'
import Section from '../layout/Section'
import ScrollReveal from '../ui/ScrollReveal'
import AnimatedText from '../ui/AnimatedText'
import Button from '../ui/Button'
import { whatsappLinks } from '../../data/content'
import { Star, Heart, Smile } from 'lucide-react'

export default function Kids() {
  const { t } = useTranslation()

  return (
    <Section id="infantil" background="bg-[var(--color-secondary)]/15">
      <div className="max-w-3xl mx-auto text-center">
        <ScrollReveal>
          <div className="flex justify-center gap-2 mb-6">
            <Star size={20} className="text-[var(--color-accent)]" />
            <Heart size={20} className="text-[var(--color-primary)]" />
            <Smile size={20} className="text-[var(--color-accent)]" />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <p className="text-sm tracking-[0.15em] uppercase text-[var(--color-primary)] font-medium mb-4">
            {t('kids.sectionLabel')}
          </p>
        </ScrollReveal>

        <AnimatedText
          text={t('kids.title')}
          tag="h2"
          className="font-[var(--font-display)] text-4xl md:text-5xl font-medium text-[var(--color-text-primary)] tracking-tight mb-6"
        />

        <ScrollReveal delay={0.2}>
          <p className="text-lg text-[var(--color-text-secondary)] leading-relaxed mb-10">
            {t('kids.description')}
          </p>
        </ScrollReveal>

        {/* Feature cards */}
        <div className="grid sm:grid-cols-2 gap-4 mb-10 px-2 sm:px-0">
          <ScrollReveal delay={0.3}>
            <div className="bg-white/80 rounded-2xl p-6 text-left">
              <div className="w-12 h-12 rounded-full bg-[var(--color-accent)]/15 flex items-center justify-center mb-4">
                <Star size={20} className="text-[var(--color-accent)]" />
              </div>
              <p className="font-medium text-[var(--color-text-primary)] mb-1">Invisalign First</p>
              <p className="text-sm text-[var(--color-text-secondary)]">
                {t('kids.invisalignFirst')}
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.4}>
            <div className="bg-white/80 rounded-2xl p-6 text-left">
              <div className="w-12 h-12 rounded-full bg-[var(--color-primary)]/10 flex items-center justify-center mb-4">
                <Heart size={20} className="text-[var(--color-primary)]" />
              </div>
              <p className="font-medium text-[var(--color-text-primary)] mb-1">Odontopediatria</p>
              <p className="text-sm text-[var(--color-text-secondary)]">
                {t('kids.odontopediatria')}
              </p>
            </div>
          </ScrollReveal>
        </div>

        <ScrollReveal delay={0.5}>
          <Button href={whatsappLinks.kids}>
            Agendar consulta infantil
          </Button>
        </ScrollReveal>
      </div>
    </Section>
  )
}
