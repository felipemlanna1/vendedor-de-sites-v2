import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'

/**
 * Monograma "mg" — logo real da Dra. Milena Grossi Germiniani.
 * PNG com fundo transparente extraído do branding original.
 * Contém: "mg" cursivo rose gold + círculo com
 * "ODONTOLOGIA ESPECIALIZADA" e "HARMONIZAÇÃO FACIAL" em arco.
 */
export default function Monogram({ size = 80, animate = true, className = '' }) {
  const ref = useRef(null)

  useEffect(() => {
    if (!animate || !ref.current) return
    gsap.fromTo(
      ref.current,
      { opacity: 0, scale: 0.85 },
      { opacity: 1, scale: 1, duration: 1, ease: 'power2.out', delay: 0.3 }
    )
  }, [animate])

  return (
    <img
      ref={ref}
      src="/images/logo-mg.png"
      alt="Monograma MG — Dra. Milena Grossi Germiniani — Odontologia Especializada e Harmonização Facial"
      width={size}
      height={size}
      className={`object-contain ${className}`}
      style={{ width: size, height: 'auto', opacity: animate ? 0 : 1 }}
    />
  )
}
