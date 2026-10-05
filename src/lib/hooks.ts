import { useEffect, useState, useSyncExternalStore } from 'react'

export function useMediaQuery(query: string, fallback = false) {
  return useSyncExternalStore(
    (cb) => {
      const m = window.matchMedia(query)
      m.addEventListener('change', cb)
      return () => m.removeEventListener('change', cb)
    },
    () => window.matchMedia(query).matches,
    () => fallback,
  )
}

export const usePrefersReducedMotion = () => useMediaQuery('(prefers-reduced-motion: reduce)')
export const useFinePointer = () => useMediaQuery('(hover: hover) and (pointer: fine)')

function hasWebGL() {
  try {
    const c = document.createElement('canvas')
    return !!(c.getContext('webgl2') || c.getContext('webgl'))
  } catch {
    return false
  }
}

/**
 * Decide whether the full 3D hero is worth rendering on this device.
 * Mobile / touch, small screens, low-power hints, save-data, or no WebGL → lightweight fallback.
 */
export function useCanRender3D() {
  const fine = useFinePointer()
  const wide = useMediaQuery('(min-width: 768px)')
  const [ok, setOk] = useState<boolean | null>(null)

  useEffect(() => {
    const nav = navigator as Navigator & {
      connection?: { saveData?: boolean }
      deviceMemory?: number
    }
    const lowPower =
      nav.connection?.saveData === true ||
      (nav.deviceMemory !== undefined && nav.deviceMemory < 4) ||
      (navigator.hardwareConcurrency !== undefined && navigator.hardwareConcurrency < 4)
    // Manual override for testing: ?3d=1 forces the WebGL hero, ?3d=0 forces the fallback.
    const force = new URLSearchParams(window.location.search).get('3d')
    if (force === '1' || force === '0') return setOk(force === '1' && hasWebGL())
    setOk(fine && wide && !lowPower && hasWebGL())
  }, [fine, wide])

  return ok
}

/** Track which section is currently in view (for nav highlighting). */
export function useActiveSection(ids: string[]) {
  const [active, setActive] = useState<string>('')
  useEffect(() => {
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[]
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id)
        })
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [ids])
  return active
}
