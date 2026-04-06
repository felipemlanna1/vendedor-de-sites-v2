import { useTranslation } from 'react-i18next'
import Section from '../layout/Section'
import AnimatedText from '../ui/AnimatedText'
import ScrollReveal from '../ui/ScrollReveal'
import Button from '../ui/Button'
import { deliveryLinks } from '../../data/content'

export default function CtaFinal() {
  const { t } = useTranslation()

  return (
    <section className="relative overflow-hidden bg-[var(--color-secondary)] py-20 md:py-28 lg:py-36" data-cta-section="true">
      <div
        className="absolute inset-0 opacity-15"
        style={{ backgroundImage: 'url(/images/banner-fachada-rappi.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }}
        role="img"
        aria-label="Fachada da Usina do Hamburguer"
      />
      <div className="relative z-10 mx-auto max-w-[var(--max-width)] px-5 md:px-8 lg:px-16 text-center">
        <AnimatedText
          text={t('cta_final.title')}
          tag="h2"
          className="font-[var(--font-display)] text-3xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-white mb-6"
        />
        <ScrollReveal>
          <p className="text-white/60 text-lg md:text-xl max-w-[50ch] mx-auto mb-10">
            {t('cta_final.subtitle')}
          </p>
        </ScrollReveal>
        <ScrollReveal delay={0.2}>
          <div className="flex flex-wrap justify-center gap-4">
            <Button href={deliveryLinks.ifood} variant="primary" className="text-lg px-10 py-4" style={{ backgroundColor: '#D4A017', color: '#1A1A1A' }}>
              {t('cta_final.cta')}
            </Button>
            <a href={deliveryLinks.whatsapp} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center font-semibold rounded-full text-lg px-10 py-4 min-h-[48px] hover:brightness-110 transition-all cursor-pointer" style={{ backgroundColor: '#0A6B3A', color: '#FFFFFF' }}>
              WhatsApp
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
