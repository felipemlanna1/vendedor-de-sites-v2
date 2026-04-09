import { useTranslation } from 'react-i18next'
import { siteData } from '../../data/content'
import { Instagram, MessageCircle } from 'lucide-react'

export default function Footer() {
  const { t } = useTranslation()

  return (
    <footer className="bg-[var(--color-primary-dark)] text-white py-12 md:py-16">
      <div className="mx-auto max-w-[var(--max-width)] px-6 md:px-8 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {/* Brand */}
          <div>
            <div className="mb-4">
              <span className="text-lg font-bold" style={{ fontFamily: 'var(--font-display)' }}>
                Dra. Marcia Oliveira
              </span>
              <br />
              <span className="text-[10px] tracking-widest uppercase text-white/50">
                Odontopediatria
              </span>
            </div>
            <p className="text-white/70 text-sm">
              {t('footer.tagline')}
            </p>
          </div>

          {/* Contact info */}
          <div>
            <h4 className="font-semibold mb-3" style={{ fontFamily: 'var(--font-display)' }}>
              {t('contact.title')}
            </h4>
            <p className="text-white/70 text-sm leading-relaxed">
              {siteData.address.street}<br />
              {siteData.address.neighborhood}, {siteData.address.city} - {siteData.address.state}<br />
              {siteData.address.zip}
            </p>
            <p className="text-white/70 text-sm mt-2">
              {siteData.phone}
            </p>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-semibold mb-3" style={{ fontFamily: 'var(--font-display)' }}>
              {t('footer.copyright').split('.')[0]}
            </h4>
            <div className="flex gap-4">
              <a
                href={siteData.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                aria-label={t('footer.instagram')}
              >
                <Instagram size={20} />
              </a>
              <a
                href={siteData.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                aria-label={t('footer.whatsapp')}
              >
                <MessageCircle size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-10 pt-6 border-t border-white/10 text-center text-sm text-white/50">
          {t('footer.copyright')}
        </div>
      </div>
    </footer>
  )
}
