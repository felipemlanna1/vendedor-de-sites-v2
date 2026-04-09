import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'
import Section from '../components/layout/Section'
import ScrollReveal from '../components/ui/ScrollReveal'
import CountUp from '../components/ui/CountUp'
import ParallaxImage from '../components/ui/ParallaxImage'
import { images, impactNumbers } from '../data/content'
import { Heart, PawPrint } from 'lucide-react'

const timelineYears = ['2015', '2018', '2022', '2024', '2026']

export default function NossaHistoria() {
  const { t } = useTranslation()

  return (
    <>
      <Helmet>
        <title>Nossa Historia | Usina do Hamburguer - Florianopolis</title>
        <meta name="description" content="Desde 2015, a Usina do Hamburguer transforma ingredientes em proposito. Conheca nossa historia, causa social e como ja doamos mais de R$200 mil." />
      </Helmet>

      {/* Hero */}
      <section
        className="pt-32 pb-16 px-5 md:px-8"
        style={{ backgroundColor: 'var(--color-accent)' }}
      >
        <div className="mx-auto max-w-[var(--max-width)]">
          <h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4"
            style={{ color: '#D4A017', fontFamily: 'var(--font-display)', backgroundColor: '#1A1A1A' }}
          >
            {t('historyPage.title')}
          </h1>
          <p className="text-base md:text-lg max-w-2xl" style={{ color: '#FAFAF5', backgroundColor: '#1A1A1A' }}>
            {t('historyPage.intro')}
          </p>
        </div>
      </section>

      {/* Photo */}
      <Section>
        <ScrollReveal>
          <ParallaxImage
            src={images.estabelecimentoNdmais}
            alt="Interior da Usina do Hamburguer"
            className="rounded-2xl aspect-[21/9] max-h-[400px]"
            speed={0.1}
          />
        </ScrollReveal>
      </Section>

      {/* Timeline */}
      <Section background="bg-[var(--color-surface)]">
        <div className="relative">
          {/* Vertical line */}
          <div
            className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5"
            style={{ backgroundColor: 'var(--color-primary)' }}
          />

          <div className="space-y-12">
            {timelineYears.map((year, i) => (
              <ScrollReveal key={year} delay={i * 0.1}>
                <div className={`relative flex items-start gap-6 md:gap-12 ${
                  i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}>
                  {/* Dot */}
                  <div
                    className="absolute left-4 md:left-1/2 w-4 h-4 rounded-full -translate-x-1/2 z-10 border-4"
                    style={{ backgroundColor: 'var(--color-primary)', borderColor: 'var(--color-surface)' }}
                  />

                  {/* Content */}
                  <div className={`ml-10 md:ml-0 md:w-[45%] ${i % 2 === 0 ? 'md:text-right md:pr-8' : 'md:text-left md:pl-8'}`}>
                    <span
                      className="text-3xl md:text-4xl font-bold"
                      style={{ fontFamily: 'var(--font-display)', color: 'var(--color-primary)' }}
                    >
                      {year}
                    </span>
                    <p className="text-sm md:text-base mt-2" style={{ color: 'var(--color-text-secondary)' }}>
                      {t(`historyPage.timeline.${year}`)}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </Section>

      {/* Social cause */}
      <Section background="bg-[var(--color-accent)]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <ScrollReveal>
            <Heart size={48} style={{ color: '#D4A017' }} className="mb-4" />
            <h2
              className="text-3xl md:text-4xl font-bold mb-4"
              style={{ color: '#D4A017', fontFamily: 'var(--font-display)', backgroundColor: '#1A1A1A' }}
            >
              {t('historyPage.socialCause.title')}
            </h2>
            <p className="text-base leading-relaxed" style={{ color: '#FAFAF5', backgroundColor: '#1A1A1A' }}>
              {t('historyPage.socialCause.description')}
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <div className="text-center">
              <span
                className="text-5xl md:text-7xl font-bold block mb-2"
                style={{ color: '#D4A017', fontFamily: 'var(--font-display)', backgroundColor: '#1A1A1A' }}
              >
                R$ <CountUp end={impactNumbers.donated} duration={3} />+
              </span>
              <span className="text-base" style={{ color: '#FAFAF5', backgroundColor: '#1A1A1A' }}>
                {t('impact.donated')}
              </span>
            </div>
          </ScrollReveal>
        </div>
      </Section>

      {/* Pet Burguer */}
      <Section>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <ScrollReveal>
            {images.interior1 && (
              <ParallaxImage
                src={images.interior1}
                alt="Ambiente da Usina do Hamburguer"
                className="rounded-2xl aspect-[4/3]"
                speed={0.1}
              />
            )}
          </ScrollReveal>
          <ScrollReveal direction="right">
            <PawPrint size={48} style={{ color: 'var(--color-primary)' }} className="mb-4" />
            <h2
              className="text-3xl md:text-4xl font-bold mb-4"
              style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text-primary)' }}
            >
              {t('historyPage.petBurguer.title')}
            </h2>
            <p className="text-base leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
              {t('historyPage.petBurguer.description')}
            </p>
          </ScrollReveal>
        </div>
      </Section>
    </>
  )
}
