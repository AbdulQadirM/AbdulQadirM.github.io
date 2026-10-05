import Lenis from 'lenis'
import { createContext, useContext, useEffect, useRef, type ReactNode } from 'react'
import { usePrefersReducedMotion } from './hooks'

const LenisCtx = createContext<{ current: Lenis | null }>({ current: null })

/** Smooth, inertial scrolling (disabled for reduced-motion users → native scroll). */
export function SmoothScroll({ children }: { children: ReactNode }) {
  const reduced = usePrefersReducedMotion()
  const ref = useRef<Lenis | null>(null)

  useEffect(() => {
    if (reduced) return
    const lenis = new Lenis({ duration: 1.1, smoothWheel: true, anchors: false })
    ref.current = lenis
    let raf = 0
    const loop = (t: number) => {
      lenis.raf(t)
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => {
      cancelAnimationFrame(raf)
      lenis.destroy()
      ref.current = null
    }
  }, [reduced])

  return <LenisCtx.Provider value={ref}>{children}</LenisCtx.Provider>
}

/** Returns a function that scrolls to a section id and moves focus there for keyboard/screen-reader users. */
export function useScrollTo() {
  const lenis = useContext(LenisCtx)
  return (id: string) => {
    const el = id === 'top' ? document.body : document.getElementById(id)
    if (!el) return
    const focus = () => {
      if (id === 'top') return
      el.setAttribute('tabindex', '-1')
      el.focus({ preventScroll: true })
    }
    if (lenis.current) {
      lenis.current.scrollTo(id === 'top' ? 0 : el, { offset: -72, onComplete: focus })
    } else {
      const y = id === 'top' ? 0 : el.getBoundingClientRect().top + window.scrollY - 72
      window.scrollTo({ top: y, behavior: 'auto' })
      focus()
    }
    history.replaceState(null, '', id === 'top' ? ' ' : `#${id}`)
  }
}
