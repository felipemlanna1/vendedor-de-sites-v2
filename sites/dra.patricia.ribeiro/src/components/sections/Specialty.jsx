import { useTranslation } from 'react-i18next'
import ScrollReveal from '../ui/ScrollReveal'
import { DenteRaiz } from '../ui/RaizViva'
import { RaizDivider } from '../ui/RaizViva'
import { Search, Shield, HeartPulse } from 'lucide-react'

const stepIcons = {
  diagnosis: Search,
  treatment: Shield,
  recovery: HeartPulse,
}

export default function Specialty() {
  const { t } = useTranslation()

  const steps = ['diagnosis', 'treatment', 'recovery']

  return (
    <>
      <RaizDivider color="var(--color-primary)" className="-mb-1" />
      <section id="specialty" className="relative py-20 md:py-28 lg:py-36 bg-[var(--color-primary)] overflow-hidden">
        <div className="mx-auto max-w-[var(--max-width)] px-5 md:px-8 lg:px-16">
          {/* Layout: SVG animado esquerda + timeline vertical direita */}
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

            {/* SVG Dente com Raizes — elemento assinatura principal */}
            <div className="w-full lg:w-[35%] flex justify-center">
              <ScrollReveal>
                <DenteRaiz className="opacity-90" />
              </ScrollReveal>
            </div>

            {/* Conteudo educativo + timeline */}
            <div className="w-full lg:w-[65%]">
              <ScrollReveal>
                <span className="text-sm font-medium text-[var(--color-accent)] tracking-wide uppercase block mb-4">
                  {t('specialty.label')}
                </span>
              </ScrollReveal>

              <ScrollReveal delay={0.1}>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-[var(--font-display)] font-bold text-white mb-6 leading-tight">
                  {t('specialty.title')}
                </h2>
              </ScrollReveal>

              <ScrollReveal delay={0.2}>
                <p className="text-base md:text-lg text-[var(--color-accent)] leading-relaxed mb-12 max-w-2xl">
                  {t('specialty.description')}
                </p>
              </ScrollReveal>

              {/* Timeline vertical com 3 etapas */}
              <div className="relative">
                {/* Linha vertical */}
                <div className="absolute left-5 md:left-6 top-0 bottom-0 w-px bg-[var(--color-accent)]/30" aria-hidden="true" />

                <div className="flex flex-col gap-10">
                  {steps.map((step, i) => {
                    const Icon = stepIcons[step]
                    return (
                      <ScrollReveal key={step} delay={0.3 + i * 0.15}>
                        <div className="flex gap-5 md:gap-6 items-start">
                          {/* Dot com icone */}
                          <div className="relative z-10 flex-shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-full bg-[var(--color-secondary)] flex items-center justify-center">
                            <Icon size={20} className="text-white" />
                          </div>

                          <div>
                            <h3 className="text-xl md:text-2xl font-[var(--font-display)] font-semibold text-white mb-2">
                              {t(`specialty.steps.${step}.title`)}
                            </h3>
                            <p className="text-sm md:text-base text-[var(--color-accent)] leading-relaxed">
                              {t(`specialty.steps.${step}.description`)}
                            </p>
                          </div>
                        </div>
                      </ScrollReveal>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <RaizDivider color="var(--color-primary)" flip className="-mt-1" />
    </>
  )
}
