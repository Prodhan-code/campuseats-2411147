import { useState } from "react";
import { Link, useNavigate } from "react-router";
import CartItem from "../components/CartItem.jsx";
import CheckoutForm from "../components/CheckoutForm.jsx";
import { useAuth } from "../hooks/useAuth.js";
import { useCart } from "../hooks/useCart.js";
import { placeOrders } from "../services/orders.js";

function CartPage() {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const { cart, total, changeQty, removeFromCart, updateNote, clearCart } =
    useCart();
  const [error, setError] = useState("");

  async function handlePlaceOrder(details) {
    if (!user) return;

    setError("");

    try {
      await placeOrders(user, cart, details);
      clearCart();
      navigate("/orders");
    } catch (err) {
      setError(`Could not place the order: ${err.message}`);
    }
  }

  if (cart.length === 0) {
    return (
      <main className="container">
        <p className="muted">
          Your cart is empty. <Link to="/">Browse vendors</Link>
        </p>
      </main>
    );
  }

  return (
    <main className="container">
      <div className="cart-layout">
        <section className="card" aria-label="Shopping cart">
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
        </section>

        {authLoading ? (
          <section className="card">
            <p className="muted">Checking your sign-in…</p>
          </section>
        ) : user ? (
          <>
            {error && (
              <p className="field-error" role="alert">
                {error}
              </p>
            )}

            <CheckoutForm
              defaultName={user?.displayName ?? ""}
              onPlaceOrder={handlePlaceOrder}
            />
          </>
        ) : (
          <section className="card">
            <h2>Checkout</h2>
            <p className="muted">
              Please <Link to="/login">log in</Link> to place your order.
            </p>
          </section>
        )}
      </div>
    </main>
  );
}

export default CartPage;
