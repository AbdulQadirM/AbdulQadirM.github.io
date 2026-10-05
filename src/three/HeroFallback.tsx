/**
 * Lightweight stand-in for the 3D hero on touch devices, small screens,
 * low-power hardware, or browsers without WebGL. Pure SVG + CSS, ~2 KB.
 */
export default function HeroFallback() {
  return (
    <div className="pointer-events-none absolute inset-0 flex items-end justify-end pb-[8vh] pr-[4vw] opacity-50 md:items-center md:justify-center md:p-0 md:opacity-100" aria-hidden="true">
      <div className="absolute size-[70vmin] rounded-full bg-[radial-gradient(circle_at_40%_35%,rgba(242,180,65,0.18),transparent_60%)] blur-2xl" />
      <div className="absolute size-[60vmin] rounded-full bg-[radial-gradient(circle_at_65%_70%,rgba(139,156,255,0.16),transparent_60%)] blur-2xl" />
      <svg viewBox="-120 -120 240 240" className="float-slow relative w-[58vmin] max-w-[420px] opacity-90">
        <defs>
          <linearGradient id="fa" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#2a2f3a" />
            <stop offset="1" stopColor="#0d0f14" />
          </linearGradient>
          <linearGradient id="fb" x1="1" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#f2b441" stopOpacity=".55" />
            <stop offset="1" stopColor="#1a1d24" stopOpacity=".2" />
          </linearGradient>
          <linearGradient id="fc" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0" stopColor="#8b9cff" stopOpacity=".5" />
            <stop offset="1" stopColor="#1a1d24" stopOpacity=".2" />
          </linearGradient>
        </defs>
        <g className="spin-slow" style={{ transformOrigin: 'center' }}>
          <ellipse rx="112" ry="34" fill="none" stroke="#f2b441" strokeOpacity=".45" strokeWidth=".8" transform="rotate(-18)" />
          <ellipse rx="104" ry="52" fill="none" stroke="#8b9cff" strokeOpacity=".35" strokeWidth=".6" transform="rotate(32)" />
        </g>
        {/* faceted gem */}
        <polygon points="0,-72 62,-36 62,36 0,72 -62,36 -62,-36" fill="url(#fa)" stroke="#ffffff" strokeOpacity=".12" />
        <polygon points="0,-72 62,-36 0,0" fill="url(#fb)" />
        <polygon points="62,-36 62,36 0,0" fill="#ffffff" fillOpacity=".05" />
        <polygon points="-62,36 0,72 0,0" fill="url(#fc)" />
        <polygon points="-62,-36 0,-72 0,0" fill="#ffffff" fillOpacity=".08" />
        <g stroke="#ffffff" strokeOpacity=".14" strokeWidth=".7">
          <line x1="0" y1="0" x2="0" y2="-72" />
          <line x1="0" y1="0" x2="62" y2="-36" />
          <line x1="0" y1="0" x2="62" y2="36" />
          <line x1="0" y1="0" x2="0" y2="72" />
          <line x1="0" y1="0" x2="-62" y2="36" />
          <line x1="0" y1="0" x2="-62" y2="-36" />
        </g>
        <circle cx="108" cy="-20" r="3" fill="#f2b441" />
        <circle cx="-86" cy="50" r="2.2" fill="#eef0f3" />
        <circle cx="30" cy="92" r="2" fill="#8b9cff" />
      </svg>
    </div>
  )
}
