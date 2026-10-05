import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion'
import { useEffect, useState } from 'react'
import { nav, site } from '../content'
import { useActiveSection } from '../lib/hooks'
import { useScrollTo } from '../lib/scroll'
import ThemeToggle from './ThemeToggle'

const ids = nav.map((n) => n.id)

export default function Nav() {
  const scrollTo = useScrollTo()
  const active = useActiveSection(ids)
  const { scrollY, scrollYProgress } = useScroll()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  useMotionValueEvent(scrollY, 'change', (v) => setScrolled(v > 24))

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const go = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault()
    setOpen(false)
    scrollTo(id)
  }

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <motion.div aria-hidden className="absolute left-0 top-0 h-px origin-left bg-accent" style={{ scaleX: scrollYProgress, width: '100%' }} />
      <div
        className={`mx-auto mt-3 flex max-w-6xl items-center justify-between rounded-full px-4 py-2.5 transition-all duration-500 sm:px-5 ${
          scrolled || open ? 'mx-3 border border-line bg-ink/70 backdrop-blur-xl sm:mx-auto' : 'border border-transparent'
        }`}
      >
        <a href="#top" onClick={go('top')} className="flex items-center gap-2.5 font-display text-sm font-semibold tracking-tight">
          <span className="grid size-8 place-items-center rounded-full bg-accent font-bold text-on-accent">{site.shortName}</span>
          <span className="hidden sm:inline">{site.name}</span>
        </a>

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {nav.map((n) => (
              <li key={n.id}>
                <a
                  href={`#${n.id}`}
                  onClick={go(n.id)}
                  aria-current={active === n.id ? 'true' : undefined}
                  className={`relative rounded-full px-3.5 py-2 text-sm transition-colors duration-300 ${
                    active === n.id ? 'text-fg' : 'text-muted hover:text-fg'
                  }`}
                >
                  {active === n.id && (
                    <motion.span layoutId="nav-pill" className="absolute inset-0 -z-10 rounded-full bg-fg/[0.07]" transition={{ type: 'spring', stiffness: 380, damping: 32 }} />
                  )}
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          {site.immersiveUrl && (
            <a
              href={site.immersiveUrl}
              data-cursor="Enter"
              className="hidden items-center gap-2 rounded-full border border-line px-3.5 py-2 font-mono text-[11px] uppercase tracking-[0.14em] text-muted transition-colors duration-300 hover:border-accent hover:text-fg lg:inline-flex"
            >
              <span aria-hidden className="size-1.5 rounded-full bg-[#e0231c]" />
              3D version
            </a>
          )}
          <ThemeToggle />
          <a
            href={`mailto:${site.email}`}
            className="hidden rounded-full bg-fg px-4 py-2 text-sm font-medium text-ink transition-colors hover:bg-accent hover:text-on-accent sm:inline-block"
          >
            Get in touch
          </a>
          <button
            type="button"
            className="grid size-10 place-items-center rounded-full border border-line md:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((o) => !o)}
          >
            <span className="relative block h-3 w-4">
              <span className={`absolute left-0 block h-px w-4 bg-fg transition-all duration-300 ${open ? 'top-1.5 rotate-45' : 'top-0'}`} />
              <span className={`absolute left-0 block h-px w-4 bg-fg transition-all duration-300 ${open ? 'top-1.5 -rotate-45' : 'top-3'}`} />
            </span>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-menu"
            aria-label="Mobile"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="mx-3 mt-2 rounded-3xl border border-line bg-ink/95 p-3 backdrop-blur-xl md:hidden"
          >
            <ul>
              {nav.map((n) => (
                <li key={n.id}>
                  <a href={`#${n.id}`} onClick={go(n.id)} className="flex items-center justify-between rounded-2xl px-4 py-3.5 font-display text-lg hover:bg-fg/5">
                    {n.label}
                    <span className="font-mono text-xs text-dim">{String(ids.indexOf(n.id) + 1).padStart(2, '0')}</span>
                  </a>
                </li>
              ))}
              {site.immersiveUrl && (
                <li>
                  <a href={site.immersiveUrl} className="flex items-center justify-between rounded-2xl px-4 py-3.5 font-display text-lg hover:bg-fg/5">
                    3D version
                    <span aria-hidden className="size-2 rounded-full bg-[#e0231c]" />
                  </a>
                </li>
              )}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}
