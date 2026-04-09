/*
 * PATTERNS BANIDOS (anti-repeticao):
 * - Hero split 50/50 flex-row (afadadodente, draiaratavares)
 * - tsParticles / MagicParticles (afadadodente)
 * - Monograma centralizado hero (dramilenagrossigerminiani)
 * - Glassmorphism cards
 *
 * ELEMENTO ASSINATURA: "Raiz Viva"
 * SVG animado de raizes dentarias que se desenham ao scroll.
 * Usado no Hero (line-art decorativo), Especialidade (dente completo),
 * transicoes entre secoes, e Footer (versao simplificada).
 */
import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Variante compacta — line-art decorativo para hero e transicoes
export function RaizDecorativa({ className = '', color = 'var(--color-secondary)', size = 200 }) {
  const svgRef = useRef(null)

  useEffect(() => {
    const paths = svgRef.current?.querySelectorAll('.raiz-path')
    if (!paths?.length) return

    const ctx = gsap.context(() => {
      paths.forEach((path) => {
        const length = path.getTotalLength()
        gsap.set(path, { strokeDasharray: length, strokeDashoffset: length })
        gsap.to(path, {
          strokeDashoffset: 0,
          duration: 2.5,
          ease: 'power2.inOut',
          scrollTrigger: {
            trigger: svgRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        })
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 120 200"
      width={size}
      height={size * 1.67}
      className={className}
      fill="none"
      aria-hidden="true"
    >
      {/* Raiz principal */}
      <path
        className="raiz-path"
        d="M60 10 C60 10, 58 40, 60 70 C62 100, 55 130, 50 170"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
      {/* Ramificacao esquerda */}
      <path
        className="raiz-path"
        d="M58 50 C50 65, 35 80, 25 110 C20 125, 22 145, 20 165"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      {/* Ramificacao direita */}
      <path
        className="raiz-path"
        d="M62 55 C70 72, 82 85, 90 108 C95 120, 88 142, 85 160"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      {/* Sub-ramificacoes finas */}
      <path
        className="raiz-path"
        d="M45 90 C38 100, 32 115, 35 135"
        stroke={color}
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.7"
      />
      <path
        className="raiz-path"
        d="M75 95 C82 108, 78 120, 75 140"
        stroke={color}
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.7"
      />
      <path
        className="raiz-path"
        d="M55 110 C48 125, 42 140, 40 158"
        stroke={color}
        strokeWidth="0.8"
        strokeLinecap="round"
        opacity="0.5"
      />
      <path
        className="raiz-path"
        d="M65 105 C72 118, 68 132, 70 155"
        stroke={color}
        strokeWidth="0.8"
        strokeLinecap="round"
        opacity="0.5"
      />
    </svg>
  )
}

// Variante completa — dente com raizes para a secao de Especialidade
export function DenteRaiz({ className = '' }) {
  const svgRef = useRef(null)

  useEffect(() => {
    const paths = svgRef.current?.querySelectorAll('.tooth-path, .root-path')
    if (!paths?.length) return

    const ctx = gsap.context(() => {
      // Primeiro desenha a coroa do dente
      const toothPaths = svgRef.current.querySelectorAll('.tooth-path')
      const rootPaths = svgRef.current.querySelectorAll('.root-path')

      toothPaths.forEach((path) => {
        const length = path.getTotalLength()
        gsap.set(path, { strokeDasharray: length, strokeDashoffset: length })
        gsap.to(path, {
          strokeDashoffset: 0,
          duration: 1.5,
          ease: 'power2.inOut',
          scrollTrigger: {
            trigger: svgRef.current,
            start: 'top 75%',
            toggleActions: 'play none none none',
          },
        })
      })

      // Depois as raizes com delay
      rootPaths.forEach((path, i) => {
        const length = path.getTotalLength()
        gsap.set(path, { strokeDasharray: length, strokeDashoffset: length })
        gsap.to(path, {
          strokeDashoffset: 0,
          duration: 2,
          delay: 1 + i * 0.3,
          ease: 'power2.inOut',
          scrollTrigger: {
            trigger: svgRef.current,
            start: 'top 75%',
            toggleActions: 'play none none none',
          },
        })
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 160 280"
      className={`w-full max-w-[200px] md:max-w-[260px] h-auto ${className}`}
      fill="none"
      aria-hidden="true"
    >
      {/* Coroa do dente */}
      <path
        className="tooth-path"
        d="M45 90 C45 50, 55 30, 80 28 C105 30, 115 50, 115 90 C115 105, 108 115, 95 118 L90 120 C85 122, 80 122, 75 120 L68 118 C55 115, 45 105, 45 90Z"
        stroke="var(--color-primary)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Linha do canal interno */}
      <path
        className="tooth-path"
        d="M70 85 C72 95, 75 105, 78 115"
        stroke="var(--color-accent)"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.6"
      />
      <path
        className="tooth-path"
        d="M90 85 C88 95, 85 105, 82 115"
        stroke="var(--color-accent)"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.6"
      />
      {/* Raiz principal (central) */}
      <path
        className="root-path"
        d="M80 120 C80 140, 78 165, 76 190 C74 210, 72 230, 74 250"
        stroke="var(--color-secondary)"
        strokeWidth="2"
        strokeLinecap="round"
      />
      {/* Raiz esquerda */}
      <path
        className="root-path"
        d="M70 118 C65 135, 55 155, 48 180 C42 200, 38 220, 35 245"
        stroke="var(--color-secondary)"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      {/* Raiz direita */}
      <path
        className="root-path"
        d="M90 118 C95 138, 102 158, 108 180 C112 198, 118 218, 120 242"
        stroke="var(--color-secondary)"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      {/* Micro-ramificacoes */}
      <path
        className="root-path"
        d="M48 180 C42 192, 38 200, 30 215"
        stroke="var(--color-secondary)"
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.6"
      />
      <path
        className="root-path"
        d="M108 180 C115 192, 120 200, 128 212"
        stroke="var(--color-secondary)"
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.6"
      />
      <path
        className="root-path"
        d="M76 190 C70 202, 65 212, 60 225"
        stroke="var(--color-secondary)"
        strokeWidth="0.8"
        strokeLinecap="round"
        opacity="0.4"
      />
      <path
        className="root-path"
        d="M76 190 C82 205, 85 215, 90 228"
        stroke="var(--color-secondary)"
        strokeWidth="0.8"
        strokeLinecap="round"
        opacity="0.4"
      />
    </svg>
  )
}

// Divisor organico entre secoes — curvas que lembram raizes
export function RaizDivider({ flip = false, color = 'var(--color-background)', className = '' }) {
  return (
    <div className={`w-full overflow-hidden leading-none ${flip ? 'rotate-180' : ''} ${className}`} aria-hidden="true">
      <svg
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
        className="w-full h-12 md:h-16 lg:h-20"
        fill={color}
      >
        <path d="M0,40 C240,80 480,10 720,45 C960,80 1200,15 1440,40 L1440,80 L0,80 Z" />
      </svg>
    </div>
  )
}

// Versao mini para o footer
export function RaizMini({ className = '' }) {
  return (
    <svg
      viewBox="0 0 40 60"
      width="40"
      height="60"
      className={className}
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M20 5 C20 5, 19 15, 20 25 C21 35, 18 45, 16 55"
        stroke="var(--color-accent)"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M19 18 C15 25, 10 32, 8 42"
        stroke="var(--color-accent)"
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.7"
      />
      <path
        d="M21 20 C25 28, 28 35, 30 44"
        stroke="var(--color-accent)"
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.7"
      />
    </svg>
  )
}
