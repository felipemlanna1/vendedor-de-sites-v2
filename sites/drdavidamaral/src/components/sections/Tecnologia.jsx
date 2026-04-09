import { useTranslation } from 'react-i18next'
import Section from '../layout/Section'
import ScrollReveal from '../ui/ScrollReveal'
import AnimatedText from '../ui/AnimatedText'
import ParallaxImage from '../ui/ParallaxImage'
import Button from '../ui/Button'
import { images, doctorData } from '../../data/content'
import { Crosshair, ShieldCheck, Zap } from 'lucide-react'

const advantageIcons = {
  precisao: Crosshair,
  seguranca: ShieldCheck,
  recuperacao: Zap,
}

export default function Tecnologia() {
  const { t } = useTranslation()
  const vantagens = ['precisao', 'seguranca', 'recuperacao']

  return (
    <Section id="tecnologia">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
        {/* Text */}
        <div>
          <ScrollReveal>
            <span className="text-sm font-medium text-primary uppercase tracking-widest">
              {t('tecnologia.sectionLabel')}
            </span>
          </ScrollReveal>

          <AnimatedText
            text={t('tecnologia.title')}
            tag="h2"
            className="font-[family-name:var(--font-display)] text-3xl md:text-5xl font-bold tracking-tight text-text-primary mt-4 mb-4"
            delay={0.1}
          />

          <ScrollReveal delay={0.15}>
            <p className="text-xl md:text-2xl text-primary font-semibold font-[family-name:var(--font-display)] mb-6">
              {t('tecnologia.subtitle')}
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <p className="text-text-secondary leading-relaxed text-base md:text-lg mb-8 max-w-lg">
              {t('tecnologia.description')}
            </p>
          </ScrollReveal>

          {/* Advantages */}
          <div className="space-y-4 mb-8">
            {vantagens.map((v, i) => {
              const Icon = advantageIcons[v]
              return (
                <ScrollReveal key={v} delay={0.25 + i * 0.1}>
                  <div className="flex items-start gap-4 p-4 bg-surface rounded-xl border border-primary/5">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-[family-name:var(--font-display)] font-semibold text-text-primary mb-1">
                        {t(`tecnologia.vantagens.${v}.titulo`)}
                      </h4>
                      <p className="text-sm text-text-secondary leading-relaxed">
                        {t(`tecnologia.vantagens.${v}.descricao`)}
                      </p>
                    </div>
                  </div>
                </ScrollReveal>
              )
            })}
          </div>

          <ScrollReveal delay={0.5}>
            <Button href={doctorData.whatsappUrl} variant="primary">
              {t('tecnologia.cta')}
            </Button>
          </ScrollReveal>
        </div>

        {/* Image with parallax */}
        <ScrollReveal direction="right">
          <div className="relative rounded-2xl overflow-hidden aspect-[16/9] max-h-[600px]">
            <ParallaxImage
              src={images.tecnologia}
              alt="Procedimento guiado por ultrassom - Dr. David Amaral"
              speed={0.15}
              className="absolute inset-0 w-full h-full"
            />
            {/* Scan overlay effect */}
            <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/30 via-transparent to-transparent" />
            <div className="absolute inset-0 opacity-30 pointer-events-none">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/10 to-transparent animate-ultrasound-vertical" />
            </div>
          </div>
        </ScrollReveal>
      </div>
    </Section>
  )
}
