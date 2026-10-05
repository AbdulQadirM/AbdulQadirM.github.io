/**
 * ─────────────────────────────────────────────────────────────
 *  ALL SITE COPY LIVES HERE.
 *  Edit this file to update the portfolio; no component changes needed.
 *
 *  Anything marked `// PLACEHOLDER` was written to sound realistic but is
 *  NOT from your résumé. Search this file for "PLACEHOLDER" and replace it.
 *  Projects also carry a `placeholders` list; while running `npm run dev`,
 *  those projects show a small dashed "placeholder copy" tag so you can
 *  spot them. The tag never appears in a production build.
 * ─────────────────────────────────────────────────────────────
 */

export const site = {
  name: 'Abdul Qadir',
  shortName: 'AQ',
  role: 'AI & Backend Engineer',
  location: 'Islamabad, Pakistan',
  timezone: 'PKT · UTC+5',
  email: 'abdulqadirrmagssii@gmail.com',
  phone: '+92 321 331 3138',
  showPhone: false, // flip to true to show the phone number in Contact
  availability: 'Open to select AI + backend engagements', // PLACEHOLDER — set your real status
  /**
   * Your photo for the hero card. Drop a portrait (ideally 4:5, at least 800×1000) into /public
   * and set the file name here, e.g. 'portrait.jpg'. Leave empty to show the monogram card.
   */
  portrait: '',
  currentCompany: 'Sideline Technologies',
  /** The immersive ThreeUI/Kage version of this portfolio (kage/index.html). Set to '' to hide the link. */
  immersiveUrl: `${import.meta.env.BASE_URL}kage/`,
  resumeUrl: `${import.meta.env.BASE_URL}Abdul_Qadir_Resume.pdf`, // file lives in /public
  links: {
    github: 'https://github.com/AbdulQadirM',
    linkedin: 'https://www.linkedin.com/in/abdul-qadir-bb9aab214',
  },
}

export const hero = {
  eyebrow: 'Hi, I’m Abdul Qadir',
  cardChips: ['LangGraph', 'RAG', 'FastAPI', 'Multi-agent'],
  headline: ['I build AI systems', 'that hold up', 'in production.'],
  sub: 'Agentic workflows, retrieval pipelines, and the backend services underneath them, designed, shipped, and monitored for products used by 10,000+ people.',
}

export const about = {
  heading: 'Engineer first. Model-agnostic by habit.',
  paragraphs: [
    'I’m an AI engineer with three years of shipping generative AI into real products from RAG platforms over tens of thousands of documents to multi-agent systems that automate work people used to do by hand.',
    'Most of my time goes into the parts that decide whether an AI feature survives contact with users: retrieval quality, prompt and tool design, evaluation, latency, and the APIs, queues, and containers that keep it all running. I care about systems that are observable, cheap to operate, and easy for the next engineer to change.',
    'Right now I’m at Sideline Technologies, building agentic AI products and the orchestration layer behind them.',
  ],
  stats: [
    { value: '10k+', label: 'active users on products I’ve built' },
    { value: '3+', label: 'years shipping AI to production' },
    { value: '~35%', label: 'retrieval latency cut on RAG pipelines' },
    { value: '25%', label: 'accuracy gain from LoRA fine-tuning' },
  ],
}

export type SkillGroup = { title: string; blurb: string; items: string[] }

export const skills: SkillGroup[] = [
  {
    title: 'Agentic AI',
    blurb: 'Multi-step agents that call tools, recover from failure, and hand off cleanly.',
    items: ['LangGraph', 'CrewAI', 'Multi-agent systems', 'Tool calling', 'n8n automation'],
  },
  {
    title: 'LLMs & Prompting',
    blurb: 'Choosing, steering, and tuning models for the job — not the hype cycle.',
    items: ['GPT-4', 'Claude', 'LLaMA', 'Mistral', 'Gemma', 'Phi', 'LoRA / PEFT', 'RLHF', 'Prompt engineering'],
  },
  {
    title: 'RAG & Retrieval',
    blurb: 'Ingestion, chunking, re-ranking, and evals that keep answers grounded.',
    items: ['LangChain', 'LlamaIndex', 'FAISS', 'Chroma', 'Pinecone', 'Weaviate'],
  },
  {
    title: 'Backend & APIs',
    blurb: 'Typed, tested services that put models behind reliable interfaces.',
    items: ['Python', 'FastAPI', 'Django', 'Flask', 'REST APIs', 'Microservices', 'C++', 'Java'],
  },
  {
    title: 'MLOps & Infra',
    blurb: 'Shipping, observing, and iterating without breaking what already works.',
    items: ['Docker', 'CI/CD', 'Azure ML', 'MLflow', 'LangSmith', 'Docker Hub'],
  },
  {
    title: 'ML & Vision',
    blurb: 'Classical deep learning and real-time vision on the edge.',
    items: ['PyTorch', 'TensorFlow', 'Scikit-learn', 'BERT', 'YOLO v8/v9', 'OpenCV', 'Jetson Nano'],
  },
]

export type ProjectVisual = 'orchestration' | 'scanner' | 'journal'

export type Project = {
  id: string
  name: string
  alias?: string
  tagline: string
  category: string
  year: string
  role: string
  problem: string
  solution: string
  highlights: string[]
  stack: string[]
  metrics: { value: string; label: string }[]
  links: { label: string; href: string }[]
  /** Where the project title links to (e.g. the GitHub repo). Optional. */
  url?: string
  visual: ProjectVisual
  accent: string
  /** Fields in this project that are still placeholder copy (shown as a tag in dev only). */
  placeholders: string[]
}

export const projects: Project[] = [
  {
    id: 'patchpilot',
    name: 'PatchPilot',
    alias: '',
    tagline: 'An orchestration layer that lets AI agents use real tools safely.',
    category: 'AI tool orchestration platform',
    year: '2025 — Present', // PLACEHOLDER
    role: 'Lead AI & backend engineer', // PLACEHOLDER
    problem:
      'Teams wiring LLM agents into their stack were hand-rolling the same glue for every tool — auth, retries, rate limits, logging. Agents failed silently, called the wrong tool, or leaked credentials, and nobody could see why a run went wrong.',
    solution:
      'PatchPilot sits between the model and the tools. It keeps a typed registry of every tool, routes each step through a planner with policy checks, and records a replayable trace of every call so failures are debuggable instead of mysterious.',
    highlights: [
      'Typed tool registry with per-tool scopes, secrets isolation, and rate limits',
      'LangGraph planner with retries, fallbacks, and human-approval checkpoints',
      'Step-level traces in LangSmith so any run can be inspected and replayed',
      'Provider-agnostic: swap GPT-4, Claude, or open models without code changes',
    ],
    stack: ['Python', 'FastAPI', 'LangGraph', 'LangSmith', 'Docker', 'Redis'], // PLACEHOLDER — confirm stack
    metrics: [
      { value: '40+', label: 'tools in the registry' }, // PLACEHOLDER
      { value: '<300ms', label: 'routing overhead per step' }, // PLACEHOLDER
      { value: '99.5%', label: 'runs completed without manual retry' }, // PLACEHOLDER
    ],
    links: [
      { label: 'View on GitHub', href: 'https://github.com/AbdulQadirM/PatchPilot' },
    ],
    url: 'https://github.com/AbdulQadirM/PatchPilot',
    visual: 'orchestration',
    accent: '#f2b441',
    placeholders: ['year', 'role', 'stack', 'metrics'],
  },
  {
    id: 'codeguard',
    name: 'CodeGuard',
    tagline: 'Security and code-quality scanning that explains itself.',
    category: 'Security & code quality scanner',
    year: '2025', // PLACEHOLDER
    role: 'AI engineer — scanning engine & LLM triage', // PLACEHOLDER
    problem:
      'Static analyzers flood pull requests with hundreds of warnings, most of them noise. Developers learn to ignore them, and the handful of real issues — leaked keys, injection paths, risky dependencies — slip through.',
    solution:
      'CodeGuard runs rule-based scanners first, then uses an LLM to triage each finding against the surrounding code: is it reachable, is it exploitable, and what is the smallest fix. Pull requests get a short ranked list with patch suggestions instead of a wall of alerts.',
    highlights: [
      'Secret, dependency, and injection detection across Python and JS/TS repos',
      'LLM triage with code-context retrieval to cut false positives',
      'Auto-generated fix suggestions posted as PR review comments',
      'Quality score per repo so teams can track debt over time',
    ],
    stack: ['Python', 'FastAPI', 'LangChain', 'GPT-4', 'FAISS', 'GitHub Apps', 'Docker'], // PLACEHOLDER — confirm stack
    metrics: [
      { value: '−70%', label: 'alert noise vs. raw scanner output' }, // PLACEHOLDER
      { value: '2 min', label: 'median scan time per PR' }, // PLACEHOLDER
      { value: '1-click', label: 'suggested patches on findings' }, // PLACEHOLDER
    ],
    links: [
      { label: 'Case study', href: '#contact' }, // PLACEHOLDER
    ],
    visual: 'scanner',
    accent: '#ff7a59',
    placeholders: [],
  },
  {
    id: 'cta',
    name: 'CTA',
    tagline: 'An AI trading journal that finds the patterns behind your P&L.', // PLACEHOLDER — add what CTA stands for
    category: 'AI trading journal',
    year: '2025', // PLACEHOLDER
    role: 'Full-stack AI engineer', // PLACEHOLDER
    problem:
      'Most traders keep journals in spreadsheets, if at all. Entries are inconsistent, reviews never happen, and the behavioural patterns that actually cost money — revenge trades, oversizing after a loss, breaking your own rules — stay invisible.',
    solution:
      'CTA imports trades automatically, asks two quick questions about each one, and tags setups and emotions for you. A weekly AI review compares what you planned with what you did and surfaces the few habits worth changing, backed by your own numbers.',
    highlights: [
      'Broker CSV/API import with automatic setup and emotion tagging',
      'Natural-language questions over your history: “How do I trade after two losses?”',
      'Weekly AI coach report grounded in your trades, not generic advice',
      'Equity, drawdown, and rule-adherence analytics in one view',
    ],
    stack: ['Python', 'FastAPI', 'LangChain', 'Chroma', 'PostgreSQL', 'React'], // PLACEHOLDER — confirm stack
    metrics: [
      { value: '12k', label: 'trades journaled in beta' }, // PLACEHOLDER
      { value: '5 sec', label: 'to log a trade' }, // PLACEHOLDER
      { value: 'Weekly', label: 'AI performance reviews' }, // PLACEHOLDER
    ],
    links: [
      { label: 'Case study', href: '#contact' }, // PLACEHOLDER
    ],
    visual: 'journal',
    accent: '#8b9cff',
    placeholders: ['tagline', 'year', 'role', 'stack', 'metrics', 'links'],
  },
]

export type Role = {
  title: string
  company: string
  period: string
  mode: string
  points: string[]
  tags: string[]
}

export const experience: Role[] = [
  {
    title: 'Prompt & Generative AI Engineer',
    company: 'Sideline Technologies',
    period: 'Jul 2025 — Present',
    mode: 'Onsite',
    points: [
      'Engineer production AI products serving 10,000+ active users through rapid, iterative delivery.',
      'Built end-to-end RAG systems with LangChain, FAISS, and Chroma for semantic search and document Q&A over large proprietary knowledge bases.',
      'Designed multi-step agentic workflows with LangGraph and external APIs that automate complex user-facing tasks.',
      'Tune prompt strategies and monitor production quality with LangSmith.',
    ],
    tags: ['LangGraph', 'RAG', 'LangSmith', 'FastAPI'],
  },
  {
    title: 'AI Engineer',
    company: 'ErlyStage Studio',
    period: 'Sep 2024 — Jun 2025',
    mode: 'Remote',
    points: [
      'Shipped RAG pipelines on LangChain, FAISS, and Chroma, cutting document retrieval latency by ~35%.',
      'Built LangGraph and CrewAI multi-agent workflows automating NLP tasks across 10+ business use cases.',
      'Fine-tuned LLaMA and Mistral with PEFT/LoRA, improving task accuracy by up to 25% over baseline.',
      'Containerized AI microservices with Docker behind CI/CD-ready model serving.',
    ],
    tags: ['CrewAI', 'LoRA', 'Docker', 'FAISS'],
  },
  {
    title: 'Generative AI Engineer',
    company: 'Xflow Research',
    period: 'Aug 2023 — Jun 2024',
    mode: 'Hybrid',
    points: [
      'Led applied research on fine-tuning, RAG, and agentic systems, contributing to 3 enterprise production deployments.',
      'Built semantic search over large document corpora with Pinecone and LlamaIndex.',
      'Prototyped multimodal vision-language pipelines for automated document understanding.',
    ],
    tags: ['GPT-4', 'Pinecone', 'LlamaIndex', 'Multimodal'],
  },
  {
    title: 'Computer Vision Engineer (Intern)',
    company: 'National Center for Robotics & Automation',
    period: 'May 2023 — Jul 2023',
    mode: 'Pakistan',
    points: [
      'Implemented real-time detection and segmentation with YOLO v8, MobileNetV2, and ResNet.',
      'Deployed models on Raspberry Pi and Jetson Nano at 25+ FPS for robotics applications.',
    ],
    tags: ['YOLO v8', 'Edge AI', 'Jetson'],
  },
]

export const education = {
  degree: 'B.E. Computer Systems Engineering',
  school: 'Mehran University of Engineering & Technology',
  period: '2020 — 2024',
  certifications: [
    'Intermediate Machine Learning — Kaggle',
    'Large Language Models: Concepts & Applications — DataCamp',
    'RNNs for Language Modeling — DataCamp',
    'Feature Engineering for NLP — DataCamp',
    'Artificial Intelligence — NAVTTC',
  ],
}

export const contact = {
  heading: 'Have an AI feature that needs to actually ship?',
  sub: 'I’m happy to talk through agent design, retrieval problems, or backend architecture. Email is the fastest way to reach me — I usually reply within a day.', // PLACEHOLDER — adjust response time
}

export const nav = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'work', label: 'Work' },
  { id: 'experience', label: 'Experience' },
  { id: 'contact', label: 'Contact' },
]
