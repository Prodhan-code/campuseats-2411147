import { Link } from 'react-router'
import { useCart } from '../hooks/useCart.js'

function OrdersPage() {
  const { orders } = useCart()

  return (
    <main className="container">
      <h2 className="section-title">My orders</h2>

      {orders.length === 0 ? (
        <div className="card">
          <p className="muted">You haven’t placed any orders yet.</p>
          <Link to="/">Browse vendors</Link>
        </div>
      ) : (
        <ul className="order-list">
          {orders.map((order, orderIndex) => (
            <li
              className="card"
              key={order.id ?? order.placedAt ?? orderIndex}
            >
              <h3>Order {orders.length - orderIndex}</h3>
              <p>Name: {order.name}</p>
              <p>Mahallah: {order.mahallah}</p>
              <p>Pickup time: {order.pickupTime}</p>

              {order.placedAt && (
                <p className="muted">
                  Placed: {new Date(order.placedAt).toLocaleString()}
                </p>
              )}

              <ul>
                {order.items.map((line) => (
                  <li key={line.item.id}>
                    {line.qty} × {line.item.name}
                    {line.note?.trim() && (
                      <p className="muted">
                        Special instructions: {line.note}
                      </p>
                    )}
                  </li>
                ))}
              </ul>

              <p className="price">Total: RM {order.total.toFixed(2)}</p>
            </li>
          ))}
        </ul>
      )}
    </main>
  )
}

export default OrdersPage