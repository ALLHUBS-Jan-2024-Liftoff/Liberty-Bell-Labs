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
    <div>
    <table className="table table-striped">
      <thead>
        <tr>
          <th scope="col">Select</th>
          <th scope="col">Name</th>
          <th scope="col">Expiration Date</th>
          <th scope="col">Quantity</th>
          <th scope="col">Unit</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody>
        {items.map((item, index) => (
          <tr key={index}>
            <td>
              <input
                type="checkbox"
                checked={selectedItems.includes(index)}
                onChange={() => handleSelectItem(index)}
              />
            </td>
            <td>{item.name}</td>
            <td>{item.expirationDate}</td>
            <td>{item.quantity}</td>
            <td>{item.unit}</td>
            <td>
              <button className="btn btn-primary btn-sm" onClick={() => onEditItem(item)}>
                Edit
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
      <button className="btn btn-danger btn-sm" onClick={handleRemove}>Remove Selected</button>
    </div>
  );
}

export default ItemList;