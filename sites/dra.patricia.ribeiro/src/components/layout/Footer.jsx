import { useTranslation } from 'react-i18next'
import { RaizMini } from '../ui/RaizViva'
import { siteData } from '../../data/content'
import { Instagram } from 'lucide-react'

export default function Footer() {
  const { t } = useTranslation()

  return (
    <footer className="bg-[var(--color-primary-dark)] border-t border-white/5 py-12 md:py-16">
      <div className="mx-auto max-w-[var(--max-width)] px-5 md:px-8 lg:px-16">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo + raiz mini */}
          <div className="flex items-center gap-3">
            <RaizMini className="opacity-60" />
            <div>
              <p className="font-[var(--font-display)] font-bold text-white text-lg">Dra. Patrícia Ribeiro</p>
              <p className="text-sm text-[var(--color-accent)]">{t('footer.cro')}</p>
            </div>
          </div>

          {/* Social */}
          <div className="flex items-center gap-4">
            <a
              href={siteData.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-[var(--color-accent)] hover:text-white transition-colors py-3 px-2 -mx-2 rounded-lg"
              aria-label={t('footer.instagram')}
            >
              <Instagram size={18} />
              <span>{siteData.instagramHandle}</span>
            </a>
          </div>

          {/* Copyright */}
          <div className="text-center md:text-right">
            <p className="text-sm text-[var(--color-accent)]">
              &copy; {t('footer.copyright')}
            </p>
            <p className="text-sm text-[var(--color-accent)]/80 mt-1">
              {t('footer.privacy')}
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
