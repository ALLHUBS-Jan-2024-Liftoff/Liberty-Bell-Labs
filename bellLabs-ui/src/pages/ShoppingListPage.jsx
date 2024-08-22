import React, {useState, useEffect} from 'react';
import axios from 'axios';
import ShoppingListForm from '../components/ShoppingListForm';
import ShoppingListItemForm from '../components/ShoppingListItemForm';

function ShoppingListPage() {
const [shoppingLists, setShoppingLists] = useState([]);
const [selectedList, setSelectedList] = useState(null);
const [editingList, setEditingList] = useState(null);
const [editingItem, setEditingItem] = useState(null);
const [error, setError] = useState(null);

//fetch all shopping lists
useEffect(() => {
axios.get('http://localhost:8080/api/shoppinglists')
.then(response => {
  setShoppingLists(response.data);
})
.catch(error => {
  console.error('Error fetching shopping lists:', error);
  setError(error);
});

}, []);

//select list when a user clicks on one
const handleSelectList = (list) => {
  setSelectedList(list);
};
//add a list
const handleAddList = (listData) => {
  axios.post('http://localhost:8080/api/shoppinglists', listData)
  .then(response => setShoppingLists([...shoppingLists, response.data]))
  .catch(error => {
    console.error('Error adding shopping list:', error);
    setError('Error adding shopping list');
  });
};
//update a list
const handleUpdateList = (shoppingListId, listData) => {
  axios.put(`http://localhost:8080/api/shoppinglists/${shoppingListId}`, listData)
  .then(response => {
    setShoppingLists(shoppingLists.map(list => list.shoppingListId === shoppingListId ? response.data : list));
    setEditingList(null);
  })
  .catch(error => {
    console.error('Error updatin shopping list:', error);
    setError('Error updatin shopping list');
  });
}


//delete a list
 const handleDeleteList = (shoppingListId) => {
  axios.delete(`http://localhost:8080/api/shoppinglists/${shoppingListId}`)
    .then(() => {
      setShoppingLists(shoppingLists.filter(list => list.shoppingListId !== shoppingListId));
      if (selectedList && selectedList.shoppingListId === shoppingListId) {
        setSelectedList(null);
      }
    })
    .catch(error => {
      console.error('Error deleting shopping list:', error);
      setError('Error deleting shopping list');
    });
};





  return (
    <div className="container mt-4">
<h1>Shopping Lists</h1>
{/* Shopping List form */}

{/* <ShoppingListForm currentList={editingList}
onSave={editingList ? handleUpdateList : handleAddList}
/> */}
<ShoppingListForm
                shoppingList={editingList}
                onCreateList={handleAddList}
                onUpdateList={handleUpdateList}
            />

{/* Display all shopping lists */}
<ul>
{shoppingLists.map(list => (
  <li key={list.shoppingListId}>
    <span>{list.listName}</span>
    <button onClick={() => setEditingList(list)}>Edit</button>
    <button onClick={() => handleDeleteList(list.shoppingListId)}>Delete</button>
  </li>
))}

</ul>
{/* handle error */}
{error && (
  <div className="alert alert-danger">
    {error}
    </div>
)}


    </div>
  )
}

export default ShoppingListPage