import { useTranslation } from 'react-i18next'
import Section from '../components/layout/Section'
import AnimatedText from '../components/ui/AnimatedText'
import ScrollReveal from '../components/ui/ScrollReveal'
import ParallaxImage from '../components/ui/ParallaxImage'

const timeline = [
  { year: '2015', titleKey: 'origin_title', textKey: 'origin_text', image: '/images/fachada-ndmais-2.jpg' },
  { year: '2016-2022', titleKey: 'growth_title', textKey: 'growth_text', image: '/images/ig-unidades.jpg' },
  { year: 'Sempre', titleKey: 'impact_title', textKey: 'impact_text', image: '/images/ig-avaliacao-cliente.jpg' },
  { year: null, titleKey: 'pet_title', textKey: 'pet_text', image: '/images/pet-burguer-rappi.png' },
]

export default function HistoryPage() {
  const { t } = useTranslation()

  return (
    <>
      <div className="pt-28 pb-8 bg-[var(--color-secondary)]">
        <div className="mx-auto max-w-[var(--max-width)] px-5 md:px-8 lg:px-16">
          <h1 className="font-[var(--font-display)] text-4xl md:text-6xl font-bold text-white tracking-tighter mb-3">
            {t('history_page.title')}
          </h1>
          <p className="text-white/60 text-lg max-w-[55ch]">
            {t('history_page.subtitle')}
          </p>
        </div>
      </div>

      <Section background="bg-[var(--color-background)]">
        <div className="space-y-20 md:space-y-32">
          {timeline.map((item, i) => (
            <div
              key={item.titleKey}
              className={`grid lg:grid-cols-2 gap-10 lg:gap-16 items-center ${
                i % 2 !== 0 ? 'lg:direction-rtl' : ''
              }`}
            >
              <div className={i % 2 !== 0 ? 'lg:order-2' : ''}>
                {item.year && (
                  <ScrollReveal>
                    <span className="font-[var(--font-display)] text-[var(--color-primary)] font-bold text-sm uppercase tracking-widest">
                      {item.year}
                    </span>
                  </ScrollReveal>
                )}
                <AnimatedText
                  text={t(`history_page.${item.titleKey}`)}
                  tag="h2"
                  className="font-[var(--font-display)] text-2xl md:text-4xl font-bold tracking-tighter text-[var(--color-text-primary)] mt-2 mb-5"
                />
                <ScrollReveal delay={0.2}>
                  <p className="text-[var(--color-text-secondary)] text-lg leading-relaxed max-w-[55ch]">
                    {t(`history_page.${item.textKey}`)}
                  </p>
                </ScrollReveal>
              </div>

              <ScrollReveal direction={i % 2 === 0 ? 'right' : 'left'} className={i % 2 !== 0 ? 'lg:order-1' : ''}>
                <ParallaxImage
                  src={item.image}
                  alt={t(`history_page.${item.titleKey}`)}
                  className="rounded-2xl aspect-[4/3] shadow-lg"
                  speed={0.1}
                />
              </ScrollReveal>
            </div>
          ))}
        </div>
      </Section>
    </>
  )
}
