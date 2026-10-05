import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Environment, Lightformer, PerformanceMonitor } from '@react-three/drei'
import { useEffect, useMemo, useRef, useState } from 'react'
import * as THREE from 'three'
import { useTheme } from '../lib/theme'

/**
 * Pointer position shared by the whole scene, normalized to [-1, 1] across the viewport.
 * Tracked on window so the object responds even when the cursor is over the headline.
 */
const pointer = { x: 0, y: 0 }
if (typeof window !== 'undefined') {
  window.addEventListener(
    'pointermove',
    (e) => {
      pointer.x = (e.clientX / window.innerWidth) * 2 - 1
      pointer.y = -((e.clientY / window.innerHeight) * 2 - 1)
    },
    { passive: true },
  )
}

const ACCENT = new THREE.Color('#f2b441')
const IRIS = new THREE.Color('#8b9cff')

function Core({ still }: { still: boolean }) {
  const light = useTheme().theme === 'light'
  const group = useRef<THREE.Group>(null!)
  const shell = useRef<THREE.Mesh>(null!)
  const cage = useRef<THREE.LineSegments>(null!)
  const ring = useRef<THREE.Mesh>(null!)
  const ring2 = useRef<THREE.Mesh>(null!)
  const key = useRef<THREE.PointLight>(null!)
  const { viewport } = useThree()

  const cageGeo = useMemo(() => new THREE.EdgesGeometry(new THREE.IcosahedronGeometry(1.55, 1)), [])
  const coreGeo = useMemo(() => new THREE.IcosahedronGeometry(1, 0), [])

  useFrame((state, dt) => {
    const d = Math.min(dt, 1 / 30)
    const t = state.clock.elapsedTime
    const scroll = Math.min(window.scrollY / window.innerHeight, 1.2)

    // Ease rotation toward the cursor — subtle, damped, never snappy.
    const tx = pointer.y * 0.45
    const ty = pointer.x * 0.65
    group.current.rotation.x = THREE.MathUtils.damp(group.current.rotation.x, tx + scroll * 0.6, 3, d)
    group.current.rotation.y = THREE.MathUtils.damp(group.current.rotation.y, ty + scroll * 1.2, 3, d)
    group.current.position.y = THREE.MathUtils.damp(group.current.position.y, Math.sin(t * 0.6) * 0.08 + scroll * 0.9, 4, d)
    const s = 0.85 - scroll * 0.2
    group.current.scale.setScalar(THREE.MathUtils.damp(group.current.scale.x, s, 4, d))

    shell.current.rotation.y += d * 0.12
    shell.current.rotation.z += d * 0.05
    cage.current.rotation.y -= d * 0.08
    cage.current.rotation.x += d * 0.03
    ring.current.rotation.z += d * 0.2
    ring2.current.rotation.z -= d * 0.14

    // Key light follows the cursor so facets catch light as you move.
    key.current.position.x = THREE.MathUtils.damp(key.current.position.x, pointer.x * viewport.width * 0.6, 4, d)
    key.current.position.y = THREE.MathUtils.damp(key.current.position.y, pointer.y * viewport.height * 0.6, 4, d)

    // Parallax depth: camera drifts opposite to the cursor.
    state.camera.position.x = THREE.MathUtils.damp(state.camera.position.x, -pointer.x * 0.35, 2.5, d)
    state.camera.position.y = THREE.MathUtils.damp(state.camera.position.y, -pointer.y * 0.25, 2.5, d)
    state.camera.lookAt(0, 0, 0)
  })

  // Render one frame for reduced-motion users; no continuous animation.
  const invalidate = useThree((s) => s.invalidate)
  useEffect(() => {
    if (still) invalidate()
  }, [still, invalidate])

  return (
    <>
      <pointLight ref={key} position={[2, 2, 3.5]} intensity={28} distance={12} color={ACCENT} />
      <pointLight position={[-4, -2, -2]} intensity={30} distance={14} color={IRIS} />
      <directionalLight position={[3, 5, 2]} intensity={0.6} />

      <group ref={group}>
        <mesh ref={shell} geometry={coreGeo}>
          <meshPhysicalMaterial
            color="#2a2f3a"
            metalness={0.35}
            roughness={0.22}
            clearcoat={1}
            clearcoatRoughness={0.08}
            iridescence={0.6}
            iridescenceIOR={1.4}
            flatShading
            envMapIntensity={1.1}
          />
        </mesh>

        <lineSegments ref={cage} geometry={cageGeo}>
          <lineBasicMaterial color={light ? '#a8680a' : '#f2b441'} transparent opacity={light ? 0.3 : 0.22} />
        </lineSegments>

        <mesh ref={ring} rotation={[Math.PI / 2.3, 0.2, 0]}>
          <torusGeometry args={[2.15, 0.008, 8, 160]} />
          <meshBasicMaterial color={light ? '#a8680a' : '#f2b441'} transparent opacity={light ? 0.7 : 0.55} />
        </mesh>
        <mesh ref={ring2} rotation={[Math.PI / 1.7, -0.5, 0.4]}>
          <torusGeometry args={[2.5, 0.005, 8, 160]} />
          <meshBasicMaterial color={light ? '#4d5bd1' : '#8b9cff'} transparent opacity={light ? 0.5 : 0.4} />
        </mesh>

        <Satellites />
      </group>

      <Dust />
    </>
  )
}

/** Small nodes orbiting the core — a nod to agents calling tools. */
function Satellites() {
  const ref = useRef<THREE.Group>(null!)
  const nodes = useMemo(
    () =>
      Array.from({ length: 6 }, (_, i) => {
        const a = (i / 6) * Math.PI * 2
        return { pos: [Math.cos(a) * 2.15, Math.sin(a) * 0.35, Math.sin(a) * 2.15] as const, big: i % 3 === 0 }
      }),
    [],
  )
  useFrame((_, dt) => {
    ref.current.rotation.y += Math.min(dt, 1 / 30) * 0.25
  })
  return (
    <group ref={ref} rotation={[0.35, 0, 0.1]}>
      {nodes.map((n, i) => (
        <mesh key={i} position={n.pos as unknown as THREE.Vector3Tuple}>
          <octahedronGeometry args={[n.big ? 0.075 : 0.045, 0]} />
          <meshStandardMaterial color={n.big ? '#f2b441' : '#eef0f3'} emissive={n.big ? '#f2b441' : '#8b9cff'} emissiveIntensity={0.8} />
        </mesh>
      ))}
    </group>
  )
}

function Dust({ count = 380 }) {
  const light = useTheme().theme === 'light'
  const ref = useRef<THREE.Points>(null!)
  const positions = useMemo(() => {
    // Seeded PRNG keeps the star field identical across renders.
    let seed = 7
    const rand = () => ((seed = (seed * 16807) % 2147483647) - 1) / 2147483646
    const p = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const r = 3 + rand() * 5
      const th = rand() * Math.PI * 2
      const ph = Math.acos(2 * rand() - 1)
      p[i * 3] = r * Math.sin(ph) * Math.cos(th)
      p[i * 3 + 1] = r * Math.sin(ph) * Math.sin(th) * 0.6
      p[i * 3 + 2] = r * Math.cos(ph) - 2
    }
    return p
  }, [count])
  useFrame((_, dt) => {
    ref.current.rotation.y += Math.min(dt, 1 / 30) * 0.015
    ref.current.rotation.x = THREE.MathUtils.damp(ref.current.rotation.x, pointer.y * 0.08, 2, dt)
  })
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.018} color={light ? '#3a404c' : '#c9d0dc'} transparent opacity={light ? 0.45 : 0.55} sizeAttenuation depthWrite={false} />
    </points>
  )
}

export default function HeroScene({ still = false }: { still?: boolean }) {
  const wrap = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(true)
  const [dpr, setDpr] = useState(1.5)

  // Stop rendering entirely when the hero is scrolled out of view.
  useEffect(() => {
    const el = wrap.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0 })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div ref={wrap} className="absolute inset-0" aria-hidden="true">
      <Canvas
        dpr={dpr}
        frameloop={still ? 'demand' : visible ? 'always' : 'never'}
        camera={{ position: [0, 0, 7.4], fov: 38 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        onCreated={({ gl }) => {
          gl.toneMapping = THREE.ACESFilmicToneMapping
          gl.toneMappingExposure = 1.1
        }}
      >
        <PerformanceMonitor onDecline={() => setDpr(1)} onIncline={() => setDpr(1.5)} />
        {/* Procedural environment — no HDR download needed. */}
        <Environment resolution={64} frames={1}>
          <Lightformer form="rect" intensity={2} position={[0, 4, 2]} scale={[8, 1.5, 1]} color="#ffffff" />
          <Lightformer form="rect" intensity={1.4} position={[-5, 0, 1]} scale={[2, 6, 1]} color="#8b9cff" />
          <Lightformer form="rect" intensity={1.2} position={[5, -1, 1]} scale={[2, 6, 1]} color="#f2b441" />
          <Lightformer form="ring" intensity={0.8} position={[0, 0, -6]} scale={6} color="#ffffff" />
        </Environment>
        <Core still={still} />
      </Canvas>
    </div>
  )
}
