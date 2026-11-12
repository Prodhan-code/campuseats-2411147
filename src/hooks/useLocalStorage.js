import { useCallback, useEffect, useState } from 'react'

function readValue(key, initialValue, enabled) {
  const defaultValue =
    typeof initialValue === 'function' ? initialValue() : initialValue

  if (!enabled || !key || typeof window === 'undefined') {
    return defaultValue
  }

  try {
    const savedValue = window.localStorage.getItem(key)
    return savedValue === null ? defaultValue : JSON.parse(savedValue)
  } catch {
    return defaultValue
  }
}

export function useLocalStorage(key, initialValue, enabled = true) {
  const [stored, setStored] = useState(() => ({
    key,
    value: readValue(key, initialValue, enabled),
  }))

  // Load the value for the new key when a different user signs in.
  const value =
    stored.key === key
      ? stored.value
      : readValue(key, initialValue, enabled)

  useEffect(() => {
    if (stored.key !== key) {
      setStored({ key, value })
    }
  }, [key, stored.key, value])

  // Guests use the default value but do not save it.
  useEffect(() => {
    if (!enabled || !key) return

    try {
      window.localStorage.setItem(key, JSON.stringify(value))
    } catch {
      // Storage can be unavailable in some browser settings.
    }
  }, [key, value, enabled])

  const setValue = useCallback(
    (nextValue) => {
      setStored((current) => {
        const currentValue =
          current.key === key
            ? current.value
            : readValue(key, initialValue, enabled)

        const resolvedValue =
          typeof nextValue === 'function'
            ? nextValue(currentValue)
            : nextValue

        return { key, value: resolvedValue }
      })
    },
    [key, initialValue, enabled]
  )

  return [value, setValue]
}