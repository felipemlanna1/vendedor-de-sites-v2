import { useTranslation } from 'react-i18next'
import ScrollReveal from '../ui/ScrollReveal'
import AnimatedText from '../ui/AnimatedText'
import Button from '../ui/Button'
import { siteData } from '../../data/content'
import { MessageCircle } from 'lucide-react'

export default function CtaFinal() {
  const { t } = useTranslation()

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-dark)]">
      {/* Decorative circles */}
      <div className="absolute top-10 left-10 w-64 h-64 rounded-full bg-[var(--color-secondary)]/[0.05] blur-3xl" />
      <div className="absolute bottom-10 right-10 w-48 h-48 rounded-full bg-white/[0.03] blur-2xl" />

      <div className="relative px-5 py-20 md:px-8 md:py-28 lg:px-16 lg:py-36">
        <div className="mx-auto max-w-[var(--max-width)] text-center">
          <ScrollReveal>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-semibold text-white leading-tight">
              {t('cta_final.title')}
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <p className="mt-6 text-lg md:text-xl text-white/70 max-w-[50ch] mx-auto leading-relaxed">
              {t('cta_final.subtitle')}
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                href={siteData.whatsappLink}
                variant="accent"
                className="text-lg px-10 py-4"
              >
                <MessageCircle size={20} />
                {t('cta_final.button')}
              </Button>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.4}>
            <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-6 text-white/60 text-base">
              <a href={siteData.phoneLink} className="hover:text-white/80 transition-colors py-2 min-h-[44px] inline-flex items-center">
                {t('cta_final.phone')}
              </a>
              <span className="hidden sm:block">|</span>
              <a
                href="https://www.doctoralia.com.br/ariel-cordova/dermatologista/florianopolis"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white/80 transition-colors py-2 min-h-[44px] inline-flex items-center"
              >
                {t('cta_final.doctoralia')}
              </a>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
