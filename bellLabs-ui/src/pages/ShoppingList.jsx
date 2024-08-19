import axios from 'axios'
import { useState, useEffect } from 'react'
import ItemForm from '../components/ItemForm';
import ItemList from '../components/ItemList';
import { useNavigate } from 'react-router-dom'; // Import navigate




function ShoppingList() {
   //hold all shoppinglists
   const [shoppingLists, setShoppingLists] = useState([]);
   //hold new list name
   const [newListName, setNewListName] = useState('');
   //hold selected list
   const [selectedList, setSelectedList] = useState(null);
  const [items, setItems] = useState([]);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [error, setError] = useState(null);
  const [currentItem, setCurrentItem] = useState(null);
  const [shoppingListName, setShoppingListName] = useState('');
  const [shoppingListId, setShoppingListId] = useState(null); 
  const navigate = useNavigate();


  useEffect(() => {
    fetchShoppingLists();
}, []);


  useEffect(() => {
if (shoppingListId) {
    axios.get(`http://localhost:8080/api/items`)
      .then(response => setItems(response.data))
      .catch(error => {
        console.error('Error fetching items:', error);
        setError('Error fetching items');
      });
    }
  }, [shoppingListId]);


    

  const handleAddItem = (item) => {
    axios.post('http://localhost:8080/api/items', item)
      .then(response => setItems([...items, response.data]))
      .catch(error => {
        console.error('Error adding item:', error);
        setError('Error adding item');
      });
  };

  const handleUpdateItem = (id, updatedItem) => {
    axios.put(`http://localhost:8080/api/items/${id}`, updatedItem)
    .then(response => {
      setItems(items.map(item => item.id === id ? response.data : item));
      setCurrentItem(null);
    })
    .catch(error => {
      console.error('Error updating item:', error);
      setError('Error updating item');
    });
  };

  const handleRemoveItems = (selectedIndices) => {
    const idsToDelete = selectedIndices.map(index => items[index].id);
    const deleteRequests = idsToDelete.map(id => axios.delete(`http://localhost:8080/api/items/${id}`));

    axios.all(deleteRequests)
      .then(axios.spread(() => {
        setItems(items.filter((_, index) => !selectedIndices.includes(index)));
      }))
      .catch(error => {
        console.error('Error deleting items:', error);
        setError('Error deleting items');
      });
  };

  const toggleFormVisibility = () => {
    setIsFormVisible(!isFormVisible);
  };

  const handleEditItem = (item) => {
    setCurrentItem(item);
    setIsFormVisible(true);
  };

  //create shoppinglist
  const handleCreateShoppingList = () => {
    const shoppinglist = {listName: shoppingListName};
    axios.post('http://localhost:8080/api/shoppinglists', shoppinglist)
    .then(response => {
      setShoppingLists([...shoppingLists, response.data]);
        setShoppingListId(response.data.id);
        setShoppingListName('');
        setIsFormVisible(false);
    })
    .catch(error => {
        console.error('Error creating shopping lists:', error);
        setError('Error creating shopping list');
    });
  };

 // Fetch all shopping lists
 const fetchShoppingLists = async () => {
  try {
      const response = await axios.get('http://localhost:8080/api/shoppinglists');
      setShoppingLists(Array.isArray(response.data) ? response.data : []);
      console.log('Fetched Shopping Lists:', response.data);
  } catch (error) {
      console.error('Error fetching shopping lists', error);
      setShoppingLists([]);
  }
};



const selectList = (list) => {
setSelectedList(list);
fetchItemsForSelectedList(list.shoppingListId); 
};

const fetchItemsForSelectedList = async (listId) => {
try {
  const response = await axios.get(`http://localhost:8080/api/shoppinglists/${listId}/items`);
  setItems(response.data);
} catch (error) {
  console.error('Error fetching items:', error);
  setError('Error fetching items');
}
};

const handleToggleList = (listId) => {
if (shoppingListId === listId) {
  setShoppingListId(null); // Close the current list
} else {
  setShoppingListId(listId); // Open the new list
  fetchItemsForSelectedList(listId);
}
};



  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1>Shopping List</h1>
        {!isFormVisible && (
             <button
             className="btn btn-primary"
             onClick={() => setIsFormVisible(true)}
           >
             Create New Shopping List
           </button>
         )}

         {isFormVisible && (
            <div className="d-flex">
                <input type="text"
                className="form-control me-2"
                value={shoppingListName}
                onChange={(e) => setShoppingListName(e.target.value)}
                placeholder='Enter shopping list name'/>

                <button className='btn btn-success'
                onClick={handleCreateShoppingList}>Create</button>
                </div>
         )}
       
        <button
          className="btn btn-secondary"
          onClick={toggleFormVisibility}
        >
          {isFormVisible ? 'Hide Add Item Form' : 'Add New Item'}
        </button>
      </div>

 {/* display shopping list names below header */}
 {shoppingLists.length > 0 ? (
        <div id="accordion">
          {shoppingLists.map((list, index) => (
            <div className="card" key={list.shoppingListId}>
              <div className="card-header" id={`heading${index}`}>
                <h5 className="mb-0">
                  <button
                    className="btn btn-link"
                    data-toggle="collapse"
                    data-target={`#collapse${index}`}
                    aria-expanded="true"
                    aria-controls={`collapse${index}`}
                    onClick={() => handleToggleList(list.shoppingListId)}
                  >
                    {list.listName}
                  </button>
                </h5>
              </div>

              <div
                id={`collapse${index}`}
                className={`collapse ${shoppingListId === list.shoppingListId ? 'show' : ''}`}
                aria-labelledby={`heading${index}`}
                data-parent="#accordion"
              >
                <div className="card-body">
                  <ItemList
                    items={items}
                    onRemoveItems={handleRemoveItems}
                    onEditItem={handleEditItem}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No shopping lists available</p>
      )}

      {isFormVisible &&
        <div className="mb-4">
          <ItemForm 
            onAddItem={handleAddItem}
            onUpdateItem={() => {}}
            currentItem={currentItem}
          />
        </div>
      }

      <div>
        {error && (
          <div className="alert alert-danger">
            {error}
          </div>
        )}
        <ItemList 
          items={items} 
          onRemoveItems={handleRemoveItems}
          onEditItem={handleEditItem} 
        />
      </div>
    </div>
  );
}

export default ShoppingList;
