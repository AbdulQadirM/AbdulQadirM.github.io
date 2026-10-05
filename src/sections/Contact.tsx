import { useState } from 'react'
import { contact, site } from '../content'
import { Reveal, SectionLabel } from '../components/Reveal'
import { Arrow, Button } from '../components/Button'
import { useScrollTo } from '../lib/scroll'

export default function Contact() {
  const [copied, setCopied] = useState(false)
  const scrollTo = useScrollTo()

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(site.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      window.location.href = `mailto:${site.email}`
    }
  }

  const links = [
    { label: 'LinkedIn', href: site.links.linkedin },
    { label: 'GitHub', href: site.links.github },
    { label: 'Résumé', href: site.resumeUrl },
  ]

  return (
    <section id="contact" aria-labelledby="contact-title" className="relative overflow-hidden border-t border-line outline-none">
      <div aria-hidden className="absolute inset-x-0 bottom-0 h-[70%] bg-[radial-gradient(ellipse_60%_80%_at_50%_100%,rgba(242,180,65,0.10),transparent_70%)]" />
      <div className="relative mx-auto max-w-6xl px-5 pb-16 pt-28 sm:px-8 md:pt-40">
        <SectionLabel index="05">Contact</SectionLabel>
        <Reveal>
          <h2 id="contact-title" className="max-w-4xl text-balance font-display text-[clamp(2.5rem,6.5vw,5.5rem)] font-medium leading-[0.98] tracking-[-0.04em]">
            {contact.heading}
          </h2>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="mt-8 max-w-xl text-pretty text-lg leading-relaxed text-muted">{contact.sub}</p>
        </Reveal>

        <Reveal delay={0.14} className="mt-12 flex flex-col gap-4 sm:flex-row sm:items-center">
          <Button href={`mailto:${site.email}?subject=Hello%20Abdul`} data-cursor="Say hi">
            {site.email} <Arrow />
          </Button>
          <button
            type="button"
            onClick={copy}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-line-strong px-5 py-3.5 text-sm text-muted transition-colors hover:border-fg/60 hover:text-fg"
          >
            <svg viewBox="0 0 16 16" aria-hidden className="size-3.5 fill-none stroke-current" strokeWidth="1.5">
              {copied ? <path d="m3 8.5 3 3 7-7" /> : <><rect x="5" y="5" width="8" height="8" rx="1.5" /><path d="M3 10.5V4a1 1 0 0 1 1-1h6.5" /></>}
            </svg>
            <span aria-live="polite">{copied ? 'Copied' : 'Copy email'}</span>
          </button>
        </Reveal>

        <div className="mt-24 grid gap-10 border-t border-line pt-10 sm:grid-cols-3">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-dim">Based in</p>
            <p className="mt-2">{site.location}</p>
            <p className="text-sm text-muted">{site.timezone}</p>
          </div>
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-dim">Status</p>
            <p className="mt-2 flex items-center gap-2">
              <span className="size-2 rounded-full bg-accent" aria-hidden /> {site.availability}
            </p>
            {site.showPhone && <p className="mt-1 text-sm text-muted">{site.phone}</p>}
          </div>
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-dim">Elsewhere</p>
            <ul className="mt-2 flex flex-wrap gap-x-5 gap-y-2">
              {links.map((l) => (
                <li key={l.label}>
                  <a href={l.href} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-1.5 text-fg/90 transition-colors hover:text-accent">
                    {l.label} <Arrow />
                    <span className="sr-only">(opens in new tab)</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <footer className="mt-20 flex flex-col justify-between gap-4 font-mono text-xs text-dim sm:flex-row">
          <p>© {new Date().getFullYear()} {site.name}. Built with React, Three.js & Framer Motion.</p>
          <a href="#top" onClick={(e) => (e.preventDefault(), scrollTo('top'))} className="transition-colors hover:text-fg">
            Back to top ↑
          </a>
        </footer>
      </div>
    </section>
  )
}
