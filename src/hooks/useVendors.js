import { useCallback, useEffect, useState } from 'react'

export function useVendors() {
  const [vendors, setVendors] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [reloadKey, setReloadKey] = useState(0)

  const reload = useCallback(() => {
    setReloadKey((currentKey) => currentKey + 1)
  }, [])

  useEffect(() => {
    const controller = new AbortController()

    async function loadVendors() {
      setLoading(true)
      setError(null)

      try {
        const response = await fetch('/api/vendors.json', {
          signal: controller.signal,
        })

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`)
        }

        const data = await response.json()
        const vendorList = Array.isArray(data) ? data : data.vendors

        if (!Array.isArray(vendorList)) {
          throw new Error('The vendors file must contain a vendors array.')
        }

        setVendors(vendorList)
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message || 'Could not load vendors.')
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false)
        }
      }
    }

    loadVendors()

    return () => controller.abort()
  }, [reloadKey])

  return { vendors, loading, error, reload }
}