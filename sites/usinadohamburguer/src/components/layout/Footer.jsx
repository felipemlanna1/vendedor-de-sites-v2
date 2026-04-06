import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { InstagramLogo, FacebookLogo, TiktokLogo, LinkedinLogo } from '@phosphor-icons/react'
import { siteData } from '../../data/content'

const socials = [
  { icon: InstagramLogo, url: 'https://www.instagram.com/usinadohamburguer/', label: 'Instagram' },
  { icon: FacebookLogo, url: 'https://www.facebook.com/usinadohamburguerdelivery/', label: 'Facebook' },
  { icon: TiktokLogo, url: 'https://www.tiktok.com/@usinadohamburguer_', label: 'TikTok' },
  { icon: LinkedinLogo, url: 'https://br.linkedin.com/company/usina-do-hamburguer', label: 'LinkedIn' },
]

export default function Footer() {
  const { t } = useTranslation()

  return (
    <footer className="bg-[var(--color-secondary)] text-white/60 pt-16 pb-8">
      <div className="mx-auto max-w-[var(--max-width)] px-5 md:px-8 lg:px-16">
        <div className="grid md:grid-cols-3 gap-10 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img src="/images/logo-usina-ifood.png" alt="Logo Usina do Hamburguer" width={36} height={36} className="rounded-full" />
              <span className="font-[var(--font-display)] font-bold text-lg text-white">
                Usina do Hamburguer
              </span>
            </div>
            <p className="text-sm leading-relaxed max-w-[35ch]">
              {siteData.description.split('.')[0]}.
            </p>
          </div>

          <div>
            <h4 className="font-[var(--font-display)] font-semibold text-white mb-4 text-sm uppercase tracking-wider">
              Links
            </h4>
            <nav className="flex flex-col gap-2">
              <Link to="/" className="text-sm hover:text-[var(--color-primary)] transition-colors">{t('nav.home')}</Link>
              <Link to="/cardapio" className="text-sm hover:text-[var(--color-primary)] transition-colors">{t('nav.menu')}</Link>
              <Link to="/nossa-historia" className="text-sm hover:text-[var(--color-primary)] transition-colors">{t('nav.history')}</Link>
              <Link to="/unidades" className="text-sm hover:text-[var(--color-primary)] transition-colors">{t('nav.locations')}</Link>
            </nav>
          </div>

          <div>
            <h4 className="font-[var(--font-display)] font-semibold text-white mb-4 text-sm uppercase tracking-wider">
              Contato
            </h4>
            <div className="flex flex-col gap-2 text-sm">
              <a href={`tel:${siteData.phone}`} className="hover:text-[var(--color-primary)] transition-colors">
                {t('footer.phone')}
              </a>
              <a href={`mailto:${siteData.email}`} className="hover:text-[var(--color-primary)] transition-colors">
                {t('footer.email')}
              </a>
              <span>{t('footer.cnpj')}</span>
            </div>

            <h4 className="font-[var(--font-display)] font-semibold text-white mt-6 mb-3 text-sm uppercase tracking-wider">
              {t('footer.social')}
            </h4>
            <div className="flex gap-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[var(--color-primary)] hover:text-[var(--color-secondary)] transition-all"
                >
                  <s.icon size={20} weight="fill" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 text-center text-xs max-w-lg mx-auto">
          <p>{t('footer.copyright')}</p>
        </div>
      </div>
    </footer>
  )
}
