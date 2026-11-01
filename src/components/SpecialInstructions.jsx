function SpecialInstructions({ itemId, note, onUpdateNote }) {
  return (
    <div className="cart-note">
      <label htmlFor={`note-${itemId}`}>Special instructions</label>
      <textarea
        id={`note-${itemId}`}
        placeholder="For example: no mayonnaise, extra spicy"
        rows={2}
        value={note}
        onChange={(event) => onUpdateNote(itemId, event.target.value)}
      />
    </div>
  )
}

export default SpecialInstructions