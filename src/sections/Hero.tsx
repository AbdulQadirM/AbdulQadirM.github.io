import { motion, useScroll, useTransform } from 'framer-motion'
import { lazy, Suspense, useRef } from 'react'
import { hero, site } from '../content'
import { Arrow, Button } from '../components/Button'
import HeroFallback from '../three/HeroFallback'
import ProfileCard from '../components/ProfileCard'
import { useCanRender3D, usePrefersReducedMotion } from '../lib/hooks'
import { useScrollTo } from '../lib/scroll'

// three.js is only downloaded when the device can actually use it.
const HeroScene = lazy(() => import('../three/HeroScene'))

export default function Hero() {
  const can3D = useCanRender3D()
  const reduced = usePrefersReducedMotion()
  const scrollTo = useScrollTo()
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const textY = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : -80])
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  return (
    <section ref={ref} id="top" className="relative flex min-h-[100svh] items-center overflow-hidden" aria-labelledby="hero-title">
      {/* backdrop */}
      <div aria-hidden className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_70%_40%,rgba(139,156,255,0.08),transparent_70%)]" />
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.35] [background-image:linear-gradient(var(--color-line)_1px,transparent_1px),linear-gradient(90deg,var(--color-line)_1px,transparent_1px)] [background-size:72px_72px] [mask-image:radial-gradient(ellipse_70%_60%_at_60%_45%,#000_20%,transparent_75%)]"
      />

      <div className="absolute inset-0 hidden md:block md:left-[48%]">
        {can3D === true ? (
          <Suspense fallback={<HeroFallback />}>
            <HeroScene still={reduced} />
          </Suspense>
        ) : can3D === false ? (
          <HeroFallback />
        ) : null}
      </div>

      <div className="relative z-10 mx-auto grid w-full max-w-6xl items-center gap-14 px-5 pb-20 pt-32 sm:px-8 md:grid-cols-12 md:gap-8">
      <motion.div style={{ y: textY, opacity: fade }} className="md:col-span-7">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-line bg-ink/40 px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.18em] text-muted backdrop-blur"
        >
          <span className="relative flex size-2">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-60" />
            <span className="relative inline-flex size-2 rounded-full bg-accent" />
          </span>
          {hero.eyebrow}
        </motion.p>

        <h1 id="hero-title" className="font-display text-[clamp(2.6rem,5vw,4.9rem)] font-medium leading-[0.95] tracking-[-0.04em]">
          <span className="sr-only">{site.name} — </span>
          {hero.headline.map((line, i) => (
            <span key={line} className="block overflow-hidden pb-[0.06em]">
              <motion.span
                className={`block ${i === hero.headline.length - 1 ? 'text-accent' : ''}`}
                initial={{ y: '110%' }}
                animate={{ y: 0 }}
                transition={{ duration: 1, delay: 0.2 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.6 }}
          className="mt-8 max-w-xl text-pretty text-base leading-relaxed text-muted sm:text-lg"
        >
          {hero.sub}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.75 }}
          className="mt-10 flex flex-wrap items-center gap-3"
        >
          <Button href="#work" onClick={(e) => (e.preventDefault(), scrollTo('work'))}>
            See selected work <Arrow className="rotate-45" />
          </Button>
          <Button variant="ghost" href={site.resumeUrl} target="_blank" rel="noopener">
            Résumé (PDF) <Arrow />
          </Button>
        </motion.div>
      </motion.div>

      <motion.div style={{ opacity: fade }} className="md:col-span-5">
        <ProfileCard />
      </motion.div>
      </div>

      <motion.a
        href="#about"
        onClick={(e) => (e.preventDefault(), scrollTo('about'))}
        style={{ opacity: fade }}
        className="absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-3 font-mono text-[10px] uppercase tracking-[0.25em] text-dim transition-colors hover:text-fg md:flex"
      >
        Scroll
        <span className="relative h-10 w-px overflow-hidden bg-line-strong">
          <motion.span
            className="absolute left-0 top-0 h-4 w-px bg-accent"
            animate={reduced ? undefined : { y: [-16, 40] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          />
        </span>
      </motion.a>
    </section>
  )
}
