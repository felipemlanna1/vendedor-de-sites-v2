import { useTranslation } from 'react-i18next'
import { siteData } from '../../data/content'
import { Instagram } from 'lucide-react'

export default function Footer() {
  const { t } = useTranslation()
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-[var(--color-text-primary)] px-5 py-12 md:py-16">
      <div className="mx-auto max-w-[var(--max-width)]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mb-10">
          <div>
            <p className="font-[var(--font-display)] text-xl font-medium text-white mb-3">
              Elaine Castanheira
            </p>
            <p className="text-sm text-white/50">
              {t('footer.cau')}
            </p>
          </div>

          <div>
            <p className="text-sm font-medium text-white/70 mb-3 tracking-wide uppercase">
              {t('contact.label')}
            </p>
            <div className="space-y-2">
              <a
                href={`mailto:${siteData.email}`}
                className="block text-sm text-white/50 hover:text-white transition-colors break-all"
              >
                {siteData.email}
              </a>
              <a
                href={siteData.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-sm text-white/50 hover:text-white transition-colors"
              >
                {siteData.phoneFormatted}
              </a>
            </div>
          </div>

          <div>
            <p className="text-sm font-medium text-white/70 mb-3 tracking-wide uppercase">
              Social
            </p>
            <div className="flex items-center gap-4">
              <a
                href="https://www.instagram.com/elaine_castanheira_arquitetura/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/50 hover:text-white transition-colors p-2 min-w-[44px] min-h-[44px] flex items-center justify-center"
                aria-label={t('footer.instagram')}
              >
                <Instagram className="w-5 h-5" strokeWidth={1.5} />
              </a>
              <a
                href="https://br.pinterest.com/elainecc2010/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/50 hover:text-white transition-colors p-2 min-w-[44px] min-h-[44px] flex items-center justify-center"
                aria-label={t('footer.pinterest')}
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 01.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-white/30">
            {currentYear} {t('footer.copyright')}
          </p>
          <p className="text-xs text-white/30">
            {t('footer.developed')}
          </p>
        </div>
      </div>
    </footer>
  )
}
