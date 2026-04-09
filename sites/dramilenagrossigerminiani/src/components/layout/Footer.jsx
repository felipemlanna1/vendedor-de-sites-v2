import { useTranslation } from 'react-i18next'
import Monogram from '../ui/Monogram'
import ScrollReveal from '../ui/ScrollReveal'
import { siteData } from '../../data/content'
import { Instagram } from 'lucide-react'

export default function Footer() {
  const { t } = useTranslation()
  const year = new Date().getFullYear()

  return (
    <footer className="bg-[var(--color-text-primary)] text-white/80 py-16 px-5 md:px-8 lg:px-12">
      <div className="mx-auto max-w-[var(--max-width)]">
        <ScrollReveal>
          <div className="flex flex-col items-center text-center mb-10">
            {/* Monogram */}
            <Monogram size={60} color="rgba(255,255,255,0.6)" animate={false} className="mb-4" />

            <p className="font-[var(--font-display)] text-xl text-white/90">
              Dra. Milena Grossi Germiniani
            </p>
            <p className="text-sm text-white/70 mt-1">{t('footer.cro')}</p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          {/* Social */}
          <div className="flex justify-center gap-4 mb-8">
            <a
              href={siteData.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-colors"
              aria-label="Instagram da Dra. Milena"
            >
              <Instagram size={18} />
            </a>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.3}>
          <div className="border-t border-white/10 pt-6 text-center space-y-2 max-w-md mx-auto">
            <p className="text-xs text-white/60">
              {t('footer.disclaimer')}
            </p>
            <p className="text-xs text-white/50">
              &copy; {t('footer.copyright')}
            </p>
          </div>
        </ScrollReveal>
      </div>
    </footer>
  )
}
