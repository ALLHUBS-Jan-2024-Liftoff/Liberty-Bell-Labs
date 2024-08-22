import { useEffect, useState } from 'react';

function ShoppingListItemForm({ onAddItem, onUpdateItem, currentItem }) {
    const [itemName, setItemName] = useState('');
    const [quantity, setQuantity] = useState('');
    const [unit, setUnit] = useState('');

    useEffect(() => {
        if (currentItem) {
            setItemName(currentItem.itemName);
            setQuantity(currentItem.quantity);
            setUnit(currentItem.unit);
        }
    }, [currentItem]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const item = { itemName, quantity, unit };

        if (currentItem) {
            // If there's a current item, update it
            onUpdateItem(currentItem.id, item);
        } else {
            // Else, add a new item
            onAddItem(item);
        }

        // Clear form after submission
        setItemName('');
        setQuantity('');
        setUnit('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Item Name"
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
                required
            />
            <input
                type="number"
                placeholder="Quantity"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                required
            />
            <input
                type="text"
                placeholder="Unit"
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
            />
            <button type="submit">{currentItem ? 'Update Item' : 'Add Item'}</button>        
        </form>
    );
}

export default ShoppingListItemForm;
