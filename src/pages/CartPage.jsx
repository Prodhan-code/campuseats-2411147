import CartItem from '../components/CartItem.jsx'
import CheckoutForm from '../components/CheckoutForm.jsx'
import { useCart } from '../hooks/useCart.js'

function CartPage() {
  const {
    cart,
    total,
    changeQty,
    removeFromCart,
    updateNote,
    placeOrder,
  } = useCart()

  if (cart.length === 0) {
    return (
      <main className="container">
        <p className="muted">
          Your cart is empty. Pick something from a menu first.
        </p>
      </main>
    )
  }

  return (
    <main className="container">
      <div className="cart-layout">
        <div className="card">
          <ul className="cart-list">
            {cart.map((line) => (
              <CartItem
                key={line.item.id}
                line={line}
                onChangeQty={changeQty}
                onRemove={removeFromCart}
                onUpdateNote={updateNote}
              />
            ))}
          </ul>

          <p className="cart-total">Total: RM {total.toFixed(2)}</p>
        </div>

        <CheckoutForm onPlaceOrder={placeOrder} />
      </div>
    </main>
  )
}

export default CartPage