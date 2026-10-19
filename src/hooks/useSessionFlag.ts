'use client'

import { useCallback, useState } from 'react'

/**
 * Session-scoped boolean flag backed by sessionStorage.
 * Used to remember whether the intro has been seen this session so repeat
 * navigations don't force a blocking intro animation.
 */
export function useSessionFlag(key: string): [boolean, () => void, () => void] {
  const [value, setValue] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem(key) === '1'
    } catch {
      return false
    }
  })

  const set = useCallback(() => {
    try {
      sessionStorage.setItem(key, '1')
    } catch {
      /* ignore storage errors (private mode) */
    }
    setValue(true)
  }, [key])

  const clear = useCallback(() => {
    try {
      sessionStorage.removeItem(key)
    } catch {
      /* ignore */
    }
    setValue(false)
  }, [key])

  return [value, set, clear]
}
