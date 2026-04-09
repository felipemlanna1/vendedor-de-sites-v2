import { useTranslation } from 'react-i18next'
import { doctorData } from '../../data/content'
import { Instagram, Heart, ExternalLink } from 'lucide-react'
import Logo from '../ui/Logo'

const NAV_LINKS = ['sobre', 'servicos', 'tecnologia', 'locais', 'contato']

export default function Footer() {
  const { t } = useTranslation()

  const handleNavClick = (id) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <footer className="bg-primary-dark text-white">
      <div className="mx-auto max-w-7xl px-5 md:px-8 lg:px-16 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-8">
          {/* Brand with Logo */}
          <div className="md:col-span-1">
            <div className="mb-4">
              <Logo size="lg" variant="icon" />
            </div>
            <h3 className="font-[family-name:var(--font-display)] text-xl font-bold mb-2">
              {t('footer.nome')}
            </h3>
            <p className="text-white/80 text-sm mb-1">{t('footer.especialidade')}</p>
            <p className="text-white/70 text-sm">{t('footer.crm')}</p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-[family-name:var(--font-display)] font-semibold text-sm uppercase tracking-wider text-white/70 mb-4">
              {t('footer.navegacao', 'Navegação')}
            </h4>
            <nav className="flex flex-col gap-1">
              {NAV_LINKS.map((link) => (
                <button
                  key={link}
                  onClick={() => handleNavClick(link)}
                  className="text-sm text-white/80 hover:text-white transition-colors text-left cursor-pointer px-4 py-3 min-h-[44px] flex items-center"
                >
                  {t(`nav.${link}`)}
                </button>
              ))}
            </nav>
          </div>

          {/* Platforms */}
          <div>
            <h4 className="font-[family-name:var(--font-display)] font-semibold text-sm uppercase tracking-wider text-white/70 mb-4">
              {t('footer.plataformas', 'Encontre-me em')}
            </h4>
            <div className="flex flex-col gap-1">
              {doctorData.platforms.map((platform) => (
                <a
                  key={platform.id}
                  href={platform.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-white/80 hover:text-white transition-colors py-3 px-4 min-h-[44px]"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  {platform.name}
                </a>
              ))}
              <a
                href={doctorData.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-white/80 hover:text-white transition-colors py-3 px-4 min-h-[44px]"
              >
                <Instagram className="w-3.5 h-3.5" />
                Instagram
              </a>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-[family-name:var(--font-display)] font-semibold text-sm uppercase tracking-wider text-white/70 mb-4">
              {t('contato.sectionLabel')}
            </h4>
            <div className="flex flex-col gap-3">
              <a
                href={doctorData.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-white hover:text-white/80 transition-colors py-2 min-h-[44px] font-medium"
              >
                {t('contato.cta')}
              </a>
              <p className="text-sm text-white/60">
                {t('footer.atendimento', 'Atendimento particular')}
              </p>
            </div>
          </div>
        </div>

        {/* Divider + Copyright */}
        <div className="border-t border-white/10 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-white/60">
            {t('footer.direitos')}
          </p>
          <p className="text-sm text-white/60 flex items-center gap-1">
            {t('footer.creditos')} <Heart className="w-3 h-3 text-red-400 fill-red-400" />
          </p>
        </div>
      </div>
    </footer>
  )
}
