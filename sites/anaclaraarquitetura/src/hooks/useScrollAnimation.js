import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * Hook para animacoes GSAP com ScrollTrigger e cleanup automatico.
 * @param {Function} animationFn - Recebe (el, ctx) para criar a animacao
 * @param {Array} deps - Dependencias extras
 */
export default function useScrollAnimation(animationFn, deps = []) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const ctx = gsap.context(() => {
      animationFn(el, gsap, ScrollTrigger)
    })

    return () => ctx.revert()
  }, deps)

  return ref
}
