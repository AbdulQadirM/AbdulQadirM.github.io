import { about } from '../content'
import { Reveal, SectionLabel } from '../components/Reveal'

export default function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="relative mx-auto max-w-6xl px-5 py-28 outline-none sm:px-8 md:py-40">
      <SectionLabel index="01">About</SectionLabel>
      <div className="grid gap-14 md:grid-cols-12">
        <Reveal className="md:col-span-5">
          <h2 id="about-title" className="text-balance font-display text-4xl font-medium leading-[1.05] tracking-[-0.03em] sm:text-5xl">
            {about.heading}
          </h2>
        </Reveal>
        <div className="space-y-6 md:col-span-7 md:pt-2">
          {about.paragraphs.map((p, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <p className={`text-pretty leading-relaxed ${i === 0 ? 'text-lg text-fg sm:text-xl' : 'text-muted'}`}>{p}</p>
            </Reveal>
          ))}
        </div>
      </div>

      <dl className="mt-20 grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-line bg-line md:grid-cols-4">
        {about.stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.06} className="group flex flex-col bg-ink p-6 transition-colors duration-500 hover:bg-ink-2 sm:p-8">
            <dt className="order-2 mt-3 text-sm leading-snug text-muted">{s.label}</dt>
            <dd className="font-display text-4xl font-medium tracking-tight text-fg transition-colors duration-500 group-hover:text-accent sm:text-5xl">
              {s.value}
            </dd>
          </Reveal>
        ))}
      </dl>
    </section>
  )
}
