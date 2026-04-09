import { useTranslation } from 'react-i18next'
import { siteData } from '../../data/content'
import { Instagram, Facebook } from 'lucide-react'

export default function Footer() {
  const { t } = useTranslation()
  const year = new Date().getFullYear()

  return (
    <footer className="bg-[var(--color-text-primary)] text-white/60">
      <div className="mx-auto max-w-[var(--max-width)] px-5 py-12 md:px-8 md:py-16 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="font-display text-2xl font-semibold text-white">UNA</span>
              <span className="text-sm uppercase tracking-[0.2em] text-white/40">Dermatologia</span>
            </div>
            <p className="text-sm leading-relaxed max-w-[30ch]">
              {siteData.address.full}
            </p>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm uppercase tracking-[0.2em] text-white/40 font-medium mb-4">
              {t('nav.contact')}
            </h4>
            <div className="space-y-1 text-sm">
              <a href={siteData.phoneLink} className="block hover:text-white transition-colors py-2 min-h-[44px] flex items-center">
                {siteData.phone}
              </a>
              <a href={siteData.whatsappLink} className="block hover:text-white transition-colors py-2 min-h-[44px] flex items-center">
                WhatsApp: {siteData.whatsapp}
              </a>
            </div>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-sm uppercase tracking-[0.2em] text-white/40 font-medium mb-4">
              Social
            </h4>
            <div className="flex gap-4">
              <a
                href="https://www.instagram.com/una.dermatologia/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-full bg-white/[0.06] flex items-center justify-center hover:bg-white/10 transition-colors"
                aria-label={t('footer.instagram')}
              >
                <Instagram size={18} />
              </a>
              <a
                href="https://www.facebook.com/people/Cl%C3%ADnica-Una-Dermatologia/61553054652757/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-full bg-white/[0.06] flex items-center justify-center hover:bg-white/10 transition-colors"
                aria-label={t('footer.facebook')}
              >
                <Facebook size={18} />
              </a>
              <a
                href="https://www.doctoralia.com.br/ariel-cordova/dermatologista/florianopolis"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-full bg-white/[0.06] flex items-center justify-center hover:bg-white/10 transition-colors text-sm font-bold"
                aria-label={t('footer.doctoralia')}
              >
                D
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-white/10">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-sm text-white/40">
            <p>
              &copy; {year} UNA Dermatologia. {t('footer.rights')}
            </p>
            <p>{t('footer.cnpj')}</p>
          </div>
          <p className="mt-2 text-sm text-white/30 max-w-[65ch]">
            {t('footer.rt')}
          </p>
        </div>
      </div>
    </footer>
  )
}
