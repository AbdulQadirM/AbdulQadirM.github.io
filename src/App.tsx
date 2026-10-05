import { MotionConfig } from 'framer-motion'
import { SmoothScroll } from './lib/scroll'
import Cursor from './components/Cursor'
import Nav from './components/Nav'
import Hero from './sections/Hero'
import About from './sections/About'
import Skills from './sections/Skills'
import Projects from './sections/Projects'
import Experience from './sections/Experience'
import Contact from './sections/Contact'

export default function App() {
  return (
    // reducedMotion="user" turns transform animations into instant changes for users who ask for it.
    <MotionConfig reducedMotion="user">
      <SmoothScroll>
        <a
          href="#main"
          className="fixed left-4 top-4 z-[80] -translate-y-20 rounded-full bg-accent px-4 py-2 text-sm font-medium text-on-accent transition-transform focus:translate-y-0"
        >
          Skip to content
        </a>
        <Cursor />
        <div className="grain" aria-hidden />
        <Nav />
        <main id="main" className="overflow-x-clip">
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Experience />
          <Contact />
        </main>
      </SmoothScroll>
    </MotionConfig>
  )
}
