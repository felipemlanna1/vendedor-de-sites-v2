import { useRef, useEffect, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

export default function CountUp({ end, duration = 2, prefix = '', suffix = '', className = '', style = {} }) {
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
        onUpdate: () => setValue(Math.round(obj.val)),
      })
    })
    return () => ctx.revert()
  }, [end, duration])
  return <span ref={ref} className={className} style={style}>{prefix}{value.toLocaleString('pt-BR')}{suffix}</span>
}
