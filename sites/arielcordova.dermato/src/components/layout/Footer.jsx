import { useTranslation } from 'react-i18next'
import { Instagram, Facebook, Stethoscope } from 'lucide-react'
import ScrollReveal from '../ui/ScrollReveal'
import { siteData } from '../../data/content'

const socialLinks = [
  { icon: Instagram, href: 'https://www.instagram.com/arielcordova.dermato/', label: '@arielcordova.dermato' },
  { icon: Instagram, href: siteData.clinic.instagramUrl, label: '@una.dermatologia' },
  { icon: Facebook, href: 'https://www.facebook.com/draarielcordova/', label: 'Facebook' },
  { icon: Stethoscope, href: 'https://www.doctoralia.com.br/ariel-cordova/dermatologista/florianopolis', label: 'Doctoralia' },
]

export default function Footer() {
  const { t } = useTranslation()

  return (
    <footer className="bg-[var(--color-text-primary)] text-white">
      <div className="mx-auto max-w-[var(--max-width)] px-5 md:px-8 lg:px-16 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
          <ScrollReveal>
            <div>
              <p className="font-[var(--font-display)] text-lg font-semibold mb-2">
                Dra. Ariel C&#243;rdova Rosa
              </p>
              <p className="text-sm text-white/50 mb-1">{t('footer.crm')}</p>
              <p className="text-sm text-white/50">Dermatologista</p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div>
              <p className="text-sm font-medium text-white/70 mb-4 uppercase tracking-wider">
                {t('footer.social')}
              </p>
              <div className="space-y-3">
                {socialLinks.map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-sm text-white/50 hover:text-[var(--color-accent)] transition-colors py-2 min-h-[44px]"
                  >
                    <Icon size={18} />
                    {label}
                  </a>
                ))}
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div>
              <p className="text-sm font-medium text-white/70 mb-4 uppercase tracking-wider">
                UNA Dermatologia
              </p>
              <p className="text-sm text-white/50 mb-2">{t('contact.address')}</p>
              <p className="text-sm text-white/50 mb-2">{t('contact.phone')}</p>
              <p className="text-sm text-white/50">{t('contact.hours')}</p>
            </div>
          </ScrollReveal>
        </div>

        <div className="pt-8 border-t border-white/10">
          <p className="text-sm text-white/30 mb-2 max-w-[65ch]">{t('footer.disclaimer')}</p>
          <p className="text-sm text-white/30 max-w-[65ch]">{t('footer.copyright')}</p>
        </div>
      </div>
    </footer>
  )
}
