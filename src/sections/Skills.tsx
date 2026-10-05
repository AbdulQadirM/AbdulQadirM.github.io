import { motion } from 'framer-motion'
import { skills } from '../content'
import { Reveal, SectionLabel } from '../components/Reveal'

const glyphs = [
  // tiny line icons, one per group
  <path key="0" d="M4 12h4l2-6 4 12 2-6h4" />,
  <path key="1" d="M5 7h14M5 12h10M5 17h7" />,
  <g key="2"><circle cx="11" cy="11" r="6" /><path d="m20 20-4.5-4.5" /></g>,
  <path key="3" d="M8 7 3 12l5 5M16 7l5 5-5 5M14 4l-4 16" />,
  <g key="4"><rect x="4" y="4" width="16" height="6" rx="1.5" /><rect x="4" y="14" width="16" height="6" rx="1.5" /></g>,
  <g key="5"><circle cx="12" cy="12" r="3" /><path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12Z" /></g>,
]

export default function Skills() {
  return (
    <section id="skills" aria-labelledby="skills-title" className="relative border-y border-line bg-ink-2/40 outline-none">
      <div className="mx-auto max-w-6xl px-5 py-28 sm:px-8 md:py-36">
        <SectionLabel index="02">Skills</SectionLabel>
        <div className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <Reveal>
            <h2 id="skills-title" className="max-w-xl text-balance font-display text-4xl font-medium leading-[1.05] tracking-[-0.03em] sm:text-5xl">
              The whole path from prompt to production.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="max-w-sm text-muted">Tools change every quarter. These are the ones I reach for today, grouped by the problem they solve.</p>
          </Reveal>
        </div>

        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {skills.map((g, i) => (
            <motion.li
              key={g.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '0px 0px -10% 0px' }}
              transition={{ duration: 0.7, delay: (i % 3) * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="group relative overflow-hidden rounded-3xl border border-line bg-ink p-7 transition-colors duration-500 hover:border-line-strong"
            >
              <div aria-hidden className="absolute -right-16 -top-16 size-40 rounded-full bg-accent/0 blur-3xl transition-colors duration-700 group-hover:bg-accent/10" />
              <div className="mb-6 flex items-center justify-between">
                <svg viewBox="0 0 24 24" aria-hidden className="size-6 fill-none stroke-accent" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  {glyphs[i % glyphs.length]}
                </svg>
                <span className="font-mono text-xs text-dim">{String(i + 1).padStart(2, '0')}</span>
              </div>
              <h3 className="font-display text-xl font-medium tracking-tight">{g.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{g.blurb}</p>
              <ul className="mt-6 flex flex-wrap gap-1.5" aria-label={`${g.title} tools`}>
                {g.items.map((s) => (
                  <li key={s} className="rounded-full border border-line px-2.5 py-1 font-mono text-[11px] text-fg/80 transition-colors duration-300 hover:border-accent/50 hover:text-accent">
                    {s}
                  </li>
                ))}
              </ul>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  )
}
