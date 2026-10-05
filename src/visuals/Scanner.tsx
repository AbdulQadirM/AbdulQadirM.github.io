import { WindowBar } from './Orchestration'

/** CodeGuard visual: a flagged diff, ranked findings, and a repo quality score. */
const code = [
  { n: 41, t: 'def get_user(request):', c: '' },
  { n: 42, t: '    uid = request.args["id"]', c: '' },
  { n: 43, t: '    q = f"SELECT * FROM users WHERE id={uid}"', c: 'bad' },
  { n: 44, t: '    return db.execute(q).fetchone()', c: '' },
  { n: 45, t: '', c: '' },
  { n: 46, t: 'STRIPE_KEY = "sk_live_51Hx…"', c: 'warn' },
]

const findings = [
  { sev: 'Critical', label: 'SQL injection via f-string', file: 'api/users.py:43', color: '#ff7a59' },
  { sev: 'High', label: 'Live secret committed', file: 'config.py:46', color: '#ffb35c' },
  { sev: 'Low', label: 'Cyclomatic complexity 18', file: 'billing/sync.py', color: '#8b9cff' },
]

export default function Scanner() {
  const score = 72
  const c = 2 * Math.PI * 26
  return (
    <div className="flex h-full flex-col p-5 sm:p-7" aria-hidden="true">
      <WindowBar title="codeguard · PR #312 · 3 findings (41 suppressed)" accent="#ff7a59" />
      <div className="mt-4 overflow-hidden rounded-2xl border border-line bg-ink/60 font-mono text-[10.5px] leading-6 sm:text-[11.5px]">
        {code.map((l) => (
          <div
            key={l.n}
            className={`flex gap-4 px-4 ${l.c === 'bad' ? 'bg-coral/10' : l.c === 'warn' ? 'bg-[#ffb35c]/10' : ''}`}
          >
            <span className="w-5 shrink-0 text-right text-dim">{l.n}</span>
            <span className={`truncate whitespace-pre ${l.c === 'bad' ? 'text-coral' : l.c === 'warn' ? 'text-[#ffb35c]' : 'text-fg/75'}`}>{l.t || ' '}</span>
          </div>
        ))}
        <div className="truncate border-t border-line bg-ink-3/60 px-4 py-2.5 text-[10.5px] text-muted">
          <span className="text-accent">suggested fix</span> · use a parameterized query → <span className="text-fg/80">db.execute("… WHERE id=%s", (uid,))</span>
        </div>
      </div>

      <div className="mt-4 grid flex-1 grid-cols-[1fr_auto] gap-4">
        <ul className="space-y-2">
          {findings.map((f) => (
            <li key={f.label} className="flex items-center gap-3 rounded-xl border border-line bg-ink/60 px-3.5 py-2.5">
              <span className="rounded-md px-1.5 py-0.5 font-mono text-[9.5px] font-semibold uppercase" style={{ color: f.color, background: `${f.color}1a` }}>
                {f.sev}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-[12px] text-fg">{f.label}</span>
                <span className="block truncate font-mono text-[10px] text-dim">{f.file}</span>
              </span>
            </li>
          ))}
        </ul>
        <div className="hidden flex-col items-center justify-center rounded-2xl border border-line bg-ink/60 px-5 sm:flex">
          <div className="relative grid size-20 place-items-center">
          <svg viewBox="0 0 64 64" className="absolute inset-0 size-20 -rotate-90">
            <circle cx="32" cy="32" r="26" fill="none" stroke="rgba(255,255,255,.08)" strokeWidth="5" />
            <circle cx="32" cy="32" r="26" fill="none" stroke="#f2b441" strokeWidth="5" strokeLinecap="round" strokeDasharray={c} strokeDashoffset={c * (1 - score / 100)} />
          </svg>
          <span className="font-display text-xl font-medium">{score}</span>
          </div>
          <span className="mt-2 font-mono text-[10px] uppercase tracking-wider text-dim">quality</span>
        </div>
      </div>
    </div>
  )
}
