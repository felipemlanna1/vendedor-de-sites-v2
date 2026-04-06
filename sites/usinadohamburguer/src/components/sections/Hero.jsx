import { useTranslation } from 'react-i18next'
import { motion } from 'motion/react'
import Button from '../ui/Button'
import { deliveryLinks } from '../../data/content'

export default function Hero() {
  const { t } = useTranslation()

  return (
    <section className="relative min-h-[100dvh] flex items-center overflow-hidden bg-[var(--color-secondary)]">
      <div
        className="absolute inset-0 opacity-40"
        style={{ backgroundImage: 'url(/images/hero-australiano-tripadvisor.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }}
        role="img"
        aria-label="Hamburguer artesanal Usina do Hamburguer"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-secondary)] via-[var(--color-secondary)]/80 to-transparent" />

      <div className="relative z-10 mx-auto max-w-[var(--max-width)] px-5 md:px-8 lg:px-16 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="max-w-xl" style={{ backgroundColor: '#1A1A1A' }} data-hero-text="true">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 bg-[var(--color-primary)] rounded-full px-4 py-1.5 mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-[var(--color-secondary)] animate-pulse" />
              <span className="text-[var(--color-secondary)] text-sm font-bold">
                R$1 por burguer doado
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="font-[var(--font-display)] text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter leading-none mb-6"
              style={{ color: '#FAFAF5' }}
            >
              {t('hero.title')}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-lg md:text-xl leading-relaxed mb-8 max-w-[50ch]"
              style={{ color: '#F2EDE4' }}
            >
              {t('hero.subtitle')}
            </motion.p>

            <div className="flex flex-wrap gap-4">
              <Button href={deliveryLinks.ifood} variant="primary" className="text-base" style={{ backgroundColor: '#D4A017', color: '#1A1A1A' }}>
                {t('hero.cta')}
              </Button>
              <a href="/cardapio" className="inline-flex items-center justify-center font-semibold rounded-full text-base px-8 border-2 border-white/40 hover:bg-white hover:text-[var(--color-secondary)] transition-all cursor-pointer" style={{ color: '#FAFAF5', backgroundColor: 'transparent', minHeight: '48px', paddingTop: '14px', paddingBottom: '14px' }}>
                {t('hero.cta_menu')}
              </a>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="flex items-center gap-6 mt-10 text-white/50 text-sm"
            >
              <div className="flex items-center gap-2">
                <span className="text-[var(--color-primary)] font-bold text-lg">4.9</span>
                <span>iFood</span>
              </div>
              <div className="w-px h-4 bg-white/20" />
              <div className="flex items-center gap-2">
                <span className="text-[var(--color-primary)] font-bold text-lg">#22</span>
                <span>TripAdvisor</span>
              </div>
              <div className="w-px h-4 bg-white/20" />
              <div className="flex items-center gap-2">
                <span className="text-[var(--color-primary)] font-bold text-lg">11</span>
                <span>anos</span>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="hidden lg:block"
          >
            <div className="relative">
              <img
                src="/images/classico-rappi.png"
                alt="Hamburguer Classico artesanal da Usina do Hamburguer"
                width={560}
                height={560}
                className="rounded-2xl shadow-2xl object-cover aspect-square"
              />
              <div className="absolute -bottom-4 -left-4 bg-[var(--color-primary)] text-[var(--color-secondary)] rounded-xl px-5 py-3 font-[var(--font-display)] font-bold shadow-lg">
                +R$200mil doados
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
