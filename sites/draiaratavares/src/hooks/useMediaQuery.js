import { useState, useEffect } from 'react'

/**
 * Hook para media queries responsivas.
 *
 * @param {string} query - Media query string (ex: '(min-width: 768px)')
 * @returns {boolean} Se a media query esta ativa
 */
export function useMediaQuery(query) {
  const [matches, setMatches] = useState(() => {
    if (typeof window === 'undefined') return false
    return window.matchMedia(query).matches
  })

  useEffect(() => {
    const mql = window.matchMedia(query)
    const handler = (e) => setMatches(e.matches)

    mql.addEventListener('change', handler)
    setMatches(mql.matches)

    return () => mql.removeEventListener('change', handler)
  }, [query])

  return matches
}

/**
 * Breakpoints pre-definidos para facilitar uso.
 */
export function useIsMobile() {
  return !useMediaQuery('(min-width: 768px)')
}

export function useIsTablet() {
  return useMediaQuery('(min-width: 768px)') && !useMediaQuery('(min-width: 1024px)')
}

export function useIsDesktop() {
  return useMediaQuery('(min-width: 1024px)')
}
