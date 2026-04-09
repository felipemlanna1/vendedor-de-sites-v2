import { useTranslation } from 'react-i18next'
import { Instagram, Sparkles } from 'lucide-react'
import { business, social } from '../../data/content'

export default function Footer() {
  const { t } = useTranslation()

  return (
    <footer className="bg-[var(--color-text-primary)] py-10 md:py-14">
      <div className="mx-auto max-w-[var(--max-width)] px-5 md:px-8 lg:px-16">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand */}
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[var(--color-accent)]" />
            <span className="font-display font-bold text-base text-white">
              {business.name}
            </span>
          </div>

          {/* CRO + social */}
          <div className="flex items-center gap-6">
            <span className="font-body text-sm text-[var(--color-primary-light)]">
              {t('footer.cro')}
            </span>
            <div className="flex items-center gap-3">
              <span className="font-body text-sm text-[var(--color-primary-light)]">
                {t('footer.social')}
              </span>
              <a
                href={social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-10 h-10 rounded-full text-[var(--color-primary-light)] hover:text-[var(--color-accent)] hover:bg-white/10 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-6 pt-6 border-t border-white/10 text-center">
          <p className="font-body text-xs text-[var(--color-primary-light)] max-w-prose mx-auto">
            &copy; {t('footer.copyright')}
          </p>
        </div>
      </div>
    </footer>
  )
}
