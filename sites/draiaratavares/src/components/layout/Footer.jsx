import { useTranslation } from 'react-i18next'
import { Instagram, Heart } from 'lucide-react'
import Button from '../ui/Button'
import { siteData } from '../../data/content'

export default function Footer() {
  const { t } = useTranslation()

  const whatsappUrl = siteData.whatsapp
    ? `https://wa.me/${siteData.whatsapp}?text=${encodeURIComponent(siteData.whatsappMessage)}`
    : siteData.instagram

  return (
    <footer className="px-5 py-12 md:py-16 md:px-8 lg:px-16 bg-[var(--color-dark)] text-[var(--color-text-on-dark)]">
      <div className="mx-auto max-w-6xl">
        {/* Top section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-8 border-b border-[var(--color-dark-surface)]">
          {/* Logo + CRO */}
          <div className="text-center md:text-left">
            <h3 className="font-heading text-2xl font-semibold text-[var(--color-text-on-dark)] mb-1">
              Dra. Iara Tavares
            </h3>
            <p className="font-body text-sm text-[var(--color-text-on-dark)]/70">
              {t('footer.cro')}
            </p>
          </div>

          {/* CTA */}
          <Button
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            variant="primary"
          >
            {t('footer.cta')}
          </Button>
        </div>

        {/* Bottom section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-8">
          {/* Social */}
          <div className="flex items-center gap-4">
            <span className="font-body text-sm text-[var(--color-text-on-dark)]/70">
              {t('footer.social')}
            </span>
            <a
              href={siteData.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="w-11 h-11 rounded-full border border-[var(--color-text-on-dark)]/20 flex items-center justify-center hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-colors duration-300"
            >
              <Instagram size={18} />
            </a>
          </div>

          {/* Copyright */}
          <p className="font-body text-sm text-[var(--color-text-on-dark)]/60 text-center">
            &copy; {t('footer.copyright')}
          </p>
        </div>

        {/* Disclaimer */}
        <div className="mt-8 pt-6 border-t border-[var(--color-dark-surface)]">
          <p className="font-body text-sm text-[var(--color-text-on-dark)]/50 text-center leading-relaxed max-w-xl mx-auto">
            {t('footer.disclaimer')}
          </p>
        </div>
      </div>
    </footer>
  )
}
