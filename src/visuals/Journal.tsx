import { WindowBar } from './Orchestration'

/** CTA visual: equity curve, tagged trades, and an AI coach insight. */
const pts = [0, 4, 3, 8, 6, 11, 9, 7, 12, 15, 13, 18, 17, 22, 20, 26, 24, 29]
const w = 400
const h = 120
const max = 32
const path = pts.map((p, i) => `${i === 0 ? 'M' : 'L'}${(i / (pts.length - 1)) * w} ${h - (p / max) * h}`).join(' ')

const trades = [
  { sym: 'EURUSD', side: 'Long', r: '+2.1R', tag: 'A+ setup', good: true },
  { sym: 'NAS100', side: 'Short', r: '−1.4R', tag: 'Revenge', good: false },
  { sym: 'XAUUSD', side: 'Long', r: '+0.8R', tag: 'Early exit', good: true },
]

export default function Journal() {
  return (
    <div className="flex h-full flex-col p-5 sm:p-7" aria-hidden="true">
      <WindowBar title="cta · journal · this week" accent="#8b9cff" />
      <div className="mt-4 rounded-2xl border border-line bg-ink/60 p-4">
        <div className="mb-3 flex items-baseline justify-between">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-wider text-dim">Equity (R)</p>
            <p className="font-display text-2xl font-medium">+29.4R</p>
          </div>
          <p className="font-mono text-[11px] text-accent">win rate 58% · avg 1.7R</p>
        </div>
        <svg viewBox={`0 0 ${w} ${h + 4}`} className="h-24 w-full sm:h-28" preserveAspectRatio="none">
          <defs>
            <linearGradient id="jf" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#8b9cff" stopOpacity=".35" />
              <stop offset="1" stopColor="#8b9cff" stopOpacity="0" />
            </linearGradient>
          </defs>
          {[0.25, 0.5, 0.75].map((f) => (
            <line key={f} x1="0" x2={w} y1={h * f} y2={h * f} stroke="rgba(255,255,255,.06)" />
          ))}
          <path d={`${path} L${w} ${h} L0 ${h} Z`} fill="url(#jf)" />
          <path d={path} fill="none" stroke="#8b9cff" strokeWidth="2" vectorEffect="non-scaling-stroke" strokeLinejoin="round" />
        </svg>
      </div>

      <ul className="mt-3 space-y-2">
        {trades.map((t) => (
          <li key={t.sym + t.r} className="flex items-center gap-3 rounded-xl border border-line bg-ink/60 px-3.5 py-2.5 text-[12px]">
            <span className="w-16 font-mono text-fg">{t.sym}</span>
            <span className="w-10 text-dim">{t.side}</span>
            <span className={`w-12 font-mono ${t.good ? 'text-accent' : 'text-coral'}`}>{t.r}</span>
            <span className={`ml-auto rounded-full px-2 py-0.5 font-mono text-[10px] ${t.good ? 'bg-iris/15 text-iris' : 'bg-coral/15 text-coral'}`}>{t.tag}</span>
          </li>
        ))}
      </ul>

      <div className="mt-3 flex-1 rounded-2xl border border-iris/30 bg-iris/[0.06] p-4">
        <p className="mb-1.5 font-mono text-[10px] uppercase tracking-wider text-iris">AI review</p>
        <p className="text-[12.5px] leading-relaxed text-fg/85">
          4 of your 5 losing trades this week came within 20 minutes of a prior loss. Your rule-following trades averaged <span className="text-accent">+1.9R</span>. Try a 30-minute cool-down after any stop-out.
        </p>
      </div>
    </div>
  )
}
