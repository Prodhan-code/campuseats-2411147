import { useAuth } from '../hooks/useAuth.js'
import SpecialInstructions from './SpecialInstructions.jsx'

function CartItem({ line, onChangeQty, onRemove, onUpdateNote }) {
  const { user } = useAuth()
  const { item, qty, note = '' } = line

  return (
    <li className="cart-line">
      <div>
        <p className="cart-name">{item.name}</p>
        <p className="muted">RM {item.price.toFixed(2)} each</p>
      </div>

      <div className="qty">
        <button
          type="button"
          aria-label={`Decrease ${item.name} quantity`}
          onClick={() => onChangeQty(item.id, -1)}
        >
          −
        </button>
        <span>{qty}</span>
        <button
          type="button"
          aria-label={`Increase ${item.name} quantity`}
          onClick={() => onChangeQty(item.id, 1)}
        >
          +
        </button>
      </div>

      <p className="line-total">
        RM {(item.price * qty).toFixed(2)}
      </p>

      <button
        type="button"
        className="link danger"
        onClick={() => onRemove(item.id)}
      >
        Remove
      </button>

      <SpecialInstructions
        itemId={item.id}
        note={note}
        onUpdateNote={onUpdateNote}
        user={user}
      />
    </li>
  )
}

export default CartItem