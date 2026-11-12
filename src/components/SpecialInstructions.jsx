import { Link } from 'react-router'

function SpecialInstructions({ itemId, note, onUpdateNote, user }) {
  if (!user) {
    return (
      <p className="cart-note muted">
        <Link to="/login">Log in to add notes</Link>
      </p>
    )
  }

  return (
    <div className="cart-note">
      <label htmlFor={`note-${itemId}`}>Special instructions</label>
      <textarea
        id={`note-${itemId}`}
        rows="2"
        placeholder="For example: no mayonnaise, extra spicy"
        value={note}
        onChange={(event) => onUpdateNote(itemId, event.target.value)}
      />
    </div>
  )
}

export default SpecialInstructions