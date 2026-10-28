import { useVendors } from '../hooks/useVendors.js'
import { Loading, ErrorMessage } from '../components/Status.jsx'
import VendorCard from '../components/VendorCard.jsx'

function HomePage() {
  const { vendors, loading, error, reload } = useVendors()

  if (loading) return <Loading />
  if (error) return <ErrorMessage message={error} onRetry={reload} />

  return (
    <main className="container">
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
    </main>
  )
}

export default HomePage