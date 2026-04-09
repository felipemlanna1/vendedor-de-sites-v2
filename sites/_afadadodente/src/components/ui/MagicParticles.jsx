import { useEffect, useState, useMemo } from 'react'
import Particles, { initParticlesEngine } from '@tsparticles/react'
import { loadSlim } from '@tsparticles/slim'

export default function MagicParticles({ className = '' }) {
  const [init, setInit] = useState(false)

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine)
    }).then(() => setInit(true))
  }, [])

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768

  const options = useMemo(() => ({
    fullScreen: false,
    background: { color: { value: 'transparent' } },
    fpsLimit: 60,
    particles: {
      number: { value: isMobile ? 12 : 30 },
      color: { value: ['#D4A843', '#F2B8C6', '#C9A2CB'] },
      move: {
        enable: true,
        speed: 0.4,
        direction: 'top',
        outModes: 'out',
        straight: false,
        random: true,
      },
      size: { value: { min: 1, max: 4 } },
      opacity: {
        value: { min: 0.08, max: 0.35 },
        animation: { enable: true, speed: 0.4, minimumValue: 0.05 },
      },
      links: { enable: false },
      shape: {
        type: 'star',
        options: { star: { sides: 4, inset: 2 } },
      },
    },
    interactivity: {
      events: {
        onHover: { enable: !isMobile, mode: 'repulse' },
      },
      modes: {
        repulse: { distance: 80, duration: 0.4 },
      },
    },
  }), [isMobile])

  if (!init) return null

  return (
    <Particles
      className={`absolute inset-0 pointer-events-none ${className}`}
      options={options}
    />
  )
}
