import { useRef, useEffect, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

export default function CountUp({ end, duration = 2, decimals = 0, prefix = '', suffix = '', className = '' }) {
  const ref = useRef(null)
  const [value, setValue] = useState(0)
  useEffect(() => {
    const ctx = gsap.context(() => {
      const obj = { val: 0 }
      gsap.to(obj, {
        val: end,
        duration,
        ease: 'power2.out',
        scrollTrigger: { trigger: ref.current, start: 'top 80%', toggleActions: 'play none none none' },
        onUpdate: () => {
          if (decimals > 0) {
            setValue(parseFloat(obj.val.toFixed(decimals)))
          } else {
            setValue(Math.round(obj.val))
          }
        },
      })
    })
    return () => ctx.revert()
  }, [end, duration, decimals])
  return <span ref={ref} className={className}>{prefix}{decimals > 0 ? value.toFixed(decimals) : value.toLocaleString('pt-BR')}{suffix}</span>
}
