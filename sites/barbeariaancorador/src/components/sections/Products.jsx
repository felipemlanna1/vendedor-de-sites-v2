import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion, AnimatePresence } from 'motion/react'
import { Check, X, MessageCircle } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const IMAGE_MAP = {
  'Cera Strong Matte': '/images/products/strong-matte.webp',
  'Cera Matte Cream': '/images/products/matte-cream.webp',
  'Cera Medium Oil': '/images/products/medium-oil.webp',
  'SuperWax': '/images/products/superwax.webp',
  'Shine Effect': '/images/products/shine-effect.webp',
  'Matte Effect': '/images/products/matte-effect.webp',
  'Modelador em Pó': '/images/products/modelador-po.webp',
  'Gel Modelador Caballeros': '/images/products/gel-modelador-caballeros.webp',
  'Gel Modelador': '/images/products/gel-modelador.webp',
  'Grooming Spray': '/images/products/grooming-spray.webp',
  'Grooming Tonic': '/images/products/grooming-tonic.webp',
  'Leave In': '/images/products/leave-in.webp',
  'Shampoo Refreshing': '/images/products/shampoo-refreshing.webp',
  'Shampoo 2 em 1': '/images/products/shampoo-2em1.webp',
  'Beard Balm Cream': '/images/products/beard-balm.webp',
  'Beard Balm': '/images/products/beard-balm-caballeros.webp',
  'Beard Balm GOAT': '/images/products/beard-balm-goat.webp',
  'Beard Oil': '/images/products/beard-oil.webp',
  'Shaving Gel': '/images/products/shaving-gel.webp',
  'Pós Barba Menthol Classic': '/images/products/menthol.webp',
  'Pós Barba Herbal Essence': '/images/products/herbal.webp',
  'Pós Barba BayRum': '/images/products/bayrum.webp',
}

export default function Products({ content }) {
  const { t } = useTranslation()
  const sectionRef = useRef(null)
  const [filter, setFilter] = useState('all')
  const [page, setPage] = useState(0)
  const PER_PAGE = 8
  const products = content.products || {}
  const items = products.items || []

  const categories = ['all', ...new Set(items.map(i => i.category))]
  const all = filter === 'all' ? items : items.filter(i => i.category === filter)
  const totalPages = Math.ceil(all.length / PER_PAGE)
  const filtered = all.slice(page * PER_PAGE, (page + 1) * PER_PAGE)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const ctx = gsap.context(() => {
      gsap.fromTo(sectionRef.current.querySelector('.products-title'),
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', once: true }
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="products"
      ref={sectionRef}
      className="relative overflow-hidden py-20 md:py-28 px-5 md:px-16"
      style={{ background: 'var(--color-background)' }}
    >
      <div className="mx-auto" style={{ maxWidth: 'var(--max-width)' }}>
        {/* Header */}
        <div className="products-title text-center mb-10 md:mb-14">
          <div className="w-12 h-[2px] mx-auto mb-6" style={{ background: 'var(--color-primary)' }} />
          <h2
            className="text-3xl md:text-5xl tracking-[0.15em] mb-3"
            style={{ fontFamily: 'var(--font-display)', color: 'var(--color-primary)' }}
          >
            {products.title || 'Nossos Produtos'}
          </h2>
          <p className="text-sm md:text-base max-w-md mx-auto" style={{ color: 'var(--color-text-secondary)', lineHeight: 1.8 }}>
            {products.subtitle || 'Revendedores oficiais Caballeros & GOAT'}
          </p>
        </div>

        {/* Filters */}
        <div className="flex justify-center gap-2 mb-10">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => { setFilter(cat); setPage(0) }}
              className="text-[11px] uppercase tracking-[0.12em] px-4 py-2 border transition-all duration-300 cursor-pointer"
              style={{
                fontFamily: 'var(--font-body)',
                borderColor: filter === cat ? 'var(--color-primary)' : 'var(--color-border)',
                color: filter === cat ? 'var(--color-background)' : 'var(--color-text-secondary)',
                background: filter === cat ? 'var(--color-primary)' : 'transparent',
              }}
            >
              {cat === 'all' ? 'Todos' : cat}
            </button>
          ))}
        </div>

        {/* Products grid — responsive */}
        <div key={`page-${page}-${filter}`} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-5">
          {filtered.map((item, i) => (
            <ProductCard key={item.name} item={item} i={i} />
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={() => setPage(p => Math.max(0, p - 1))}
              disabled={page === 0}
              className="text-xs uppercase tracking-wider px-4 py-2 border transition-all duration-300 disabled:opacity-30 cursor-pointer disabled:cursor-default"
              style={{ borderColor: 'var(--color-border)', color: 'var(--color-text-secondary)', fontFamily: 'var(--font-display)' }}
            >
              ←
            </button>
            <span className="text-xs" style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-body)' }}>
              {page + 1} / {totalPages}
            </span>
            <button
              onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))}
              disabled={page >= totalPages - 1}
              className="text-xs uppercase tracking-wider px-4 py-2 border transition-all duration-300 disabled:opacity-30 cursor-pointer disabled:cursor-default"
              style={{ borderColor: 'var(--color-border)', color: 'var(--color-text-secondary)', fontFamily: 'var(--font-display)' }}
            >
              →
            </button>
          </div>
        )}

        {/* CTA — buy at the shop */}
        <div className="text-center mt-12">
          <p className="text-xs mb-4" style={{ color: 'var(--color-text-muted)' }}>
            {t('products.availableAt')}
          </p>
          <motion.a
            href={`https://wa.me/${content.business?.whatsapp || '5548988397456'}?text=Olá! Tenho interesse em produtos da Ancorador`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.12em] px-8 py-3"
            style={{
              fontFamily: 'var(--font-display)',
              background: 'var(--color-primary)',
              color: 'var(--color-background)',
              boxShadow: '0 4px 20px rgba(200,164,92,0.2)',
              transition: 'all 0.3s',
            }}
            whileHover={{ scale: 1.03, boxShadow: '0 6px 30px rgba(200,164,92,0.35)' }}
            whileTap={{ scale: 0.97 }}
          >
            <MessageCircle size={14} />
            {t('products.consultCta')}
          </motion.a>
        </div>
      </div>
    </section>
  )
}

function ProductCard({ item, i }) {
  const { t } = useTranslation()
  const image = IMAGE_MAP[item.name]

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4, delay: i * 0.05 }}
      className="group relative flex flex-col border overflow-hidden"
      style={{ borderColor: 'var(--color-border)', background: 'var(--color-surface)' }}
    >
      {/* Image or placeholder */}
      <div className="relative aspect-square overflow-hidden" style={{ background: 'var(--color-surface-light)' }}>
        {image ? (
          <motion.img
            src={image}
            alt={item.name}
            className="w-full h-full object-contain p-4"
            loading="lazy"
            whileHover={{ scale: 1.08 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-2xl md:text-3xl uppercase tracking-[0.15em] opacity-[0.12]"
              style={{ fontFamily: 'var(--font-display)', color: 'var(--color-primary)' }}>
              {item.brand}
            </span>
          </div>
        )}
        {/* Brand badge overlay */}
        <span
          className="absolute top-2 right-2 text-[9px] uppercase tracking-wider px-2 py-0.5"
          style={{
            background: item.brand === 'GOAT' ? 'rgba(184,134,11,0.9)' : 'rgba(200,164,92,0.9)',
            color: 'var(--color-background)',
            fontFamily: 'var(--font-body)',
          }}
        >
          {item.brand}
        </span>
      </div>

      {/* Info */}
      <div className="p-3 md:p-4 flex flex-col flex-1">
        <h3 className="text-xs md:text-sm leading-tight mb-1" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text-primary)' }}>
          {item.name}
        </h3>
        <p className="text-[11px] mb-3 flex-1" style={{ color: 'var(--color-text-muted)', lineHeight: 1.5 }}>
          {item.description}
        </p>

        <div className="flex items-end justify-between">
          <span className="text-lg" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-primary)' }}>
            R${item.price?.toFixed(2).replace('.', ',')}
          </span>
          {item.available ? (
            <span className="flex items-center gap-1 text-[10px] text-emerald-500">
              <Check size={11} /> {t('products.inStock')}
            </span>
          ) : (
            <span className="flex items-center gap-1 text-[10px] text-red-400/70">
              <X size={11} /> {t('products.outOfStock')}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  )
}
