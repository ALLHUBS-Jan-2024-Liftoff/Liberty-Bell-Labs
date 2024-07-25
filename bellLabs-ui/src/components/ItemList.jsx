import React from 'react';

function ItemList({ items, onRemoveItems }) {
  const [selectedItems, setSelectedItems] = React.useState([]);

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
    <>
      <ul>
        {items.map((item, index) => (
          <li key={index}>
            <input
              type="checkbox"
              checked={selectedItems.includes(index)}
              onChange={() => handleSelectItem(index)}
            />
            {item.name} // Expires on {item.expirationDate} // Quantity: {item.quantity} // {item.unit}
          </li>
        ))}
      </ul>
      <button onClick={handleRemove}>Remove Selected</button>
    </>
  );
}

export default ItemList;