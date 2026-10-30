import { Link } from 'react-router'
import { useCart } from '../hooks/useCart.js'

function OrdersPage() {
  const { orders } = useCart()

  if (orders.length === 0) {
    return (
      <main className="container">
        <p className="muted">
          No orders yet. <Link to="/">Browse vendors</Link>
        </p>
      </main>
    )
  }

  return (
    <main className="container">
      <section>
        <h2 className="section-title">My orders</h2>

        <ul className="order-list">
          {orders.map((order, orderIndex) => {
            const orderItems = order.items ?? order.lines ?? []

            return (
              <li
                key={order.id ?? order.placedAt ?? orderIndex}
                className="card"
              >
                <h3>Order {orders.length - orderIndex}</h3>

                <p className="cart-name">
                  Pickup {order.pickupTime} · Mahallah {order.mahallah}
                </p>

                {orderItems.map((line) => (
                  <p className="muted" key={line.item.id}>
                    {line.qty} × {line.item.name}
                    {line.note?.trim() && (
                      <>
                        <br />
                        Special instructions: {line.note}
                      </>
                    )}
                  </p>
                ))}

                <p className="price">RM {order.total.toFixed(2)}</p>
              </li>
            )
          })}
        </ul>
      </section>
    </main>
  )
}

export default OrdersPage