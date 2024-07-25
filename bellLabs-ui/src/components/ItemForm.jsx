import React, { useState } from 'react';

function ItemForm({ onAddItem }) {
  const [name, setName] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [quantity, setQuantity] = useState('');
  const [unit, setUnit] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    onAddItem({ name, expirationDate, quantity, unit });
    setName('');
    setExpirationDate('');
    setQuantity('');
    setUnit('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(event) => setName(event.target.value)}
      />
      <input
        type="date"
        placeholder="Expiration Date"
        value={expirationDate}
        onChange={(event) => setExpirationDate(event.target.value)}
      />
      <input
        type="number"
        placeholder="Quantity"
        value={quantity}
        onChange={(event) => setQuantity(event.target.value)}
      />
      <input 
        type="text"
        placeholder="Unit"
        value={unit}
        onChange={(event) => setUnit(event.target.value)}
      />
      <button type="submit">Add Item</button>
    </form>
  );
}

export default ItemForm;