import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useRef, type ReactNode } from 'react'
import { useFinePointer, usePrefersReducedMotion } from '../lib/hooks'

/**
 * Card that tilts toward the cursor with a soft specular highlight.
 * Tilt is disabled for touch and reduced-motion users (the card just renders flat).
 */
export default function TiltCard({
  children,
  className = '',
  max = 8,
  glow = '#f2b441',
  cursorLabel,
}: {
  children: ReactNode
  className?: string
  max?: number
  glow?: string
  cursorLabel?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const fine = useFinePointer()
  const reduced = usePrefersReducedMotion()
  const active = fine && !reduced
  const px = useMotionValue(0.5)
  const py = useMotionValue(0.5)
  const sx = useSpring(px, { stiffness: 180, damping: 20 })
  const sy = useSpring(py, { stiffness: 180, damping: 20 })
  const rotateY = useTransform(sx, [0, 1], [-max, max])
  const rotateX = useTransform(sy, [0, 1], [max, -max])
  const gx = useTransform(sx, (v) => `${v * 100}%`)
  const gy = useTransform(sy, (v) => `${v * 100}%`)
  const bg = useMotionTemplate`radial-gradient(600px circle at ${gx} ${gy}, ${glow}1f, transparent 45%)`

  return (
    <div style={{ perspective: 1200 }} className={className}>
      <motion.div
        ref={ref}
        data-cursor={cursorLabel}
        onPointerMove={(e) => {
          if (!active || !ref.current) return
          const r = ref.current.getBoundingClientRect()
          px.set((e.clientX - r.left) / r.width)
          py.set((e.clientY - r.top) / r.height)
        }}
        onPointerLeave={() => {
          px.set(0.5)
          py.set(0.5)
        }}
        style={active ? { rotateX, rotateY, transformStyle: 'preserve-3d' } : undefined}
        className="dark-scope relative h-full overflow-hidden rounded-3xl border border-line bg-ink-2"
      >
        {active && <motion.div aria-hidden className="pointer-events-none absolute inset-0 z-10" style={{ background: bg }} />}
        {children}
      </motion.div>
    </div>
  )
}
