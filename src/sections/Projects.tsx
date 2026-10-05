import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { projects, type Project, type ProjectVisual } from '../content'
import { Reveal, SectionLabel } from '../components/Reveal'
import TiltCard from '../components/TiltCard'
import { Arrow } from '../components/Button'
import Orchestration from '../visuals/Orchestration'
import Scanner from '../visuals/Scanner'
import Journal from '../visuals/Journal'
import { usePrefersReducedMotion } from '../lib/hooks'

const visuals: Record<ProjectVisual, () => React.JSX.Element> = {
  orchestration: Orchestration,
  scanner: Scanner,
  journal: Journal,
}

export default function Projects() {
  return (
    <section id="work" aria-labelledby="work-title" className="relative mx-auto max-w-6xl px-5 py-28 outline-none sm:px-8 md:py-40">
      <SectionLabel index="03">Featured projects</SectionLabel>
      <div className="mb-20 flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <Reveal>
          <h2 id="work-title" className="max-w-2xl text-balance font-display text-4xl font-medium leading-[1.05] tracking-[-0.03em] sm:text-5xl">
            Products where the AI is the easy part.
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="max-w-sm text-muted">Three systems I’ve designed and built — each one a problem of reliability, trust, and signal-over-noise as much as modelling.</p>
        </Reveal>
      </div>

      <ol className="space-y-28 md:space-y-40">
        {projects.map((p, i) => (
          <ProjectRow key={p.id} project={p} index={i} />
        ))}
      </ol>
    </section>
  )
}

function ProjectRow({ project: p, index }: { project: Project; index: number }) {
  const ref = useRef<HTMLLIElement>(null)
  const reduced = usePrefersReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [36, -36])
  const Visual = visuals[p.visual]

  return (
    <li ref={ref} id={p.id} aria-labelledby={`${p.id}-title`} className="grid grid-cols-1 items-center gap-10 md:grid-cols-12 md:gap-12">
      {/* Visual */}
      <motion.div style={{ y }} className="min-w-0 md:col-span-7">
        <div className="relative">
          <div aria-hidden className="absolute -inset-4 -z-10 sm:-inset-8 rounded-[3rem] opacity-40 blur-3xl" style={{ background: `radial-gradient(circle at 50% 50%, ${p.accent}33, transparent 65%)` }} />
          <TiltCard glow={p.accent} cursorLabel="Explore" className="min-h-[460px] sm:aspect-[4/3.4] sm:min-h-0">
            <Visual />
          </TiltCard>
        </div>
        <p className="sr-only">Illustrative interface mockup of {p.name}.</p>
      </motion.div>

      {/* Copy */}
      <div className="min-w-0 md:col-span-5">
        <Reveal>
          <div className="mb-5 flex flex-wrap items-center gap-3 font-mono text-[11px] uppercase tracking-[0.16em]">
            <span style={{ color: p.accent }}>{String(index + 1).padStart(2, '0')}</span>
            <span className="text-muted">{p.category}</span>
            <span className="text-dim">· {p.year}</span>
          </div>
          <h3 id={`${p.id}-title`} className="font-display text-4xl font-medium tracking-[-0.03em] sm:text-5xl">
            {p.url ? (
              <a href={p.url} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-fg/80">
                {p.name}
              </a>
            ) : (
              p.name
            )}
            {p.alias && <span className="text-dim"> / {p.alias}</span>}
          </h3>
          <p className="mt-4 text-pretty text-lg leading-snug text-fg/90">{p.tagline}</p>
          <p className="mt-2 text-sm text-dim">{p.role}</p>
        </Reveal>

        <div className="mt-8 space-y-6">
          <Reveal delay={0.05}>
            <Block label="Problem" color="#ff7a59">{p.problem}</Block>
          </Reveal>
          <Reveal delay={0.1}>
            <Block label="Solution" color={p.accent}>{p.solution}</Block>
          </Reveal>
        </div>

        <Reveal delay={0.12}>
          <ul className="mt-7 space-y-2.5">
            {p.highlights.map((h) => (
              <li key={h} className="flex gap-3 text-sm leading-relaxed text-muted">
                <span aria-hidden className="mt-2 size-1 shrink-0 rounded-full" style={{ background: p.accent }} />
                {h}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.14}>
          <dl className="mt-8 grid grid-cols-3 gap-px overflow-hidden rounded-2xl border border-line bg-line">
            {p.metrics.map((m) => (
              <div key={m.label} className="flex flex-col bg-ink p-4">
                <dt className="order-2 mt-1 text-[11px] leading-snug text-dim">{m.label}</dt>
                <dd className="font-display text-xl font-medium tracking-tight sm:text-2xl">{m.value}</dd>
              </div>
            ))}
          </dl>
          <ul className="mt-6 flex flex-wrap gap-1.5" aria-label="Tech stack">
            {p.stack.map((s) => (
              <li key={s} className="rounded-full border border-line px-2.5 py-1 font-mono text-[11px] text-fg/75">{s}</li>
            ))}
          </ul>
          <div className="mt-7 flex flex-wrap gap-5">
            {p.links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                {...(l.href.startsWith('http') && { target: '_blank', rel: 'noopener noreferrer' })}
                className="group inline-flex items-center gap-2 border-b border-line-strong pb-1 text-sm font-medium transition-colors hover:border-fg">
                {l.label} <span className="sr-only">for {p.name}</span>
                <Arrow />
              </a>
            ))}
          </div>
        </Reveal>
      </div>
    </li>
  )
}

function Block({ label, color, children }: { label: string; color: string; children: React.ReactNode }) {
  return (
    <div className="relative pl-5">
      <span aria-hidden className="absolute left-0 top-1 h-[calc(100%-0.25rem)] w-px" style={{ background: `linear-gradient(${color}, transparent)` }} />
      <h4 className="mb-1.5 font-mono text-[11px] uppercase tracking-[0.18em]" style={{ color }}>{label}</h4>
      <p className="text-pretty leading-relaxed text-muted">{children}</p>
    </div>
  )
}
