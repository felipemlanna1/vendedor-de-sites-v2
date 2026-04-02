// ============================================================
// TEMPLATES AVANCADOS DE ANIMACAO
// 3 libs extras: React Three Fiber, Lottie, tsParticles
// ============================================================

// ============================================================
// 1. REACT THREE FIBER — 3D no hero e backgrounds
// ============================================================
//
// QUANDO USAR:
// - Hero com geometria 3D que reage ao cursor
// - Background abstrato 3D (esferas, ondas, particulas 3D)
// - Modelo 3D do produto (se disponivel)
// - "Signature moment" — o elemento inesquecivel do site
//
// QUANDO NAO USAR:
// - Se o site e simples e nao precisa de 3D
// - Se performance no mobile e prioridade absoluta (3D e pesado)
// - Para TUDO — use com parcimonia (1-2 cenas no site maximo)

// === Hero com geometria 3D animada ===
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Environment, MeshDistortMaterial } from '@react-three/drei'
import { useRef } from 'react'

function AnimatedSphere({ color = '#4F46E5' }) {
  const meshRef = useRef()
  useFrame(({ clock }) => {
    meshRef.current.rotation.x = clock.getElapsedTime() * 0.2
    meshRef.current.rotation.y = clock.getElapsedTime() * 0.3
  })
  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={meshRef} scale={2}>
        <icosahedronGeometry args={[1, 4]} />
        <MeshDistortMaterial color={color} speed={2} distort={0.3} roughness={0.2} metalness={0.8} />
      </mesh>
    </Float>
  )
}

// Componente pronto para usar no Hero:
export function Hero3DBackground({ color, className = '' }) {
  return (
    <div className={`absolute inset-0 -z-10 ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        style={{ background: 'transparent' }}
        dpr={[1, 2]}  // retina mas com limite para performance
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <AnimatedSphere color={color} />
        <Environment preset="city" />
      </Canvas>
    </div>
  )
}

// === Background com ondas 3D (mais leve) ===
import { useMemo } from 'react'
import * as THREE from 'three'

function WavePlane() {
  const meshRef = useRef()
  const geometry = useMemo(() => new THREE.PlaneGeometry(20, 20, 64, 64), [])

  useFrame(({ clock }) => {
    const positions = meshRef.current.geometry.attributes.position
    const time = clock.getElapsedTime()
    for (let i = 0; i < positions.count; i++) {
      const x = positions.getX(i)
      const y = positions.getY(i)
      positions.setZ(i, Math.sin(x * 0.5 + time) * 0.5 + Math.cos(y * 0.3 + time * 0.7) * 0.3)
    }
    positions.needsUpdate = true
  })

  return (
    <mesh ref={meshRef} rotation={[-Math.PI / 3, 0, 0]} position={[0, -2, 0]}>
      <primitive object={geometry} />
      <meshStandardMaterial color="var(--color-primary)" wireframe opacity={0.3} transparent />
    </mesh>
  )
}

// DICAS DE PERFORMANCE R3F:
// - Sempre definir dpr={[1, 2]} para limitar resolucao
// - Usar frameloop="demand" se a cena nao precisa animar constantemente
// - Carregar modelos GLTF com useGLTF de @react-three/drei (comprimidos com Draco)
// - No mobile: simplificar geometria (menos vertices) ou esconder 3D com useMediaQuery
// - Prefers-reduced-motion: substituir 3D por gradiente estatico


// ============================================================
// 2. LOTTIE — Micro-animacoes de alta qualidade
// ============================================================
//
// QUANDO USAR:
// - Loading states (spinner elaborado em vez de circulo generico)
// - Icones animados (check, star, heart, arrow, menu)
// - Ilustracoes de empty state / success / error
// - Transicoes entre secoes (separator animado)
// - Badge/selo animado (ex: "5 estrelas" com animacao)
//
// QUANDO NAO USAR:
// - Para animacoes de layout (use GSAP/Motion)
// - Para scroll-driven (use GSAP ScrollTrigger)
// - Para animacoes 3D (use R3F)
//
// ONDE BUSCAR ANIMACOES:
// - https://lottiefiles.com/ (milhares gratis)
// - Buscar por: "loading", "success", "star rating", "scroll down", "menu", etc

import { DotLottieReact } from '@lottiefiles/dotlottie-react'

// Lottie basico — autoplay em loop
export function LottieAnimation({ src, className = '', loop = true, autoplay = true, speed = 1 }) {
  return (
    <DotLottieReact
      src={src}  // URL do .lottie ou .json (de lottiefiles.com)
      loop={loop}
      autoplay={autoplay}
      speed={speed}
      className={className}
    />
  )
}

// Lottie com controle de scroll (anima conforme scrolla)
import { useRef as useR, useEffect as useE } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

export function LottieOnScroll({ src, className = '' }) {
  const containerRef = useR(null)
  const dotLottieRef = useR(null)

  useE(() => {
    if (!dotLottieRef.current) return
    const instance = dotLottieRef.current
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top 80%',
        end: 'bottom 20%',
        onUpdate: (self) => {
          // Mapear progresso do scroll (0-1) para frame da animacao
          const totalFrames = instance.totalFrames || 60
          instance.setFrame(Math.round(self.progress * totalFrames))
        },
      })
    })
    return () => ctx.revert()
  }, [])

  return (
    <div ref={containerRef} className={className}>
      <DotLottieReact
        ref={dotLottieRef}
        src={src}
        autoplay={false}
        loop={false}
      />
    </div>
  )
}

// Lottie com trigger no hover (icone que anima ao passar o mouse)
export function LottieOnHover({ src, className = '', size = 48 }) {
  const dotLottieRef = useR(null)

  return (
    <div
      className={className}
      style={{ width: size, height: size }}
      onMouseEnter={() => dotLottieRef.current?.play()}
      onMouseLeave={() => dotLottieRef.current?.stop()}
    >
      <DotLottieReact
        ref={dotLottieRef}
        src={src}
        autoplay={false}
        loop={false}
      />
    </div>
  )
}

// DICAS LOTTIE:
// - Preferir formato .lottie (comprimido) sobre .json
// - Animacoes pequenas (<50KB) para nao impactar carregamento
// - Buscar em lottiefiles.com com filtro "Free"
// - Customizar cores via DotLottie theming ou editar no LottieFiles editor


// ============================================================
// 3. TSPARTICLES — Backgrounds de particulas interativas
// ============================================================
//
// QUANDO USAR:
// - Background do hero com particulas que reagem ao cursor
// - Secao de impacto com confetti/celebracao
// - Background network (pontos conectados por linhas)
// - Efeito de nebula/galaxy como atmosfera
//
// QUANDO NAO USAR:
// - Se ja tem R3F no hero (escolher um ou outro, nao ambos)
// - Em TODAS as secoes (pesado se muitas instancias)
// - Se o conceito e clean/minimal (particulas sao barulho visual)

import Particles, { initParticlesEngine } from '@tsparticles/react'
import { loadSlim } from '@tsparticles/slim'
import { useEffect as useEff, useMemo as useM, useState as useS } from 'react'

export function ParticleBackground({ variant = 'network', color = '#4F46E5', className = '' }) {
  const [init, setInit] = useS(false)

  useEff(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine) // carrega so o necessario (~20KB vs ~100KB full)
    }).then(() => setInit(true))
  }, [])

  const configs = useM(() => ({
    // Network — pontos conectados por linhas (tech/science feel)
    network: {
      particles: {
        number: { value: 40, density: { enable: true, area: 800 } },
        color: { value: color },
        links: { enable: true, color: color, distance: 150, opacity: 0.15, width: 1 },
        move: { enable: true, speed: 0.8, direction: 'none', outModes: 'bounce' },
        size: { value: { min: 1, max: 3 } },
        opacity: { value: { min: 0.1, max: 0.4 } },
      },
      interactivity: {
        events: {
          onHover: { enable: true, mode: 'grab' },
        },
        modes: {
          grab: { distance: 200, links: { opacity: 0.3 } },
        },
      },
    },
    // Floating — particulas suaves flutuando (elegante/luxury)
    floating: {
      particles: {
        number: { value: 25 },
        color: { value: color },
        move: { enable: true, speed: 0.3, direction: 'top', outModes: 'out' },
        size: { value: { min: 1, max: 4 } },
        opacity: { value: { min: 0.05, max: 0.2 } },
        links: { enable: false },
      },
    },
    // Stars — estrelas piscando (hero dramatico)
    stars: {
      particles: {
        number: { value: 80 },
        color: { value: '#ffffff' },
        move: { enable: false },
        size: { value: { min: 0.5, max: 2 } },
        opacity: { value: { min: 0, max: 0.8 }, animation: { enable: true, speed: 0.5, minimumValue: 0 } },
        links: { enable: false },
      },
    },
  }), [color])

  if (!init) return null
  return (
    <Particles
      className={`absolute inset-0 -z-10 ${className}`}
      options={{
        fullScreen: false,
        background: { color: { value: 'transparent' } },
        fpsLimit: 60,
        ...configs[variant],
      }}
    />
  )
}

// DICAS TSPARTICLES:
// - Usar loadSlim() em vez de loadFull() — 5x menor
// - Limitar particles.number.value a < 60 no mobile
// - fpsLimit: 60 para nao queimar CPU
// - fullScreen: false para conter dentro de um div (nao cobrir a pagina)
// - Variantes por conceito:
//   - "network" → tech, ciencia, inovacao
//   - "floating" → elegante, luxury, clean
//   - "stars" → dramatico, dark theme, impactante
// - Detectar mobile e reduzir particulas:
//   const isMobile = window.innerWidth < 768
//   particles.number.value = isMobile ? 15 : 40


// ============================================================
// COMBINACOES RECOMENDADAS POR TIPO DE SECAO
// ============================================================
//
// HERO IMPACTANTE:
//   Opcao A: Hero3DBackground (R3F) + AnimatedText (Motion) + ParallaxImage (GSAP)
//   Opcao B: ParticleBackground (tsParticles) + AnimatedText + ScrollReveal
//   Opcao C: Video background (stock) + LottieAnimation (icone animado no CTA)
//
// SECAO NUMEROS/IMPACTO:
//   CountUp (GSAP) + LottieOnScroll (estrelas animadas) + ScrollReveal
//
// CARDAPIO/SERVICOS:
//   Tabs (Radix) + LottieOnHover (icone por servico) + stagger reveal (GSAP)
//
// DEPOIMENTOS:
//   Marquee (magic-ui) ou infinite-moving-cards (aceternity) + LottieAnimation (aspas)
//
// FOOTER CTA:
//   ParticleBackground("floating") + Button com Motion whileHover + LottieAnimation (arrow animado)
//
// LOADING/PRELOADER:
//   LottieAnimation com logo do cliente animado (se disponivel) ou abstract loader
