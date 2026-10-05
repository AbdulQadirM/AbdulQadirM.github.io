import { motion, useMotionValue, useSpring } from 'framer-motion'
import type { ReactNode, AnchorHTMLAttributes } from 'react'
import { useFinePointer, usePrefersReducedMotion } from '../lib/hooks'

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & { variant?: 'primary' | 'ghost'; children: ReactNode }

/** Link-button with a gentle magnetic pull toward the cursor. */
export function Button({ variant = 'primary', children, className = '', ...rest }: Props) {
  const fine = useFinePointer()
  const reduced = usePrefersReducedMotion()
  const magnetic = fine && !reduced
  const x = useSpring(useMotionValue(0), { stiffness: 250, damping: 18 })
  const y = useSpring(useMotionValue(0), { stiffness: 250, damping: 18 })

  const base =
    'group relative inline-flex items-center gap-2.5 rounded-full px-6 py-3.5 text-sm font-medium transition-colors duration-300'
  const styles =
    variant === 'primary'
      ? 'bg-accent text-on-accent hover:bg-fg hover:text-ink'
      : 'border border-line-strong text-fg hover:border-fg/60 hover:bg-fg/[0.04]'

  return (
    <motion.a
      {...(rest as object)}
      style={{ x, y }}
      onPointerMove={(e) => {
        if (!magnetic) return
        const r = e.currentTarget.getBoundingClientRect()
        x.set((e.clientX - r.left - r.width / 2) * 0.25)
        y.set((e.clientY - r.top - r.height / 2) * 0.35)
      }}
      onPointerLeave={() => {
        x.set(0)
        y.set(0)
      }}
      className={`${base} ${styles} ${className}`}
    >
      {children}
    </motion.a>
  )
}

export function Arrow({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      aria-hidden="true"
      className={`size-3.5 transition-transform duration-300 ease-out-expo group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ${className}`}
    >
      <path d="M4 12 12 4M5.5 4H12v6.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
