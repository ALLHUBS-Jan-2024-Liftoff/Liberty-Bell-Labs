import { useEffect, useState } from 'react';
import ShoppingListItemForm from './ShoppingListItemForm';

 function ShoppingListForm({onCreateList, onUpdateList, shoppingList }) {
    const [listName, setListName] = useState('');

    useEffect(() => {
        if (shoppingList) {
            setListName(shoppingList.listName);
        }
    }, [shoppingList]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const newList = { listName };



    if (shoppingList) {
        onUpdateList(shoppingList.shoppingListId, newList);
    } else {
        onCreateList(newList);
    }
    setListName('');
};


  return (
   
    <form onSubmit={handleSubmit}>
    <input
        type="text"
        placeholder="Shopping List Name"
        value={listName}
        onChange={(e) => setListName(e.target.value)}/>
        <button type="submit" className="btn btn-primary">New List</button>
        </form>
  )
}

export default ShoppingListForm;