import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useFinePointer, usePrefersReducedMotion } from '../lib/hooks'

/**
 * Two-part cursor: a precise dot plus a trailing ring that grows over interactive
 * elements. Elements can set `data-cursor="View"` to show a label inside the ring.
 * Only active for mouse/trackpad users without reduced-motion; everyone else keeps the native cursor.
 */
export default function Cursor() {
  const fine = useFinePointer()
  const reduced = usePrefersReducedMotion()
  const enabled = fine && !reduced

  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const rx = useSpring(x, { stiffness: 350, damping: 32, mass: 0.6 })
  const ry = useSpring(y, { stiffness: 350, damping: 32, mass: 0.6 })

  const [hover, setHover] = useState(false)
  const [label, setLabel] = useState<string | null>(null)
  const [down, setDown] = useState(false)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!enabled) return
    document.documentElement.classList.add('has-custom-cursor')

    const move = (e: PointerEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)
      setVisible(true)
      const t = e.target as HTMLElement | null
      const labelled = t?.closest<HTMLElement>('[data-cursor]')
      const interactive = t?.closest('a, button, [role="button"], input, textarea, select, label')
      setLabel(labelled?.dataset.cursor ?? null)
      setHover(!!labelled || !!interactive)
    }
    const leave = () => setVisible(false)
    const pd = () => setDown(true)
    const pu = () => setDown(false)

    window.addEventListener('pointermove', move, { passive: true })
    document.addEventListener('pointerleave', leave)
    window.addEventListener('pointerdown', pd)
    window.addEventListener('pointerup', pu)
    return () => {
      document.documentElement.classList.remove('has-custom-cursor')
      window.removeEventListener('pointermove', move)
      document.removeEventListener('pointerleave', leave)
      window.removeEventListener('pointerdown', pd)
      window.removeEventListener('pointerup', pu)
    }
  }, [enabled, x, y])

  if (!enabled) return null

  const size = label ? 84 : hover ? 46 : 30

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[70]" style={{ opacity: visible ? 1 : 0 }}>
      {/* Ring: solid theme-coloured stroke + a halo in the opposite tone (no blend modes,
          which wash out to near-invisible grey on light backgrounds). */}
      <motion.div
        className="fixed left-0 top-0 flex items-center justify-center rounded-full"
        style={{
          x: rx,
          y: ry,
          translateX: '-50%',
          translateY: '-50%',
          border: `1.5px solid ${label ? 'var(--color-accent)' : 'var(--cursor-mark)'}`,
          background: label
            ? 'var(--color-accent)'
            : hover
              ? 'color-mix(in oklab, var(--cursor-mark) 8%, transparent)'
              : 'transparent',
          boxShadow: '0 0 0 1px var(--cursor-halo), inset 0 0 0 1px var(--cursor-halo)',
          opacity: label || hover ? 1 : 0.7,
          transition: 'background-color .25s, border-color .25s, opacity .25s',
        }}
        animate={{ width: size, height: size, scale: down ? 0.85 : 1 }}
        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
      >
        <AnimatePresence>
          {label && (
            <motion.span
              key={label}
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              className="font-mono text-[11px] font-medium uppercase tracking-wider text-on-accent"
            >
              {label}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
      <motion.div
        className="fixed left-0 top-0 size-2 rounded-full"
        style={{
          x,
          y,
          translateX: '-50%',
          translateY: '-50%',
          background: 'var(--cursor-mark)',
          boxShadow: '0 0 0 1.5px var(--cursor-halo)',
        }}
        animate={{ opacity: label ? 0 : 1 }}
      />
    </div>
  )
}
