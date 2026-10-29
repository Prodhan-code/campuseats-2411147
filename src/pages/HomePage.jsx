import { Link } from 'react-router'
import { useVendors } from '../hooks/useVendors.js'
import { useCart } from '../hooks/useCart.js'
import { Loading, ErrorMessage } from '../components/Status.jsx'
import VendorCard from '../components/VendorCard.jsx'

function HomePage() {
  const { vendors, loading, error, reload } = useVendors()
  const { addToCart } = useCart()

  if (loading) return <Loading />
  if (error) return <ErrorMessage message={error} onRetry={reload} />

  const specials = vendors
    .map((vendor) => {
      const item =
        vendor.menu?.find(
          (menuItem) => menuItem.popular && menuItem.available
        ) || vendor.menu?.find((menuItem) => menuItem.available)

      return item ? { vendor, item } : null
    })
    .filter(Boolean)

  return (
    <main className="container">
      {specials.length > 0 && (
        <section>
          <div className="special-heading">
            <h2 className="special-label">Today’s Special</h2>
            <p>Popular picks from our campus vendors</p>
          </div>

          <div className="grid">
            {specials.map(({ vendor, item }) => (
              <article className="card" key={vendor.id}>
                <h3>{item.name}</h3>
                <p className="muted">{vendor.name}</p>
                <p className="muted">{item.description}</p>
                <p className="price">RM {item.price.toFixed(2)}</p>

                <div className="special-actions">
                  <Link to={`/vendor/${vendor.id}`}>View menu</Link>
                  <button
                    type="button"
                    className="btn"
                    onClick={() => addToCart(item)}
                  >
                    Add to cart
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>
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