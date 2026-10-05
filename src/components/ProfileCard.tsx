import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform, type MotionValue } from 'framer-motion'
import { useEffect } from 'react'
import { about, hero, site } from '../content'
import { useFinePointer, usePrefersReducedMotion } from '../lib/hooks'

/**
 * Hero identity card: portrait, name, title and a few facts, built in stacked 3D layers.
 * On desktop the whole stack tilts toward the cursor and the layers separate in depth
 * (parallax). On touch / reduced-motion it renders flat.
 *
 * Photo: set `site.portrait` in content.ts (file in /public). Empty → monogram artwork.
 */
export default function ProfileCard() {
  const fine = useFinePointer()
  const reduced = usePrefersReducedMotion()
  const active = fine && !reduced

  const nx = useMotionValue(0)
  const ny = useMotionValue(0)
  const sx = useSpring(nx, { stiffness: 90, damping: 18, mass: 0.8 })
  const sy = useSpring(ny, { stiffness: 90, damping: 18, mass: 0.8 })
  const rotateY = useTransform(sx, [-1, 1], [-14, 14])
  const rotateX = useTransform(sy, [-1, 1], [10, -10])
  const shineX = useTransform(sx, [-1, 1], ['15%', '85%'])
  const shineY = useTransform(sy, [-1, 1], ['85%', '15%'])
  const shine = useMotionTemplate`radial-gradient(420px circle at ${shineX} ${shineY}, rgba(255,255,255,0.14), transparent 55%)`

  useEffect(() => {
    if (!active) return
    const move = (e: PointerEvent) => {
      nx.set((e.clientX / window.innerWidth) * 2 - 1)
      ny.set(-((e.clientY / window.innerHeight) * 2 - 1))
    }
    window.addEventListener('pointermove', move, { passive: true })
    return () => window.removeEventListener('pointermove', move)
  }, [active, nx, ny])

  const years = about.stats.find((s) => s.label.includes('years'))?.value ?? '3+'
  const portrait = site.portrait ? `${import.meta.env.BASE_URL}${site.portrait.replace(/^\//, '')}` : ''

  return (
    <motion.figure
      initial={{ opacity: 0, y: 30, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 1.1, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="dark-scope relative mx-auto w-full max-w-[380px]"
      style={{ perspective: 1100 }}
      aria-label={`${site.name}, ${site.role}`}
    >
      <motion.div
        style={active ? { rotateX, rotateY, transformStyle: 'preserve-3d' } : undefined}
        className="relative"
      >
        {/* Card body */}
        <div
          className="relative overflow-hidden rounded-[28px] border border-line-strong bg-ink-2/90 p-3 shadow-[0_40px_120px_-30px_rgba(0,0,0,0.9)] backdrop-blur-md"
          style={{ transform: active ? 'translateZ(0px)' : undefined }}
        >
          <div className="flex items-center justify-between px-2 pb-3 pt-1 font-mono text-[10px] uppercase tracking-[0.18em] text-dim">
            <span>Portfolio · {new Date().getFullYear()}</span>
            <span className="flex items-center gap-1.5 text-muted">
              <span className="size-1.5 rounded-full bg-accent" aria-hidden /> Available
            </span>
          </div>

          {/* Portrait */}
          <div className="relative aspect-[4/5] overflow-hidden rounded-[20px] bg-ink-3">
            {portrait ? (
              <img src={portrait} alt={`Portrait of ${site.name}`} className="absolute inset-0 size-full object-cover" loading="eager" decoding="async" />
            ) : (
              <Monogram />
            )}
            <div aria-hidden className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-ink via-ink/70 to-transparent" />

            <figcaption className="absolute inset-x-0 bottom-0 p-5">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent">Hello, I’m</p>
              <p className="mt-1.5 font-display text-[2.6rem] font-semibold leading-[0.95] tracking-[-0.03em] text-fg">{site.name}</p>
              <p className="mt-2 bg-gradient-to-r from-accent via-[#ffcf7a] to-iris bg-clip-text font-display text-xl font-medium tracking-tight text-transparent">
                {site.role}
              </p>
            </figcaption>
          </div>

          {/* Facts */}
          <dl className="grid grid-cols-3 gap-2 px-1 pb-1 pt-3">
            <Fact label="Based" value={site.location.split(',')[0]} />
            <Fact label="Now" value={site.currentCompany.split(' ')[0]} />
            <Fact label="Shipping" value={`${years} yrs`} />
          </dl>

          {active && <motion.div aria-hidden className="pointer-events-none absolute inset-0 rounded-[28px]" style={{ background: shine }} />}
          {import.meta.env.DEV && !site.portrait && (
            <span className="absolute right-4 top-12 rounded border border-dashed border-coral/70 bg-ink/80 px-1.5 py-0.5 font-mono text-[10px] text-coral">
              add site.portrait
            </span>
          )}
        </div>

        {/* Floating chips — sit in front of the card in 3D space */}
        <div aria-hidden className="hidden md:block">
          <Chip active={active} z={90} className="-left-14 top-24" sx={sx} sy={sy} depth={10}>
            <span className="text-accent">◆</span> {hero.cardChips[0]}
          </Chip>
          <Chip active={active} z={70} className="-right-10 top-40" sx={sx} sy={sy} depth={8}>
            {hero.cardChips[1]}
          </Chip>
          <Chip active={active} z={110} className="-left-8 bottom-28" sx={sx} sy={sy} depth={14}>
            {hero.cardChips[2]}
          </Chip>
          <Chip active={active} z={60} className="-right-12 bottom-14" sx={sx} sy={sy} depth={6}>
            <span className="text-accent">{about.stats[0].value}</span> users
          </Chip>
        </div>
      </motion.div>
    </motion.figure>
  )
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-white/[0.03] px-3 py-2.5">
      <dt className="font-mono text-[9.5px] uppercase tracking-[0.16em] text-dim">{label}</dt>
      <dd className="mt-0.5 truncate text-[13px] text-fg">{value}</dd>
    </div>
  )
}

function Chip({
  children,
  className,
  z,
  active,
  sx,
  sy,
  depth,
}: {
  children: React.ReactNode
  className: string
  z: number
  active: boolean
  sx: MotionValue<number>
  sy: MotionValue<number>
  depth: number
}) {
  const x = useTransform(sx, [-1, 1], [-depth, depth])
  const y = useTransform(sy, [-1, 1], [depth, -depth])
  return (
    <motion.span
      style={active ? { x, y, translateZ: z } : undefined}
      className={`absolute whitespace-nowrap rounded-full border border-line-strong bg-ink/80 px-3.5 py-2 font-mono text-[11px] text-fg/90 shadow-[0_12px_40px_-12px_rgba(0,0,0,0.8)] backdrop-blur-md ${className}`}
    >
      {children}
    </motion.span>
  )
}

/** Placeholder artwork until a photo is added: generative monogram, no external assets. */
function Monogram() {
  return (
    <div aria-hidden className="absolute inset-0">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(242,180,65,0.35),transparent_55%),radial-gradient(circle_at_80%_60%,rgba(139,156,255,0.35),transparent_55%)]" />
      <div className="absolute inset-0 opacity-40 [background-image:linear-gradient(var(--color-line-strong)_1px,transparent_1px),linear-gradient(90deg,var(--color-line-strong)_1px,transparent_1px)] [background-size:28px_28px] [mask-image:linear-gradient(to_bottom,#000,transparent_85%)]" />
      <svg viewBox="0 0 200 250" className="absolute inset-0 size-full">
        <text
          x="100"
          y="120"
          textAnchor="middle"
          fontSize="96"
          fontWeight="700"
          letterSpacing="-3"
          fill="none"
          stroke="rgba(238,240,243,0.55)"
          strokeWidth="0.8"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          AQ
        </text>
        <circle cx="152" cy="54" r="3" fill="#f2b441" />
        <circle cx="46" cy="170" r="2" fill="#8b9cff" />
      </svg>
    </div>
  )
}
