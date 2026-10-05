#!/usr/bin/env python3
"""
Reskins ThreeUI's Kage landing page (MIT) with Abdul Qadir's portfolio content.

Input : vendor/threeui/kage.original.html   (byte-for-byte copy, SHA-256 c8e06b90397a…)
Output: public/landing-pages/kage.html        (served to <KageLandingPage />)

Every replacement is an exact string match that must occur the expected number of
times, so an upstream change to the source fails loudly instead of silently skipping.
Only copy, labels, links and the wordmark text/font change. The 3D world, shaders,
motion, layout variants, and assets are untouched.

Run from the project root:  python3 vendor/threeui/reskin-kage.py
"""
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
SRC = ROOT / "vendor/threeui/kage.original.html"
OUT = ROOT / "public/landing-pages/kage.html"

s = SRC.read_text(encoding="utf-8")


def rep(old: str, new: str, count: int = 1) -> None:
    global s
    n = s.count(old)
    if n != count:
        raise SystemExit(f"expected {count}× but found {n}× for:\n{old[:160]}")
    s = s.replace(old, new)


ARROW = '<svg viewBox="0 0 14 14" fill="none"><path d="M3 11 11 3M5 3h6v6" stroke="#dfe7e0" stroke-width="1.3"/></svg>'

# ───────────────────────────────────────────── head
rep("<title>Kage — Where stillness reveals the unseen</title>",
    "<title>Abdul Qadir — AI &amp; Backend Engineer</title>")
rep('<meta name="description" content="A five-chapter night walk through a Kyoto mountain temple. Charred cypress, lantern light and a vermilion moon, rendered live in WebGL.">',
    '<meta name="description" content="Abdul Qadir builds agentic AI systems, retrieval pipelines, and the backend services that keep them reliable in production.">')

# Small additions for the reskin (card notes, classic-site link, contact line).
rep("</style>\n</head>", """
/* ============================================================ portfolio reskin additions */
.card-note{ margin-top:12px; display:grid; gap:8px; }
.card-note p{ margin:0; font-size:12.5px; line-height:1.6; color:#9aa5a0; text-shadow:0 1px 16px rgba(3,6,8,.92); max-width:62ch; }
.card-note p b{ font-weight:500; font-size:9.5px; letter-spacing:.2em; text-transform:uppercase; color:var(--ember); margin-right:8px; }
.card-note .stack{ font-size:9.5px; letter-spacing:.16em; text-transform:uppercase; color:var(--muted); }
.nav-classic{ display:inline-flex; align-items:center; gap:8px; margin-left:clamp(10px,1.6vw,26px);
  padding:9px 14px; border:1px solid var(--line); border-radius:100px;
  font-size:10px; font-weight:500; letter-spacing:.2em; text-transform:uppercase; color:var(--bone-dim);
  transition:color .35s, border-color .35s, background .35s; }
.nav-classic:hover{ color:#05070a; background:var(--bone); border-color:var(--bone); }
@media (max-width:820px){ .nav-classic{ display:none; } }
/* the first work card is shorter than the authored 72vh so its notes stay in view */
body[data-layout-gallery="b"] .card:first-child .card-fr{ height:min(56vh,600px); }
.fin .mail{ display:block; margin-top:14px; font-size:clamp(14px,1.1vw,18px); letter-spacing:.02em; color:var(--bone); user-select:all; }
</style>
</head>""")

# ───────────────────────────────────────────── preloader
rep("<span>Raising the mountain temple</span>", "<span>Loading the work</span>")

# ───────────────────────────────────────────── nav
rep('<span class="brand-tx"><b>KAGE</b><i>HIDDEN REALMS OF KYOTO</i></span>',
    '<span class="brand-tx"><b>ABDUL QADIR</b><i>AI &amp; BACKEND ENGINEER</i></span>')
rep('<span>Temples</span><span class="alt">伽藍</span>', '<span>About</span><span class="alt">心</span>')
rep('<span>Gardens</span><span class="alt">庭園</span>', '<span>Work</span><span class="alt">光</span>')
rep('<span>Rituals</span><span class="alt">神事</span>', '<span>Experience</span><span class="alt">道</span>')
rep('<span>Afterlight</span><span class="alt">残光</span>', '<span>Contact</span><span class="alt">風</span>')
rep('  </nav>\n  <button class="nav-burger"',
    '  </nav>\n  <a class="nav-classic" href="/" data-exit data-cursor>Classic site</a>\n  <button class="nav-burger"')

# ───────────────────────────────────────────── hero
rep("Chapter 00 — The Hidden Gate", "Chapter 00 — Hello, I’m Abdul Qadir")
rep("<span>Where stillness</span>", "<span>I build AI systems</span>")
rep("<span>reveals the</span>", "<span>that hold up</span>")
rep("<span>unseen.</span>", "<span>in production.</span>")
rep("""Enter Kyoto through its quiet thresholds, where ritual,
      craft, and memory shape the path.""",
    """AI &amp; backend engineer in Islamabad. Agentic workflows, retrieval
      pipelines, and the services underneath them, shipped for products used by 10,000+ people.""")
rep("<b>Thresholds</b><p>Discover the hidden gates that open on to deeper paths.</p>",
    "<b>Agentic AI</b><p>LangGraph and CrewAI agents that call tools and recover cleanly.</p>")
rep("<b>Still Gardens</b><p>Witness the courts where silence gently unfolds.</p>",
    "<b>RAG &amp; Retrieval</b><p>Ingestion, re-ranking, and evals that keep answers grounded.</p>")
rep("<b>Sacred Craft</b><p>Embrace the hands and heritage that shape devotion.</p>",
    "<b>Backend &amp; APIs</b><p>FastAPI and Django services that put models behind reliable interfaces.</p>")
rep("<b>Night Rituals</b><p>Explore the rites that awaken when the day is done.</p>",
    "<b>MLOps</b><p>Docker, CI/CD, and LangSmith traces to ship without breaking things.</p>")
rep('aria-label="Preview: Sanmon, before the bell"', 'aria-label="Preview: selected work"')
rep('<span class="peek-cap"><b class="jp">山門</b><i>Sanmon — before the bell</i></span>',
    '<span class="peek-cap"><b class="jp">光</b><i>Selected work — three products</i></span>')
rep('<div class="word-fb" aria-hidden="true">KAGE</div>', '<div class="word-fb" aria-hidden="true">QADIR</div>')

# ───────────────────────────────────────────── 01 · About (the Sanmon)
rep('<span class="k"><b>01</b> — The Sanmon</span><span class="rule"></span><span class="k jp">山門</span>',
    '<span class="k"><b>01</b> — About</span><span class="rule"></span><span class="k jp">心</span>')
rep('<h2 class="display h-sec" data-rv="up">Charred cypress, worn stone, one gate left open.</h2>',
    '<h2 class="display h-sec" data-rv="up">Engineer first. Model-agnostic by habit.</h2>')
rep("""<p class="lead" data-rv="up">Kage begins where the city stops: a mountain gate of cedar burned black,
        standing in its own weather. The soot is not decoration. It is how a board is taught to survive a
        hundred rainy seasons, and the first thing this place asks you to understand.</p>""",
    """<p class="lead" data-rv="up">I’m an AI engineer with three years of shipping generative AI into real
        products, from RAG platforms over tens of thousands of documents to multi-agent systems that
        automate work people used to do by hand.</p>""")
rep("""<p class="body" data-rv="up">Climb the worn steps and the worship hall lifts out of the mist, its paper
        screens lit from inside like a lantern the size of a house. Above the eaves a vermilion moon holds
        its place, patient, half hidden. Nothing here is in a hurry. Neither, for the next ninety minutes,
        are you.</p>""",
    """<p class="body" data-rv="up">Most of my time goes into the parts that decide whether an AI feature
        survives contact with users: retrieval quality, prompt and tool design, evaluation, latency, and the
        APIs, queues, and containers that keep it running. Right now I’m at Sideline Technologies, building
        agentic AI products and the orchestration layer behind them.</p>""")
rep("""        <span>Cross the threshold</span>
        <span class="ar">""" + ARROW + """</span>
      </a>""",
    """        <span>See selected work</span>
        <span class="ar">""" + ARROW + """</span>
      </a>
      <a class="arrowlink" href="/Abdul_Qadir_Resume.pdf" target="_blank" rel="noopener" data-rv="fade" data-cursor style="margin-left:28px">
        <span>Résumé (PDF)</span>
        <span class="ar">""" + ARROW + """</span>
      </a>""")
rep("""    <div><b>05</b><span>Chapters</span></div>
    <div><b>92</b><span>Minutes</span></div>
    <div><b>1611</b><span>Hall raised</span></div>
    <div><b>∞</b><span>Stillness</span></div>""",
    """    <div><b>10k+</b><span>Active users</span></div>
    <div><b>3+</b><span>Years shipping AI</span></div>
    <div><b>~35%</b><span>Faster retrieval</span></div>
    <div><b>25%</b><span>LoRA accuracy gain</span></div>""")

# ───────────────────────────────────────────── 02 · Work (Still Gardens)
# PLACEHOLDER — project stacks mirror src/content.ts; update both together.
rep('<span class="k"><b>02</b> — Still Gardens</span><span class="rule"></span><span class="k jp">庭園</span>',
    '<span class="k"><b>02</b> — Selected work</span><span class="rule"></span><span class="k jp">光</span>')

rep("""<div class="card-lab"><b>Approach</b><span class="jp">参道</span></div>
      </div>
      <div class="card-meta"><span>The long climb</span><span>01 / 03</span></div>""",
    """<div class="card-lab"><b>PatchPilot / Panosophy</b><span class="jp">雲</span></div>
      </div>
      <div class="card-meta"><span>AI tool orchestration</span><span>01 / 03</span></div>
      <div class="card-note">
        <p><b>Problem</b>Agents wired into real tools failed silently. Every team hand-rolled auth, retries, and logging, and nobody could see why a run went wrong.</p>
        <p><b>Solution</b>A typed tool registry and a LangGraph planner with policy checks, human-approval steps, and a replayable trace of every call.</p>
        <span class="stack">Python · FastAPI · LangGraph · LangSmith · Docker</span>
      </div>""")
rep("""<div class="card-lab"><b>Lanterns</b><span class="jp">灯籠</span></div>
      </div>
      <div class="card-meta"><span>Lantern court</span><span>02 / 03</span></div>""",
    """<div class="card-lab"><b>CodeGuard</b><span class="jp">石</span></div>
      </div>
      <div class="card-meta"><span>Security &amp; code quality</span><span>02 / 03</span></div>
      <div class="card-note">
        <p><b>Problem</b>Scanners flood pull requests with noise, so real leaks and injection paths slip through.</p>
        <p><b>Solution</b>Rule-based scans, then LLM triage against the surrounding code: a short ranked list with patch suggestions.</p>
        <span class="stack">Python · LangChain · GPT-4 · GitHub Apps</span>
      </div>""")
rep("""<div class="card-lab"><b>Moonwater</b><span class="jp">月影</span></div>
      </div>
      <div class="card-meta"><span>The wet court</span><span>03 / 03</span></div>""",
    """<div class="card-lab"><b>CTA</b><span class="jp">水</span></div>
      </div>
      <div class="card-meta"><span>AI trading journal</span><span>03 / 03</span></div>
      <div class="card-note">
        <p><b>Problem</b>Traders rarely review their trades, so the habits that cost money stay invisible.</p>
        <p><b>Solution</b>Auto-imported trades, tagged setups and emotions, and a weekly AI review grounded in your own numbers.</p>
        <span class="stack">FastAPI · LangChain · Chroma · React</span>
      </div>""")

# ───────────────────────────────────────────── 03 · Experience (Sacred Craft)
rep('<span class="k"><b>03</b> — Sacred Craft</span><span class="rule"></span><span class="k jp">手業</span>',
    '<span class="k"><b>03</b> — Experience</span><span class="rule"></span><span class="k jp">道</span>')
rep('<h2 class="display h-sec" data-rv="up">Five chapters. Ninety minutes. One quiet mind.</h2>',
    '<h2 class="display h-sec" data-rv="up">Three years, four teams, one habit: ship it.</h2>')
rep("""<p class="body-lg" data-rv="up">Each chapter is a walk, not a lecture. You arrive at the gate, climb the
      steps, sit with the lantern, and leave with one thing worth keeping.</p>""",
    """<p class="body-lg" data-rv="up">From computer vision on edge hardware to agentic products at scale. Each
      role added a layer of the stack, and every one of them shipped to production.</p>""")

LES = [
    ("The Hidden Gate", "山門", "Why a gate is a sentence, and what you agree to when you walk under one.", "14 min",
     "Prompt &amp; Generative AI Engineer", "一", "Sideline Technologies. RAG systems and LangGraph agent workflows for products serving 10,000+ users.", "2025 — Now"),
    ("Borrowed Scenery", "借景", "Shakkei: composing with a mountain you will never own.", "18 min",
     "AI Engineer", "二", "ErlyStage Studio. RAG pipelines ~35% faster; LoRA fine-tunes up to 25% more accurate.", "2024 — 2025"),
    ("Charred Cypress", "焼杉", "Yakisugi: burning a board black so the weather will let it live.", "21 min",
     "Generative AI Engineer", "三", "Xflow Research. Fine-tuning, RAG, and agents across 3 enterprise deployments.", "2023 — 2024"),
    ("Lantern Light", "灯籠", "How a single ember decides the scale of everything around it.", "17 min",
     "Computer Vision Intern", "四", "National Center for Robotics &amp; Automation. YOLO v8 on Jetson Nano at 25+ FPS.", "2023"),
    ("The Vermilion Moon", "朱月", "Why the moon burns red over the valley, and what the garden does with it.", "22 min",
     "B.E. Computer Systems", "五", "Mehran UET, plus certifications from Kaggle, DataCamp, and NAVTTC.", "2020 — 2024"),
]
for (oh, oj, op, ot, nh, nj, np, nt) in LES:
    rep(f"<h3>{oh}<em class=\"jp\">{oj}</em></h3>\n      <p>{op}</p>\n      <span class=\"t\">{ot}</span>",
        f"<h3>{nh}<em class=\"jp\">{nj}</em></h3>\n      <p>{np}</p>\n      <span class=\"t\">{nt}</span>")

# ───────────────────────────────────────────── 04 · Contact (Afterlight)
rep('<div class="eyebrow" data-rv="fade">Chapter 04 — Afterlight</div>',
    '<div class="eyebrow" data-rv="fade">Chapter 04 — Contact</div>')
rep('<h2 class="display" data-rv="up">Afterlight</h2>', '<h2 class="display" data-rv="up">Say hello</h2>')
rep("""<p class="body-lg" data-rv="up">The gate does not close behind you. Take the walk whenever the noise
    gets loud — it is always the same path, and never the same light.</p>""",
    """<p class="body-lg" data-rv="up">Have an AI feature that needs to actually ship? I’m happy to talk through
    agent design, retrieval problems, or backend architecture. Email is the fastest way to reach me.
    <span class="mail">abdulqadirrmagssii@gmail.com</span></p>""")
rep("""<a class="cta" href="#top" data-rv="fade" data-cursor>
    <i></i><span>Begin the walk</span>""",
    """<a class="cta" href="mailto:abdulqadirrmagssii@gmail.com?subject=Hello%20Abdul" target="_blank" rel="noopener" data-rv="fade" data-cursor>
    <i></i><span>Email me</span>""")

# ───────────────────────────────────────────── footer
rep("""<p>A five-chapter night walk through a Kyoto mountain temple. Three illustrated garden field notes
        sit inside a live Three.js sanctuary.</p>""",
    """<p>Abdul Qadir builds agentic AI systems, retrieval pipelines, and the backend services behind them,
        from Islamabad.</p>""")
rep("""<div><h4>Chapters</h4><ul>
      <li><a href="#gate" data-cursor>The Sanmon</a></li>
      <li><a href="#pathways" data-cursor>Still Gardens</a></li>
      <li><a href="#lessons" data-cursor>Sacred Craft</a></li>
      <li><a href="#eternity" data-cursor>Afterlight</a></li>
    </ul></div>""",
    """<div><h4>Sections</h4><ul>
      <li><a href="#gate" data-cursor>About</a></li>
      <li><a href="#pathways" data-cursor>Selected work</a></li>
      <li><a href="#lessons" data-cursor>Experience</a></li>
      <li><a href="#eternity" data-cursor>Contact</a></li>
    </ul></div>""")
rep("""<div><h4>Practice</h4><ul>
      <li><a href="#lessons" data-cursor>Borrowed scenery</a></li>
      <li><a href="#lessons" data-cursor>Lantern light</a></li>
      <li><a href="#lessons" data-cursor>Charred cypress</a></li>
      <li><a href="#lessons" data-cursor>Raked gravel</a></li>
    </ul></div>""",
    """<div><h4>Stack</h4><ul>
      <li><a href="#hero" data-cursor>LangGraph · CrewAI</a></li>
      <li><a href="#hero" data-cursor>RAG · FAISS · Chroma</a></li>
      <li><a href="#hero" data-cursor>FastAPI · Django</a></li>
      <li><a href="#hero" data-cursor>Docker · CI/CD</a></li>
    </ul></div>""")
rep("""<div><h4>Elsewhere</h4><ul>
      <li><a href="#top" data-cursor>Journal</a></li>
      <li><a href="#top" data-cursor>Field notes</a></li>
      <li><a href="#top" data-cursor>Colophon</a></li>
    </ul></div>""",
    """<div><h4>Elsewhere</h4><ul>
      <li><a href="https://www.linkedin.com/in/abdul-qadir-bb9aab214" target="_blank" rel="noopener" data-cursor>LinkedIn</a></li>
      <li><a href="https://github.com/AbdulQadirM" target="_blank" rel="noopener" data-cursor>GitHub</a></li>
      <li><a href="/Abdul_Qadir_Resume.pdf" target="_blank" rel="noopener" data-cursor>Résumé (PDF)</a></li>
      <li><a href="/" data-exit data-cursor>Classic site</a></li>
    </ul></div>""")
rep("<span>© 2026 Kage — Kage no Michi</span>", "<span>© 2026 Abdul Qadir</span>")
rep('<span class="jp">静けさは一つの技である</span>', '<span class="jp">一つの道</span>')
rep("<span>WebGL · Onest · Kyoto</span>", "<span>WebGL · Onest · Islamabad</span>")

# ───────────────────────────────────────────── script: labels + wordmark
rep("const names = ['The Hidden Gate', 'The Sanmon', 'Still Gardens', 'Sacred Craft', 'Afterlight', 'Colophon'];",
    "const names = ['Intro', 'About', 'Selected work', 'Experience', 'Contact', 'Links'];")
# The bundled "Wordmark" face is subset to A E G K S; QADIR is set in Onest Bold (full Latin).
rep("const SZ = 320, TRACK = .40, PAD = 26;", "const SZ = 320, TRACK = .28, PAD = 26;")
rep("m.font = '600 ' + SZ + 'px Wordmark, sans-serif';", "m.font = '700 ' + SZ + 'px Onest, sans-serif';")
rep("x.font = '600 ' + SZ + 'px Wordmark, sans-serif';", "x.font = '700 ' + SZ + 'px Onest, sans-serif';")
rep("const word = 'KAGE', gl = [];", "const word = 'QADIR', gl = [];")
# Five letters with a round Q and a leg on the R: hold the word inside the frame edge.
rep("const fill = narrow ? .96 : 1.00;", "const fill = narrow ? .9 : .92;")
rep("['Reading the type', () => document.fonts && document.fonts.load('600 320px Wordmark')],",
    "['Reading the type', () => document.fonts && document.fonts.load('700 320px Onest')],")

# Links marked data-exit leave the immersive page. Inside the <KageLandingPage> iframe
# (sandboxed, no top navigation) they ask the host page to navigate instead.
rep("</script>\n</body>", """</script>
<script>
document.querySelectorAll('[data-exit]').forEach(function (a) {
  a.addEventListener('click', function (e) {
    if (window.parent === window) return;
    e.preventDefault();
    window.parent.postMessage({ type: 'aq:navigate', href: a.getAttribute('href') }, location.origin);
  });
});
</script>
</body>""")

OUT.write_text(s, encoding="utf-8")
print(f"wrote {OUT.relative_to(ROOT)} ({len(s):,} chars)")
