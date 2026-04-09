import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Instagram, Facebook, Linkedin, MapPin, Phone, Mail } from 'lucide-react'
import { business, social } from '../../data/content'

export default function Footer() {
  const { t } = useTranslation()

  const socialLinks = [
    { icon: Instagram, url: social.instagram, label: 'Instagram' },
    { icon: Facebook, url: social.facebook, label: 'Facebook' },
    { icon: Linkedin, url: social.linkedin, label: 'LinkedIn' },
  ]

  const quickLinks = [
    { to: '/', label: t('nav.home') },
    { to: '/cardapio', label: t('nav.menu') },
    { to: '/nossa-historia', label: t('nav.history') },
    { to: '/unidades', label: t('nav.locations') },
  ]

  return (
    <footer style={{ backgroundColor: '#1A1A1A', color: '#FAFAF5' }}>
      <div className="mx-auto max-w-[var(--max-width)] px-5 py-16 md:px-8 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          {/* Brand */}
          <div>
            <h3
              className="text-xl font-bold mb-4"
              style={{ color: '#D4A017', fontFamily: 'var(--font-display)', backgroundColor: '#1A1A1A' }}
            >
              Usina do Hamburguer
            </h3>
            <p
              className="text-sm leading-relaxed mb-6 max-w-xs"
              style={{ color: '#FAFAF5', backgroundColor: '#1A1A1A' }}
            >
              {business.description}
            </p>
            <div className="flex gap-3">
              {socialLinks.map(({ icon: Icon, url, label }) => (
                <a
                  key={label}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-11 h-11 rounded-full transition-colors"
                  style={{ backgroundColor: '#333', color: '#FAFAF5' }}
                  aria-label={label}
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4
              className="text-sm font-bold uppercase tracking-wider mb-4"
              style={{ color: '#D4A017', backgroundColor: '#1A1A1A' }}
            >
              {t('footer.links')}
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm transition-colors min-h-[48px] inline-flex items-center px-2"
                    style={{ color: '#FAFAF5', backgroundColor: '#1A1A1A' }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4
              className="text-sm font-bold uppercase tracking-wider mb-4"
              style={{ color: '#D4A017', backgroundColor: '#1A1A1A' }}
            >
              {t('footer.contact')}
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <MapPin size={16} className="shrink-0 mt-0.5" style={{ color: '#D4A017' }} />
                <span className="text-sm" style={{ color: '#FAFAF5', backgroundColor: '#1A1A1A' }}>
                  R. Prof. Bento Aguido Vieira, 20 - Trindade, Florianopolis/SC
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={16} className="shrink-0" style={{ color: '#D4A017' }} />
                <a
                  href={`tel:${business.phone.replace(/\D/g, '')}`}
                  className="text-sm min-h-[44px] flex items-center"
                  style={{ color: '#FAFAF5', backgroundColor: '#1A1A1A' }}
                >
                  {business.phone}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={16} className="shrink-0" style={{ color: '#D4A017' }} />
                <a
                  href={`mailto:${business.email}`}
                  className="text-sm min-h-[44px] flex items-center"
                  style={{ color: '#FAFAF5', backgroundColor: '#1A1A1A' }}
                >
                  {business.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div
          className="mt-12 pt-8 border-t border-[#333] flex flex-col md:flex-row items-center justify-between gap-4 text-xs"
          style={{ color: '#6A6A5E' }}
        >
          <span style={{ backgroundColor: '#1A1A1A', color: '#6A6A5E' }}>{t('footer.copyright')}</span>
          <span style={{ backgroundColor: '#1A1A1A', color: '#6A6A5E' }}>{t('footer.cnpj')}</span>
        </div>
      </div>
    </footer>
  )
}
