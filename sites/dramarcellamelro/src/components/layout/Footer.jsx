import { useTranslation } from 'react-i18next'
import { Instagram } from 'lucide-react'
import { siteData } from '../../data/content'

export default function Footer() {
  const { t } = useTranslation()

  return (
    <footer className="bg-[var(--color-primary-dark)] px-5 py-12 md:px-8 lg:px-16">
      <div className="mx-auto max-w-[var(--max-width)]">
        <div className="flex flex-col items-center gap-6 border-t border-[var(--color-primary)]/30 pt-8 md:flex-row md:justify-between">
          {/* Logo + Copyright */}
          <div className="flex items-center gap-3">
            <span className="flex h-7 w-7 items-center justify-center rounded-full border border-[var(--color-background)]/40 font-[var(--font-display)] text-xs font-semibold text-[var(--color-background)]/60">
              MM
            </span>
            <p className="font-[var(--font-body)] text-sm text-[var(--color-background)]/60">
              {t('footer.copyright')}
            </p>
          </div>

          {/* Social */}
          <div className="flex items-center gap-4">
            <span className="font-[var(--font-body)] text-sm uppercase tracking-wider text-[var(--color-background)]/60">
              {t('footer.social')}
            </span>
            <a
              href={siteData.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t('footer.instagram')}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-primary)]/20 text-[var(--color-background)]/60 transition-colors hover:bg-[var(--color-primary)]/40 hover:text-[var(--color-background)]"
            >
              <Instagram className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
