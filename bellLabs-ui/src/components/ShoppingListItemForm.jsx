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
        const newItem = { itemName, quantity, unit };


        if (currentItem) {
            // If there's a current item, update it
            onUpdateItem(currentItem.shoppingListItemId, newItem);
        } else {
            // Else, add a new item
            onAddItem(newItem);
        }
/////////////////
        // Clear form after submission
        setItemName('');
        setQuantity('');
        setUnit('');
    };

    return (
        <div className="container">
        <form onSubmit={handleSubmit}>
            <div className="form-row">
                <div className="form-group col-md-4">
                    <label>Item Name</label>
            <input
                type="text"
                // placeholder="Item Name"
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
                className="form-control"
                maxLength="100"
                placeholder="Enter Item Name"
                required
            />
            </div>

            <div className="form-group col-md-4">
                <label>Quantity</label>
            <input
                type="number"
                placeholder="Quantity"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="form-control"
                required
            />
            </div>
            <div className="form-group col-md-4">
                <label>Unit</label>
                <select
                // type="number"
                // placeholder="Unit"
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
                className="form-control">

            <option value="pounds">lbs</option>
            <option value="each">each</option>
            </select>
            </div>
            </div>

            <button type="submit" className="btn btn-primary">{currentItem ? 'Update Item' : 'Add Item'}</button>        
            {/* <button type="submit" className="btn btn-primary">Add to List</button> */}
        </form>
        </div>
    );
}

export default ShoppingListItemForm;