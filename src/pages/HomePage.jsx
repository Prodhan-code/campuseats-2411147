import { useVendors } from '../hooks/useVendors.js'
import { useAuth } from '../hooks/useAuth.js'
import { Loading, ErrorMessage } from '../components/Status.jsx'
import VendorCard from '../components/VendorCard.jsx'

function HomePage() {
  const { vendors, loading, error, reload } = useVendors()
  const { user } = useAuth()

  if (loading) return <Loading />
  if (error) return <ErrorMessage message={error} onRetry={reload} />

  const displayName =
    user?.displayName || user?.email?.split('@')[0] || 'there'

  return (
    <main className="container">
      {user && (
        <h2 className="welcome-title">Hi, {displayName} 👋</h2>
      )}

      <section>
        <h2 className="section-title">Choose a vendor</h2>

        {vendors.length === 0 ? (
          <p className="muted">No vendors found.</p>
        ) : (
          <div className="vendor-grid">
            {vendors.map((vendor) => (
              <VendorCard key={vendor.id} vendor={vendor} />
            ))}
          </div>
        )}
      </section>
    </main>
  )
}

export default HomePage