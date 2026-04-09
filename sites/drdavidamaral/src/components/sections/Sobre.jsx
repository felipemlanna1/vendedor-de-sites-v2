import { useTranslation } from 'react-i18next'
import Section from '../layout/Section'
import ScrollReveal from '../ui/ScrollReveal'
import AnimatedText from '../ui/AnimatedText'
import ParallaxImage from '../ui/ParallaxImage'
import Button from '../ui/Button'
import { images, doctorData } from '../../data/content'
import { Award, GraduationCap, Shield } from 'lucide-react'

export default function Sobre() {
  const { t } = useTranslation()

  const credentials = [
    { icon: Shield, label: 'CRM', value: `${doctorData.crm}/${doctorData.crmState}` },
    { icon: Award, label: 'RQE', value: doctorData.rqe },
    { icon: GraduationCap, label: t('sobre.specialty'), value: '' },
  ]

  return (
    <Section id="sobre">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
        {/* Image */}
        <ScrollReveal direction="left" className="order-2 md:order-1">
          <div className="relative rounded-2xl overflow-hidden aspect-[16/9] max-h-[600px]">
            <ParallaxImage
              src={images.sobre}
              alt={`${doctorData.name} em seu consultório`}
              speed={0.15}
              className="absolute inset-0 w-full h-full"
            />
            {/* Overlay gradient for depth */}
            <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/20 to-transparent" />
          </div>
        </ScrollReveal>

        {/* Text */}
        <div className="order-1 md:order-2">
          <ScrollReveal>
            <span className="text-sm font-medium text-primary uppercase tracking-widest">
              {t('sobre.sectionLabel')}
            </span>
          </ScrollReveal>

          <AnimatedText
            text={t('sobre.title')}
            tag="h2"
            className="font-[family-name:var(--font-display)] text-3xl md:text-5xl font-bold tracking-tight text-text-primary mt-4 mb-6"
            delay={0.1}
          />

          <ScrollReveal delay={0.2}>
            <p className="text-base md:text-lg text-text-secondary leading-relaxed max-w-lg mb-8">
              {t('sobre.description')}
            </p>
          </ScrollReveal>

          {/* Credentials */}
          <ScrollReveal delay={0.3}>
            <div className="flex flex-wrap gap-4 mb-8">
              {credentials.map(({ icon: Icon, label, value }) => (
                <div
                  key={label}
                  className="flex items-center gap-3 bg-surface rounded-xl px-4 py-3 border border-primary/5"
                >
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-text-secondary font-medium">{label}</p>
                    {value && <p className="text-sm text-text-primary font-semibold">{value}</p>}
                  </div>
                </div>
              ))}
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.4}>
            <Button href={doctorData.whatsappUrl} variant="primary">
              {t('sobre.cta')}
            </Button>
          </ScrollReveal>
        </div>
      </div>
    </Section>
  )
}
