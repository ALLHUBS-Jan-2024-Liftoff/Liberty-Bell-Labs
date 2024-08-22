import React from 'react'

function ShoppingList({list, onEdit, onDelete, onSelect}) {
  return (
    <li>
        <span onClick={onSelect}>{list.listName}</span>
        <button onClick={onEdit}>Edit</button>
        <button onClick={() => onDelete(list.shoppingListId)}>Delete</button>
    </li>
  );
}

export default ShoppingList