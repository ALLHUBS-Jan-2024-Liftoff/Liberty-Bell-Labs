import React, {useState, useEffect} from 'react';
import axios from 'axios';
import ShoppingListForm from '../components/ShoppingListForm';
import ShoppingListItemForm from '../components/ShoppingListItemForm';
// import ShoppingList from '../components/ShoppingList';

function ShoppingListPage() {
const [shoppingLists, setShoppingLists] = useState([]);
const [selectedList, setSelectedList] = useState(null);
const [editingList, setEditingList] = useState(null);
const [items, setItems] = useState([]);
const [editingItem, setEditingItem] = useState(null);
const [error, setError] = useState(null);

//fetch all shopping lists
useEffect(() => {
axios.get('http://localhost:8080/api/shoppinglists')
.then(response => {
  //

  //
  setShoppingLists(response.data);
})
.catch(error => {
  console.error('Error fetching shopping lists:', error);
  setError(error);
});

}, []);

//moving this handleadditem down//
// const handleAddItem = (newItem) => {
//   setItems([...items, newItem]);
// };

//select list when a user clicks on one

// const handleSelectList = (list) => {
//   setSelectedList(list);
// };
const handleSelectList = (list) => {
  setSelectedList(list);
  setItems(list.items);
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
        //
        setItems([]);
        //
      }
    })
    .catch(error => {
      console.error('Error deleting shopping list:', error);
      setError('Error deleting shopping list');
    });
};

//items

// Add a new item to the selected list
const handleAddItem = (newItem) => {
  if (!selectedList) {
    setError("Please select a shopping list first.");
    return;
  }

  axios
    .post(
      `http://localhost:8080/api/shoppinglists/${selectedList.shoppingListId}/items`,
      newItem
    )
    .then((response) => {
      const addedItem = response.data;

      // Update the items state
      setItems((prevItems) => [...prevItems, addedItem]);

      // Update the shoppingLists state
      setShoppingLists((prevLists) =>
        prevLists.map((list) =>
          list.shoppingListId === selectedList.shoppingListId
            ? { ...list, items: [...list.items, addedItem] }
            : list
        )
      );
    })
    .catch((error) => {
      console.error("Error adding item:", error);
      setError("Error adding item");
    });
};

 // Update an existing item in the selected list
 const handleUpdateItem = (itemId, updatedItem) => {
  axios.put(`http://localhost:8080/api/shoppinglists/${selectedList.shoppingListId}/items/${itemId}`, updatedItem)
      .then(response => {
          setItems(items.map(item => 
              item.shoppingListItemId === itemId ? response.data : item
          ));
          setEditingItem(null);
      })
      .catch(error => {
          console.error('Error updating item:', error);
          setError('Error updating item');
      });
};

// Delete an item from the selected list
const handleDeleteItem = (itemId) => {
  axios.delete(`http://localhost:8080/api/shoppinglists/${selectedList.shoppingListId}/items/${itemId}`)
      .then(() => {
          setItems(items.filter(item => item.shoppingListItemId !== itemId));
      })
      .catch(error => {
          console.error('Error deleting item:', error);
          setError('Error deleting item');
      });
};




  return (
    <div className="container mt-4">
<h1>Shopping Lists</h1>
{/* Shopping List form */}

<ShoppingListForm
                shoppingList={editingList}
                onCreateList={handleAddList}
                onUpdateList={handleUpdateList}
            />

{/* Display all shopping lists */}
<ul>
{shoppingLists.map(list => (
  <li key={list.shoppingListId}>
    {/* <span>{list.listName}</span> */}
    <span onClick={() => handleSelectList(list)}>{list.listName}</span>
    <button onClick={() => setEditingList(list)}>Edit</button>
    <button onClick={() => handleDeleteList(list.shoppingListId)}>Delete</button>
  </li>
))}

</ul>
{/* handle error */}
{error && (
  <div className="alert alert-danger">
    {error.message}
    </div>
)}
{/* shopping lists item form */}
{selectedList && (
                <>
                    <h2>Items in {selectedList.listName}</h2>
<ShoppingListItemForm 
onAddItem={handleAddItem}
//
onUpdateItem={handleUpdateItem}
currentItem={editingItem}
//
/>
{/* display items */}
<ul>
                        {items.map(item => (
                            <li key={item.shoppingListItemId}>
                                {item.itemName} - {item.quantity} {item.unit}
                                <button onClick={() => setEditingItem(item)}>Edit</button>
                                <button onClick={() => handleDeleteItem(item.shoppingListItemId)}>Delete</button>
                            </li>
                        ))}
                    </ul>
                    </>
)}

{/* <ul>
  {items.map((item, index) => (
    <li key={index}>
      {item.itemName} - {item.quantity} {item.unit}
    </li>
  ))}
</ul> */}


    </div>
  );
}

export default ShoppingListPage