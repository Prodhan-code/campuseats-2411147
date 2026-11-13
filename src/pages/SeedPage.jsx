import { useState } from 'react'
import { seedDemoData } from '../services/vendors.js'

function SeedPage() {
  const [message, setMessage] = useState('')
  const [busy, setBusy] = useState(false)

  async function handleSeed() {
    setBusy(true)
    setMessage('Loading vendor data…')

    try {
      const response = await fetch('/api/vendors.json')

      if (!response.ok) {
        throw new Error(`Could not load vendors (HTTP ${response.status}).`)
      }

      const data = await response.json()
      const vendors = Array.isArray(data) ? data : data.vendors

      if (!Array.isArray(vendors)) {
        throw new Error('The JSON file does not contain a vendors array.')
      }

      await seedDemoData(vendors)
      setMessage(`Done: ${vendors.length} vendors written to Firestore.`)
    } catch (error) {
      setMessage(`Failed: ${error.message}`)
    } finally {
      setBusy(false)
    }
  }

  return (
    <main className="container">
      <section className="card">
        <h2 className="section-title">Seed Firestore</h2>

        <button
          type="button"
          className="btn"
          onClick={handleSeed}
          disabled={busy}
        >
          {busy ? 'Loading…' : 'Load demo data'}
        </button>

        {message && <p role="status">{message}</p>}
      </section>
    </main>
  )
}

export default SeedPage