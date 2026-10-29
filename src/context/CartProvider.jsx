import { useMemo } from 'react'
import { CartContext } from './cart-context.js'
import { useLocalStorage } from '../hooks/useLocalStorage.js'

function CartProvider({ children }) {
  const [cart, setCart] = useLocalStorage('campuseats-cart', [])
  const [orders, setOrders] = useLocalStorage('campuseats-orders', [])

  const count = cart.reduce((sum, line) => sum + line.qty, 0)

  const total = cart.reduce(
    (sum, line) => sum + line.item.price * line.qty,
    0
  )

  function addToCart(item) {
    setCart((currentCart) => {
      const existingLine = currentCart.find(
        (line) => line.item.id === item.id
      )

      if (existingLine) {
        return currentCart.map((line) =>
          line.item.id === item.id
            ? { ...line, qty: line.qty + 1 }
            : line
        )
      }

      return [...currentCart, { item, qty: 1, note: '' }]
    })
  }

  function changeQty(itemId, amount) {
    setCart((currentCart) =>
      currentCart
        .map((line) =>
          line.item.id === itemId
            ? { ...line, qty: line.qty + amount }
            : line
        )
        .filter((line) => line.qty > 0)
    )
  }

  function removeFromCart(itemId) {
    setCart((currentCart) =>
      currentCart.filter((line) => line.item.id !== itemId)
    )
  }

  function updateNote(itemId, note) {
    setCart((currentCart) =>
      currentCart.map((line) =>
        line.item.id === itemId ? { ...line, note } : line
      )
    )
  }

  function placeOrder(details) {
    const order = {
      ...details,
      items: cart,
      total,
      placedAt: new Date().toISOString(),
    }

    setOrders((currentOrders) => [order, ...currentOrders])
    setCart([])

    return order
  }

  const value = useMemo(
    () => ({
      cart,
      orders,
      count,
      total,
      addToCart,
      changeQty,
      removeFromCart,
      updateNote,
      placeOrder,
    }),
    [cart, orders, count, total]
  )

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  )
}

export default CartProvider