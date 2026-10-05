import { motion, useScroll, useSpring } from 'framer-motion'
import { useRef } from 'react'
import { education, experience } from '../content'
import { Reveal, SectionLabel } from '../components/Reveal'

export default function Experience() {
  const ref = useRef<HTMLOListElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 70%', 'end 60%'] })
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 })

  return (
    <section id="experience" aria-labelledby="exp-title" className="relative border-t border-line outline-none">
      <div className="mx-auto max-w-6xl px-5 py-28 sm:px-8 md:py-40">
        <SectionLabel index="04">Experience</SectionLabel>
        <div className="grid gap-14 md:grid-cols-12">
          <div className="md:col-span-4">
            <div className="md:sticky md:top-28">
              <Reveal>
                <h2 id="exp-title" className="text-balance font-display text-4xl font-medium leading-[1.05] tracking-[-0.03em] sm:text-5xl">
                  Three years, four teams, one habit: ship it.
                </h2>
              </Reveal>
              <Reveal delay={0.1} className="mt-10 rounded-3xl border border-line bg-ink-2 p-6">
                <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-dim">Education</p>
                <p className="mt-3 font-display text-lg font-medium">{education.degree}</p>
                <p className="mt-1 text-sm text-muted">{education.school}</p>
                <p className="mt-1 font-mono text-xs text-dim">{education.period}</p>
                <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.16em] text-dim">Certifications</p>
                <ul className="mt-3 space-y-1.5 text-sm text-muted">
                  {education.certifications.map((c) => (
                    <li key={c}>{c}</li>
                  ))}
                </ul>
              </Reveal>
            </div>
          </div>

          <ol ref={ref} className="relative md:col-span-8">
            <span aria-hidden className="absolute left-[7px] top-2 h-[calc(100%-1rem)] w-px bg-line" />
            <motion.span aria-hidden className="absolute left-[7px] top-2 h-[calc(100%-1rem)] w-px origin-top bg-accent" style={{ scaleY: progress }} />
            {experience.map((r, i) => (
              <li key={r.company} className="relative pb-14 pl-12 last:pb-0">
                <span aria-hidden className={`absolute left-0 top-1.5 size-[15px] rounded-full border-2 ${i === 0 ? 'border-accent bg-accent/30' : 'border-line-strong bg-ink'}`} />
                <Reveal>
                  <article className="group rounded-3xl border border-transparent p-0 transition-colors duration-500 md:-m-6 md:p-6 md:hover:border-line md:hover:bg-ink-2/60">
                    <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                      <h3 className="font-display text-xl font-medium tracking-tight sm:text-2xl">{r.title}</h3>
                      <p className="font-mono text-xs text-dim">{r.period}</p>
                    </div>
                    <p className="mt-1 text-muted">
                      <span className="text-fg/90 transition-colors group-hover:text-accent">{r.company}</span> · {r.mode}
                    </p>
                    <ul className="mt-5 space-y-2.5">
                      {r.points.map((pt) => (
                        <li key={pt} className="flex gap-3 text-sm leading-relaxed text-muted">
                          <span aria-hidden className="mt-2.5 h-px w-3 shrink-0 bg-dim" />
                          {pt}
                        </li>
                      ))}
                    </ul>
                    <ul className="mt-5 flex flex-wrap gap-1.5" aria-label="Key tools">
                      {r.tags.map((t) => (
                        <li key={t} className="rounded-full bg-fg/[0.05] px-2.5 py-1 font-mono text-[11px] text-fg/70">{t}</li>
                      ))}
                    </ul>
                  </article>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
