import { useEffect, useState } from 'react';

function ItemForm({ onAddItem, onUpdateItem, currentItem }) {
  const [name, setName] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [quantity, setQuantity] = useState('');
  const [unit, setUnit] = useState('');

  useEffect(() => {
    if(currentItem) {
      setName(currentItem.name);
      setExpirationDate(currentItem.expirationDate);
      setQuantity(currentItem.quantity);
      setUnit(currentItem.unit);
    }
  }, [currentItem]);
  
  const handleSubmit = (event) => {
    event.preventDefault();
    const item = { name, expirationDate, quantity, unit };
    if(currentItem) {
      onUpdateItem(currentItem.id, item);
    } else {
      onAddItem(item);
    }
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
      <button type="submit">{currentItem ? 'Update Item' : 'Add Item'}</button>
    </form>
  );
}

export default ItemForm;