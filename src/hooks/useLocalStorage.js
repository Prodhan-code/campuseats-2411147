import { useEffect, useState } from 'react'

export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const savedValue = window.localStorage.getItem(key)
      return savedValue !== null ? JSON.parse(savedValue) : initialValue
    } catch {
      return initialValue
    }
  })

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value))
    } catch {
      // Keep the in-memory value if browser storage is unavailable.
    }
  }, [key, value])

  return [value, setValue]
}