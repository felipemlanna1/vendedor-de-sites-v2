import { useTranslation } from 'react-i18next'
import { Instagram, Anchor } from 'lucide-react'

export default function Footer({ content }) {
  const { t } = useTranslation()

  return (
    <footer style={{ background: '#0E0E0E' }}>
      {/* Top gold ornamental divider */}
      <div className="relative">
        <div className="w-full h-px bg-[var(--color-primary)] opacity-30" />
        <div className="absolute left-1/2 -translate-x-1/2 -top-2 flex items-center gap-3 px-4" style={{ background: '#0E0E0E' }}>
          <div className="w-6 h-px bg-[var(--color-primary)] opacity-40" />
          <div className="w-1.5 h-1.5 rotate-45 border border-[var(--color-primary)] opacity-50" />
          <div className="w-6 h-px bg-[var(--color-primary)] opacity-40" />
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-14 md:py-20 text-center">
        {/* Logo with anchor icon */}
        <div className="flex items-center justify-center gap-3 mb-2">
          <Anchor size={20} style={{ color: 'var(--color-primary)', opacity: 0.7 }} />
          <p
            className="text-xl md:text-2xl tracking-[0.35em] uppercase"
            style={{ fontFamily: 'var(--font-display)', color: 'var(--color-primary)' }}
          >
            ANCORADOR
          </p>
          <Anchor size={20} style={{ color: 'var(--color-primary)', opacity: 0.7 }} />
        </div>

        {/* Tagline — translated */}
        <p
          className="text-xs uppercase tracking-[0.2em] mb-8"
          style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text-muted)' }}
        >
          {t('footer.tagline')}
        </p>

        {/* Social */}
        <div className="flex items-center justify-center gap-5 mb-8">
          <a
            href={`https://www.instagram.com/${content.business.instagram}/`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-xs transition-colors duration-300 hover:text-[var(--color-primary)]"
            style={{ fontFamily: 'var(--font-body)', color: 'var(--color-text-secondary)' }}
            aria-label="Instagram Barbearia Ancorador"
          >
            <Instagram size={16} style={{ color: 'var(--color-primary)' }} />
            @{content.business.instagram}
          </a>
          <span className="w-px h-3 bg-[var(--color-border)]" />
          <a
            href={`https://www.instagram.com/${content.business.instagram_owner}/`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-xs transition-colors duration-300 hover:text-[var(--color-primary)]"
            style={{ fontFamily: 'var(--font-body)', color: 'var(--color-text-secondary)' }}
            aria-label="Instagram Sucata Barber"
          >
            <Instagram size={16} style={{ color: 'var(--color-primary)' }} />
            @{content.business.instagram_owner}
          </a>
        </div>

        {/* Address */}
        <p
          className="text-xs mb-6"
          style={{ fontFamily: 'var(--font-body)', color: 'var(--color-text-muted)', lineHeight: 1.6 }}
        >
          {content.business.address}, {content.business.neighborhood} — {content.business.city}/{content.business.state}
        </p>

        {/* Copyright */}
        <p
          className="text-[11px]"
          style={{ fontFamily: 'var(--font-body)', color: 'var(--color-text-muted)' }}
        >
          &copy; 2024-2026 {content.business.name}. {t('footer.rights')}
        </p>
      </div>
    </footer>
  )
}
