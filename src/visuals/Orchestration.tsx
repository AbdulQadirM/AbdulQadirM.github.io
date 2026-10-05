/** PatchPilot visual: an agent routing a run through tools, with a live trace. */
const tools = [
  { label: 'github.create_pr', x: 70, y: 60, ok: true },
  { label: 'postgres.query', x: 300, y: 50, ok: true },
  { label: 'slack.post', x: 318, y: 190, ok: true },
  { label: 'search.web', x: 290, y: 300, ok: false },
  { label: 'jira.update', x: 60, y: 290, ok: true },
]

export default function Orchestration() {
  return (
    <div className="relative flex h-full flex-col p-5 sm:p-7" aria-hidden="true">
      <WindowBar title="patchpilot · run #4821" accent="#f2b441" />
      <div className="relative mt-4 flex-1 overflow-hidden rounded-2xl border border-line bg-ink/60">
        <svg viewBox="0 0 440 360" className="h-full w-full">
          <defs>
            <radialGradient id="og" cx="50%" cy="50%" r="50%">
              <stop offset="0" stopColor="#f2b441" stopOpacity=".35" />
              <stop offset="1" stopColor="#f2b441" stopOpacity="0" />
            </radialGradient>
          </defs>
          {tools.map((t) => (
            <path
              key={t.label}
              d={`M220 180 Q ${(220 + t.x + 40) / 2} ${(180 + t.y) / 2 - 30} ${t.x + 40} ${t.y + 12}`}
              fill="none"
              stroke={t.ok ? '#f2b441' : '#ff7a59'}
              strokeOpacity={t.ok ? 0.55 : 0.7}
              strokeWidth="1.2"
              className="flow-dash"
            />
          ))}
          <circle cx="220" cy="180" r="70" fill="url(#og)" />
          <circle cx="220" cy="180" r="34" fill="#0d0f14" stroke="#f2b441" strokeWidth="1.2" />
          <text x="220" y="176" textAnchor="middle" className="fill-fg font-mono" fontSize="10">planner</text>
          <text x="220" y="191" textAnchor="middle" className="fill-accent font-mono" fontSize="8">step 4/6</text>
          {tools.map((t) => (
            <g key={t.label} transform={`translate(${t.x} ${t.y})`}>
              <rect width="112" height="24" rx="12" fill="#14171e" stroke={t.ok ? 'rgba(255,255,255,.14)' : '#ff7a59'} />
              <circle cx="12" cy="12" r="3" fill={t.ok ? '#f2b441' : '#ff7a59'} />
              <text x="22" y="15.5" className="fill-fg/80 font-mono" fontSize="8.5">{t.label}</text>
            </g>
          ))}
        </svg>
      </div>
      <div className="mt-4 space-y-1.5 rounded-2xl border border-line bg-ink/60 p-4 font-mono text-[10.5px] leading-relaxed sm:text-[11px]">
        <p><span className="text-dim">12:04:11</span> <span className="text-accent">✓</span> postgres.query <span className="text-dim">· 84ms · scope:read</span></p>
        <p><span className="text-dim">12:04:12</span> <span className="text-coral">↻</span> search.web <span className="text-dim">· 429 → retry 1/3, backoff 800ms</span></p>
        <p><span className="text-dim">12:04:13</span> <span className="text-iris">◆</span> github.create_pr <span className="text-dim">· awaiting approval</span></p>
      </div>
    </div>
  )
}

export function WindowBar({ title, accent }: { title: string; accent: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex gap-1.5">
        <span className="size-2.5 rounded-full bg-white/15" />
        <span className="size-2.5 rounded-full bg-white/15" />
        <span className="size-2.5 rounded-full" style={{ background: accent }} />
      </div>
      <span className="truncate font-mono text-[11px] text-dim">{title}</span>
    </div>
  )
}
