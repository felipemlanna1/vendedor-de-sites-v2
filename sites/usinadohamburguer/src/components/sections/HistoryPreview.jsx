import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import Section from '../layout/Section'
import ScrollReveal from '../ui/ScrollReveal'
import ParallaxImage from '../ui/ParallaxImage'
import { images } from '../../data/content'

export default function HistoryPreview() {
  const { t } = useTranslation()

  return (
    <Section id="history-preview" background="bg-[var(--color-surface)]" className="overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12 items-center">
        <ScrollReveal direction="left">
          <ParallaxImage
            src={images.fachadaNdmais}
            alt="Fachada da Usina do Hamburguer em Florianopolis"
            className="rounded-2xl aspect-[4/5]"
            speed={0.15}
            loading="eager"
          />
        </ScrollReveal>

        <ScrollReveal direction="up">
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6"
            style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text-primary)' }}
          >
            {t('historyPreview.title')}
          </h2>
          <p
            className="text-base md:text-lg leading-relaxed mb-8"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            {t('historyPreview.text')}
          </p>
          <Link
            to="/nossa-historia"
            className="inline-flex items-center justify-center px-8 py-4 rounded-full text-base font-bold min-h-[48px] border-2 transition-colors hover:bg-[var(--color-primary)] hover:text-[var(--color-accent)] hover:border-[var(--color-primary)]"
            style={{ borderColor: '#6B4F0A', color: '#6B4F0A' }}
          >
            {t('historyPreview.cta')}
          </Link>
        </ScrollReveal>
      </div>
    </Section>
  )
}
