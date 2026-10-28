import { Link, useParams } from 'react-router'
import { useVendors } from '../hooks/useVendors.js'
import { useCart } from '../hooks/useCart.js'
import { Loading, ErrorMessage } from '../components/Status.jsx'
import MenuList from '../components/MenuList.jsx'

function VendorPage() {
  const { id } = useParams()
  const { vendors, loading, error, reload } = useVendors()
  const { addToCart } = useCart()

  if (loading) return <Loading />
  if (error) return <ErrorMessage message={error} onRetry={reload} />

  const vendor = vendors.find((item) => item.id === id)

  if (!vendor) {
    return (
      <main className="container">
        <h2>Vendor not found</h2>
        <Link to="/">Back to vendors</Link>
      </main>
    )
  }

  return (
    <main className="container">
      <p><Link to="/">← Back to vendors</Link></p>
      <h2 className="section-title">{vendor.name}</h2>
      <p className="muted">{vendor.location}</p>
      <p className="muted">Open: {vendor.openHours}</p>
      <span className={vendor.isOpen ? 'status open' : 'status closed'}>
        {vendor.isOpen ? 'Open now' : 'Closed'}
      </span>

      <h3 className="section-title">Menu</h3>
      <MenuList items={vendor.menu} />
    </main>
  )
}

export default VendorPage