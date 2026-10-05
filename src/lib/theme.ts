import { useCallback, useSyncExternalStore } from 'react'

export type Theme = 'light' | 'dark'
const KEY = 'aq-theme-v2' // v2: earlier builds saved choices that should no longer force dark
const root = () => document.documentElement

/** Light unless dark was chosen explicitly (data-aq-theme="dark" on <html>). A host's own data-theme is ignored. */
export function readTheme(): Theme {
  return root().getAttribute('data-aq-theme') === 'dark' ? 'dark' : 'light'
}

function subscribe(cb: () => void) {
  const obs = new MutationObserver(cb)
  obs.observe(root(), { attributes: true, attributeFilter: ['data-aq-theme'] })
  return () => obs.disconnect()
}

export function useTheme() {
  const theme = useSyncExternalStore(subscribe, readTheme, () => 'light' as Theme)
  const setTheme = useCallback((t: Theme) => {
    root().setAttribute('data-aq-theme', t)
    try {
      localStorage.setItem(KEY, t)
    } catch {
      /* storage unavailable — the choice still applies for this visit */
    }
  }, [])
  const toggle = useCallback(() => setTheme(readTheme() === 'dark' ? 'light' : 'dark'), [setTheme])
  return { theme, setTheme, toggle }
}
