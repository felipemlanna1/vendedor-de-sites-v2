import { useTranslation } from 'react-i18next'
import { Instagram, Linkedin, MessageCircle } from 'lucide-react'
import { siteData } from '../../data/content'

const NAV_LINKS = ['sobre', 'servicos', 'portfolio', 'diferenciais', 'contato']

export default function Footer() {
  const { t } = useTranslation()

  const scrollTo = (id) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <footer className="bg-[var(--color-secondary)] border-t border-[var(--color-primary-light)]/10">
      <div className="mx-auto max-w-[var(--max-width)] px-6 md:px-8 lg:px-16 py-12 md:py-16">
        <div className="grid md:grid-cols-3 gap-10 md:gap-16">
          {/* Brand */}
          <div>
            <h3 className="font-display text-2xl font-bold text-[var(--color-background)]">
              Ana Clara
            </h3>
            <p className="mt-2 text-sm italic text-[var(--color-background)]/50">
              {t('hero.subtitle')}
            </p>
            <p className="mt-4 text-xs text-[var(--color-background)]/60 leading-relaxed">
              {siteData.profession}
              <br />
              {siteData.city}/{siteData.state}
              <br />
              CNPJ {siteData.cnpj}
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-sm font-medium tracking-[0.15em] uppercase text-[var(--color-primary-light)]/70 mb-4">
              {t('nav.home')}
            </h4>
            <nav className="flex flex-col gap-1">
              {NAV_LINKS.map((id) => (
                <a
                  key={id}
                  href={`#${id}`}
                  onClick={(e) => { e.preventDefault(); scrollTo(id) }}
                  className="text-sm text-[var(--color-background)]/60 hover:text-[var(--color-accent)] transition-colors text-left py-2.5 px-3.5 min-h-[44px] flex items-center cursor-pointer"
                >
                  {t(`nav.${id}`)}
                </a>
              ))}
            </nav>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-sm font-medium tracking-[0.15em] uppercase text-[var(--color-primary-light)]/70 mb-4">
              {t('footer.social')}
            </h4>
            <div className="flex gap-4">
              <a
                href={siteData.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t('footer.instagram')}
                className="w-11 h-11 flex items-center justify-center border border-[var(--color-primary-light)]/20 text-[var(--color-background)]/60 hover:text-[var(--color-accent)] hover:border-[var(--color-accent)]/30 transition-colors"
              >
                <Instagram size={18} />
              </a>
              <a
                href={siteData.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t('footer.linkedin')}
                className="w-11 h-11 flex items-center justify-center border border-[var(--color-primary-light)]/20 text-[var(--color-background)]/60 hover:text-[var(--color-accent)] hover:border-[var(--color-accent)]/30 transition-colors"
              >
                <Linkedin size={18} />
              </a>
              <a
                href={siteData.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t('footer.whatsapp')}
                className="w-11 h-11 flex items-center justify-center border border-[var(--color-primary-light)]/20 text-[var(--color-background)]/60 hover:text-[var(--color-accent)] hover:border-[var(--color-accent)]/30 transition-colors"
              >
                <MessageCircle size={18} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-[var(--color-primary-light)]/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[var(--color-background)]/50">
            &copy; {t('footer.copyright')}
          </p>
          <p className="text-xs text-[var(--color-background)]/40">
            {t('footer.developer')}
          </p>
        </div>
      </div>
    </footer>
  )
}
