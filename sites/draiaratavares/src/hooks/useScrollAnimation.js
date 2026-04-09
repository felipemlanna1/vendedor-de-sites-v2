import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * Hook para animacoes GSAP com ScrollTrigger.
 * Usa gsap.context() para cleanup automatico no unmount.
 *
 * @param {Function} animation - Funcao que recebe (ctx, el) e cria as animacoes
 * @param {Array} deps - Dependencias do useEffect
 * @returns {React.RefObject} ref para o elemento container
 */
export function useScrollAnimation(animation, deps = []) {
  const ref = useRef(null)

  useEffect(() => {
    if (!ref.current) return

    const ctx = gsap.context(() => {
      animation(ref.current)
    }, ref)

    return () => ctx.revert()
  }, deps)

  return ref
}

/**
 * Hook para fade-in simples ao entrar na viewport.
 *
 * @param {Object} options
 * @param {number} options.y - Offset Y inicial (default: 40)
 * @param {number} options.duration - Duracao em segundos (default: 0.8)
 * @param {number} options.delay - Delay em segundos (default: 0)
 * @param {string} options.ease - Easing (default: 'power3.out')
 * @returns {React.RefObject}
 */
export function useFadeIn({ y = 40, duration = 0.8, delay = 0, ease = 'power3.out' } = {}) {
  return useScrollAnimation((el) => {
    gsap.from(el, {
      y,
      opacity: 0,
      duration,
      delay,
      ease,
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    })
  })
}

/**
 * Hook para stagger de filhos ao entrar na viewport.
 *
 * @param {string} childSelector - CSS selector dos filhos
 * @param {Object} options
 * @returns {React.RefObject}
 */
export function useStaggerIn(childSelector, { y = 30, duration = 0.6, stagger = 0.1, ease = 'power3.out' } = {}) {
  return useScrollAnimation((el) => {
    gsap.from(el.querySelectorAll(childSelector), {
      y,
      opacity: 0,
      duration,
      stagger,
      ease,
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    })
  })
}
