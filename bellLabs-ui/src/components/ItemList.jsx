import {useState} from 'react';

function ItemList({ items, onRemoveItems, onEditItem }) {
  const [selectedItems, setSelectedItems] = useState([]);

  const handleSelectItem = (itemId) => {
    setSelectedItems((prev) =>
      prev.includes(itemId)
        ? prev.filter((id) => id !== itemId)
        : [...prev, itemId]
    );
  };

  const handleRemove = () => {
    onRemoveItems(selectedItems);
    setSelectedItems([]);
  };

  return (
    // 'remove selected' button name
    <div className='item-list-container'>
      <ul>
        {items.map((item, index) => (
          <li key={index}>
            <input
              type="checkbox"
              checked={selectedItems.includes(index)}
              onChange={() => handleSelectItem(index)}
            />
            {item.name} exp: {item.expirationDate} Quantity: {item.quantity} {item.unit}
            <button onClick={()=> onEditItem(item)}>Edit</button>
          </li>
        ))}
      </ul>
      <button onClick={handleRemove}>Remove Selected</button>
    </div>
  );
}

export default ItemList;