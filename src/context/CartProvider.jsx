import { useEffect } from 'react'
import { CartContext } from './cart-context.js'
import { useLocalStorage } from '../hooks/useLocalStorage.js'
import { useAuth } from '../hooks/useAuth.js'

const EMPTY_NOTES = {}

function CartProvider({ children }) {
  const { user } = useAuth()

  const [cart, setCart] = useLocalStorage('campuseats-cart', [])

  const notesKey = user ? `ce-notes-${user.uid}` : 'ce-notes-guest'
  const [notes, setNotes] = useLocalStorage(
    notesKey,
    EMPTY_NOTES,
    Boolean(user)
  )

  const ordersKey = user
    ? `campuseats-orders-${user.uid}`
    : 'campuseats-orders-guest'
  const [orders, setOrders] = useLocalStorage(
    ordersKey,
    [],
    Boolean(user)
  )

  // Remove notes left in the old shared cart storage by the earlier version.
  useEffect(() => {
    if (cart.some((line) => Object.hasOwn(line, 'note'))) {
      setCart((currentCart) =>
        currentCart.map(({ note, ...line }) => line)
      )
    }
  }, [cart, setCart])

  const cartWithNotes = cart.map((line) => ({
    ...line,
    note: user ? notes[line.item.id] ?? '' : '',
  }))

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

      return [...currentCart, { item, qty: 1 }]
    })
  }

  function changeQty(itemId, amount) {
    const existingLine = cart.find((line) => line.item.id === itemId)

    if (user && existingLine && existingLine.qty + amount <= 0) {
      setNotes((currentNotes) => {
        const updatedNotes = { ...currentNotes }
        delete updatedNotes[itemId]
        return updatedNotes
      })
    }

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

    if (user) {
      setNotes((currentNotes) => {
        const updatedNotes = { ...currentNotes }
        delete updatedNotes[itemId]
        return updatedNotes
      })
    }
  }

  function updateNote(itemId, note) {
    if (!user) return

    setNotes((currentNotes) => ({
      ...currentNotes,
      [itemId]: note,
    }))
  }

  function placeOrder(details) {
    if (!user) {
      throw new Error('You must log in before placing an order.')
    }

    const order = {
      id: `ord-${Date.now()}`,
      createdAt: new Date().toISOString(),
      ...details,
      userId: user.uid,
      items: cartWithNotes,
      total,
    }

    setOrders((currentOrders) => [order, ...currentOrders])
    setCart([])
    setNotes(EMPTY_NOTES)

    return order
  }

  const value = {
    cart: cartWithNotes,
    orders,
    count,
    total,
    addToCart,
    changeQty,
    removeFromCart,
    updateNote,
    placeOrder,
  }

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  )
}

export default CartProvider