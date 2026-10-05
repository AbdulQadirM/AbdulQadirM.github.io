import { StrictMode, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import { Scene } from './Scene'
import './kage.css'

function KagePage() {
  // Links marked data-exit inside the sandboxed iframe ask us to navigate the top page.
  useEffect(() => {
    const onMessage = (e: MessageEvent) => {
      if (e.origin !== window.location.origin) return
      const d = e.data as { type?: string; href?: string } | null
      if (d?.type === 'aq:navigate' && typeof d.href === 'string' && d.href.startsWith('/')) {
        window.location.assign(d.href)
      }
    }
    window.addEventListener('message', onMessage)
    return () => window.removeEventListener('message', onMessage)
  }, [])

  return (
    <main aria-label="Abdul Qadir — immersive portfolio">
      <Scene />
    </main>
  )
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <KagePage />
  </StrictMode>,
)
