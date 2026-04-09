import { useTranslation } from 'react-i18next'
import { motion } from 'motion/react'
import { Link } from 'react-router-dom'
import { images } from '../../data/content'

export default function Hero() {
  const { t } = useTranslation()

  return (
    <section
      className="relative min-h-[100dvh] flex items-center justify-start overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(to right, rgba(26,26,26,0.92) 0%, rgba(26,26,26,0.7) 50%, rgba(26,26,26,0.4) 100%), url(${images.heroBackground})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundColor: '#1A1A1A',
      }}
    >
      <div className="mx-auto max-w-[var(--max-width)] w-full px-5 md:px-8 lg:px-16 pt-32 pb-20">
        <div className="max-w-2xl">
          <motion.h1
            className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-none mb-6"
            style={{ color: '#FAFAF5', fontFamily: 'var(--font-display)', backgroundColor: '#1A1A1A' }}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {t('hero.title').split(' ').map((word, i) => (
              <motion.span
                key={i}
                className="inline-block mr-[0.2em]"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 + i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
                style={word.toLowerCase() === 'proposito.' || word.toLowerCase() === 'purpose.'
                  ? { color: '#D4A017', backgroundColor: '#1A1A1A' }
                  : { color: '#FAFAF5', backgroundColor: '#1A1A1A' }
                }
              >
                {word}
              </motion.span>
            ))}
          </motion.h1>

          <motion.p
            className="text-lg md:text-xl leading-relaxed mb-10 max-w-lg"
            style={{ color: '#FAFAF5', backgroundColor: '#1A1A1A' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            {t('hero.subtitle')}
          </motion.p>

          <motion.div
            className="flex flex-wrap gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <a
              href="https://www.ifood.com.br/delivery/florianopolis-sc/usina-do-hamburguer---trindade-trindade/c32722d8-6ab1-4400-85af-31e5edeb4c9b"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-4 rounded-full text-base font-bold min-h-[48px] transition-transform hover:scale-105"
              style={{ backgroundColor: '#D4A017', color: '#1A1A1A' }}
            >
              {t('hero.cta')}
            </a>
            <Link
              to="/cardapio"
              className="inline-flex items-center justify-center px-8 py-4 rounded-full text-base font-bold min-h-[48px] border-2 transition-colors hover:bg-[#D4A017] hover:text-[#1A1A1A] hover:border-[#D4A017]"
              style={{ borderColor: '#D4A017', color: '#D4A017', backgroundColor: '#1A1A1A' }}
            >
              {t('hero.secondary_cta')}
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div
          className="w-6 h-10 rounded-full border-2 flex justify-center pt-2"
          style={{ borderColor: '#D4A017' }}
        >
          <motion.div
            className="w-1.5 h-1.5 rounded-full"
            style={{ backgroundColor: '#D4A017' }}
            animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
      </motion.div>
    </section>
  )
}
