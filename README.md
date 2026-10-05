# Abdul Qadir — Portfolio

A dark, motion-driven portfolio built with **React 19, TypeScript, Tailwind CSS v4, Framer Motion, and React Three Fiber**.

- **Hero identity card:** your photo, name and title on a layered card. It tilts toward the cursor, and its floating chips sit at different depths for parallax.
- **Interactive 3D hero:** a faceted core with orbiting rings and "tool" satellites. It eases toward the cursor, a key light follows the pointer across the facets, and the camera drifts for parallax depth.
- **Smooth scrolling** with Lenis, scroll-linked parallax, and staggered reveals.
- **Light and dark themes:** the site opens in light mode for every visitor, whatever their OS setting. The sun/moon button in the nav switches themes, and the choice is saved for next time and applied before the first paint, so there's no flash. Project mockups and the hero card stay dark in both themes, like product screens.
- **Custom cursor:** a precise dot plus a trailing ring that grows over interactive elements and shows a label on project visuals (`data-cursor="Explore"`).
- **Tasteful hover effects:** magnetic buttons, cards that tilt with a light highlight, and chip and stat highlights.
- **Sections:** Hero, About, Skills, Featured Projects (PatchPilot / Panosophy, CodeGuard, CTA), Experience, and Contact.

## Setup

Requires **Node 20+** (tested on Node 22).

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # type-checks, then builds to dist/
npm run preview    # serves the production build at http://localhost:4173
npm run lint       # oxlint
```

## Editing content

**All copy lives in `src/content.ts`.** You don't need to change any components to update it.

| What | Where |
| --- | --- |
| Name, email, links, location, availability | `site` |
| Hero headline and subline | `hero` |
| About text and stat tiles | `about` |
| Skill groups | `skills` |
| Projects (problem, solution, highlights, stack, metrics, links) | `projects` |
| Roles | `experience` |
| Education and certifications | `education` |

**Placeholder copy.** Some details weren't on the résumé, including project years, roles, metrics, stacks, case-study links, what "CTA" stands for, and your availability line. That copy is written to sound realistic and is marked `// PLACEHOLDER`. Search for that word to find everything you need to replace. In `npm run dev`, projects that still have placeholder fields show a dashed **"placeholder copy"** tag. The tag never appears in production builds. Once a project is finished, empty its `placeholders: []` array.

**Other details:**

- **Your photo (hero card):** put a portrait (4:5, at least 800×1000) in `public/`, for example `public/portrait.jpg`, and set `site.portrait = 'portrait.jpg'`. Until you do, the card shows an "AQ" monogram. In dev it also shows an "add site.portrait" tag.
- **Résumé:** `public/Abdul_Qadir_Resume.pdf`. Replace the file and keep the name, or change `site.resumeUrl`.
- **Phone number:** set `site.showPhone = true` to show it in Contact.
- **Project visuals:** coded mockups in `src/visuals/` (`Orchestration`, `Scanner`, `Journal`). To use real screenshots, replace a visual's contents with an `<img>` and keep the wrapper.
- **Colors and fonts:** fonts are in the `@theme` block in `src/index.css`. The palettes for both themes are in the Themes block below it: light values on `:root` and dark values under `[data-aq-theme='dark']`. Add the class `dark-scope` to any element to keep it dark in both themes. In dark mode the accent is solder amber `#f2b441`, and in light mode it's a deeper amber, `#a8680a`, so it stays readable. Coral and iris are the secondary colors. Each project has its own `accent`.

## Performance and accessibility

- **three.js is lazy-loaded.** The initial JS is about 135 KB gzipped. The 3D chunk (about 260 KB gzipped) downloads only when a device qualifies.
- **The 3D hero renders only on capable devices.** A device needs a fine pointer, a viewport of at least 768 px, WebGL, 4 or more CPU cores, 4 GB or more of memory (where the browser reports it), and no Save-Data setting. Every other device gets a lightweight SVG/CSS fallback (`src/three/HeroFallback.tsx`). You can change the rules in `useCanRender3D` in `src/lib/hooks.ts`.
- **Rendering stops off-screen.** The canvas stops when the hero scrolls out of view (`frameloop="never"`), `PerformanceMonitor` lowers the resolution on slow GPUs, and the environment lighting is generated in code, so there's no HDR download.
- **Reduced motion (`prefers-reduced-motion`):**
  - Lenis turns off and native scrolling takes over.
  - Framer Motion runs with `reducedMotion="user"`.
  - Parallax, tilt, the magnetic effect, and the custom cursor turn off.
  - CSS animations stop.
  - The 3D hero renders one still frame.
- **Custom cursor:** it appears only for mouse and trackpad users. Touch and keyboard users keep native behavior.
- **Semantics and focus:** the page has a skip link, visible `:focus-visible` rings, and labelled landmarks. Nav links move focus to their target section, and the active section is marked with `aria-current`. Decorative layers are `aria-hidden`, and project mockups have screen-reader descriptions.
- **Testing override:** add `?3d=1` to force the WebGL hero or `?3d=0` to force the fallback.

## Immersive 3D version (`/kage/`)

A second version of the portfolio runs at **`/kage/`**. It's built on ThreeUI's
[`<KageLandingPage />`](https://threeui.com) (MIT, `@designcodeio/threeui@1.2.0`) using the exact
source and assets from the npm package. The live Three.js world, scroll scenes, preloader, cursor,
foreground layers, and layout variants are unchanged. Only the copy is replaced with your portfolio
content. The classic site at `/` is unchanged apart from a **3D version** link in the nav, and the
immersive page has a **Classic site** link back.

| Kage section | Portfolio content |
| --- | --- |
| Hero ("The Hidden Gate") | Pitch line, four skill-area chips, 3D wordmark **QADIR** |
| 01 The Sanmon | About, résumé link, four stats |
| 02 Still Gardens (mosaic) | PatchPilot / Panosophy, CodeGuard, CTA, each with a problem, solution, and stack |
| 03 Sacred Craft (atlas) | Four roles plus education |
| 04 Afterlight | Contact |
| Footer | Sections, stack, LinkedIn / GitHub / résumé / classic site |

**How it's wired**

- `kage/index.html` → `src/kage/main.tsx` → `src/kage/Scene.tsx` renders `<KageLandingPage />` with
  the configured props (Onest 400/300, `#e0231c`, heading 46, body 17, letter-spacing −0.012).
  Vite builds it as a second page next to the main site.
- The component loads `public/landing-pages/kage.html` in a sandboxed iframe and injects the
  typography settings into it. Runtime assets live in `public/landing-pages/secret-pathways-assets/`.
  They're copied byte for byte from the package, and every SHA-256 matches the ThreeUI manifest.
- `public/landing-pages/kage.html` is **generated**. Edit the copy in `vendor/threeui/reskin-kage.py`,
  then run:

  ```bash
  python3 vendor/threeui/reskin-kage.py
  ```

  The script reads the untouched original (`vendor/threeui/kage.original.html`, SHA-256 `c8e06b90397a…`)
  and applies exact-match replacements. If the source ever changes, it stops with an error instead of
  silently skipping a replacement.
- **Changes beyond copy:**
  - The bundled "Wordmark" font only contains the letters A E G K S, so the 3D word is set in the
    bundled Onest Bold instead.
  - Letter spacing and edge fill are adjusted for a five-letter word.
  - The first work card is shorter, so its notes stay in view.
  - Japanese labels use only characters in the bundled subset font (心 光 道 風 雲 石 水 一–五), so
    nothing falls back to missing-glyph boxes.
- **Links out of the page:** the iframe sandbox blocks navigating the parent page, so links marked
  `data-exit` send a `postMessage`, and the host page (`src/kage/main.tsx`) navigates instead.
- **Licenses:** see `vendor/threeui/LICENSE`, `ASSET-LICENSES.md`, `FONT-LICENSES.md`, and
  `THIRD_PARTY_NOTICES.md`. The page ships its own three.js runtime (`three.min.js`), separate from
  the React app's `three`.
- **Performance:** this page is much heavier than the classic site, about 3.4 MB of images, fonts,
  and runtime, plus a full WebGL scene. It follows ThreeUI's own reduced-motion and touch handling.
  Keep the classic site as the default landing page, and link to the 3D version as an extra.
- **Hosting:** `/kage/` works as a folder route on any static host. `/landing-pages/*` must be
  served from the site root, because that's where the component expects it.

## Deploying

This is a static site, so any static host works. `npm run build` produces `dist/`.

- **Vercel / Netlify:** framework preset "Vite", build command `npm run build`, output directory `dist`.
- **GitHub Pages:** set `base: '/<repo>/'` in `vite.config.ts` and publish `dist/`.

## Structure

```
kage/index.html         second page (immersive 3D version)
public/landing-pages/   Kage runtime: generated kage.html + verified assets
vendor/threeui/         original Kage source, reskin script, licenses
src/
  content.ts            ← all copy (edit this)
  App.tsx               page composition, MotionConfig, skip link
  index.css             Tailwind theme tokens, base styles, keyframes
  lib/hooks.ts          media queries, device capability check, active section
  lib/scroll.tsx        Lenis provider and scrollTo helper
  components/           Nav, Cursor, Button (magnetic), TiltCard, Reveal
  sections/             Hero, About, Skills, Projects, Experience, Contact
  kage/                 /kage/ entry: <KageLandingPage /> host page
  three/                HeroScene (R3F) and HeroFallback (SVG)
  visuals/              coded product mockups for each project
```
