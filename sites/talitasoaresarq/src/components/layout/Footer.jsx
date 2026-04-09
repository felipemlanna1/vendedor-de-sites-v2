import { useTranslation } from 'react-i18next'
import { Instagram, Facebook } from 'lucide-react'
import { siteData } from '../../data/content'

export default function Footer() {
  const { t } = useTranslation()

  return (
    <footer className="bg-[var(--carvao)] border-t border-[var(--pergaminho)]/10 px-6 py-8">
      <div className="mx-auto max-w-[var(--max-width)] flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-[var(--pergaminho)]/50 text-sm">
          {t('footer.copyright')}
        </p>
        <div className="flex items-center gap-4">
          <span className="text-[var(--pergaminho)]/40 text-xs tracking-wider uppercase">
            {t('footer.social')}
          </span>
          <a
            href={siteData.social.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--pergaminho)]/50 hover:text-[var(--terracota)] transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
            aria-label="Instagram"
          >
            <Instagram size={22} />
          </a>
          <a
            href={siteData.social.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--pergaminho)]/50 hover:text-[var(--terracota)] transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
            aria-label="Facebook"
          >
            <Facebook size={22} />
          </a>
        </div>
      </div>
    </footer>
  )
}
