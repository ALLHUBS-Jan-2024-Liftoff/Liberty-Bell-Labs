import axios from 'axios'
import { useState, useEffect } from 'react'
import ItemForm from '../components/ItemForm';
import ItemList from '../components/ItemList';
import { useNavigate } from 'react-router-dom'; // Import navigate




function ShoppingList() {
  const [items, setItems] = useState([]);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [error, setError] = useState(null);
  const [currentItem, setCurrentItem] = useState(null);
  const [shoppingListName, setShoppingListName] = useState('');
  const [shoppingListId, setShoppingListId] = useState(null); 
  const navigate = useNavigate();

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
    const shoppinglist = {name: shoppingListName};
    axios.post('http://localhost:8080/api/shoppinglists', shoppinglist)
    .then(response => {
        setShoppingListId(response.data.id);
        setShoppingListName('');
        setIsFormVisible(false);
    })
    .catch(error => {
        console.error('Error creating shopping lists:', error);
        setError('Error creating shopping list');
    });
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

      {isFormVisible &&
        <div className="mb-4">
          <ItemForm 
            onAddItem={handleAddItem}
            onUpdateItem={handleUpdateItem}
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
