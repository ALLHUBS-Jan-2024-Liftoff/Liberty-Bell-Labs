import axios from 'axios'
import { useState, useEffect } from 'react'
import ItemForm from '../components/ItemForm';
import ItemList from '../components/ItemList';
import { useNavigate } from 'react-router-dom'; // Import navigate




function ShoppingList() {
   //hold all shoppinglists
   const [shoppingLists, setShoppingLists] = useState([]);
  // Hold selected list
  const [selectedList, setSelectedList] = useState(null);
  // Hold items per list
  const [itemsPerList, setItemsPerList] = useState({});
  const [isItemFormVisible, setIsItemFormVisible] = useState(false); // For Add Item form
  const [isCreateListFormVisible, setIsCreateListFormVisible] = useState(false); // For Create List form
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
      axios.get(`http://localhost:8080/api/shoppinglistitems/list/${shoppingListId}`)
        .then(response => {
          setItemsPerList(prevItems => ({
            ...prevItems,
            [shoppingListId]: response.data
          }));
        })
        .catch(error => {
          console.error('Error fetching items:', error);
          setError('Error fetching items');
        });
    }
  }, [shoppingListId]);

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

  // Handle selecting a shopping list
  const handleSelectList = (listId) => {
    setSelectedList(listId);
    axios.get(`http://localhost:8080/api/shoppinglistitems/list/${listId}`)
      .then(response => setItemsPerList(prevItems => ({
        ...prevItems,
        [listId]: response.data
      })))
      .catch(error => {
        console.error('Error fetching items:', error);
        setError('Error fetching items');
      });
  };

  // Handle adding an item to the selected list
  const handleAddItemToSelectedList = (item) => {
    if (!selectedList) {
      setError('No shopping list selected');
      return;
    }

    axios.post(`http://localhost:8080/api/shoppinglistitems/${selectedList}/items`, item)
      .then(response => {
        setItemsPerList(prevItems => ({
          ...prevItems,
          [selectedList]: [...(prevItems[selectedList] || []), response.data]
        }));
      })
      .catch(error => {
        console.error('Error adding item:', error);
        setError('Error adding item');
      });
  };

  // Handle updating an item in the selected list
  const handleUpdateItem = (id, updatedItem) => {
    axios.put(`http://localhost:8080/api/shoppinglistitems/list/${selectedList}/items/${id}`, updatedItem)
      .then(response => {
        setItemsPerList(prevItems => ({
          ...prevItems,
          [selectedList]: prevItems[selectedList].map(item => item.id === id ? response.data : item)
        }));
        setCurrentItem(null);
      })
      .catch(error => {
        console.error('Error updating item:', error);
        setError('Error updating item');
      });
  };

  // Handle removing items from the selected list
  const handleRemoveItems = (selectedIndices) => {
    const idsToDelete = selectedIndices.map(index => itemsPerList[selectedList][index].id);
    const deleteRequests = idsToDelete.map(id => axios.delete(`http://localhost:8080/api/shoppinglistitems/list/${selectedList}/items/${id}`));

    axios.all(deleteRequests)
      .then(axios.spread(() => {
        setItemsPerList(prevItems => ({
          ...prevItems,
          [selectedList]: prevItems[selectedList].filter((_, index) => !selectedIndices.includes(index))
        }));
      }))
      .catch(error => {
        console.error('Error deleting items:', error);
        setError('Error deleting items');
      });
  };

  // Handle creating a new shopping list
  const handleCreateShoppingList = () => {
    const shoppinglist = { listName: shoppingListName };
    axios.post('http://localhost:8080/api/shoppinglists', shoppinglist)
      .then(response => {
        setShoppingLists([...shoppingLists, response.data]);
        setShoppingListId(response.data.shoppingListId);
        setShoppingListName('');
        setIsCreateListFormVisible(false);
      })
      .catch(error => {
        console.error('Error creating shopping list:', error);
        setError('Error creating shopping list');
      });
  };

  // Toggle item form visibility
  const toggleItemFormVisibility = () => {
    setIsItemFormVisible(!isItemFormVisible);
  };

  // Toggle create list form visibility
  const toggleCreateListFormVisibility = () => {
    setIsCreateListFormVisible(!isCreateListFormVisible);
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1>Shopping List</h1>
        {!isCreateListFormVisible && (
          <button
            className="btn btn-primary"
            onClick={toggleCreateListFormVisibility}
          >
            Create New Shopping List
          </button>
        )}

        {isCreateListFormVisible && (
          <div className="d-flex">
            <input
              type="text"
              className="form-control me-2"
              value={shoppingListName}
              onChange={(e) => setShoppingListName(e.target.value)}
              placeholder='Enter shopping list name'
            />
            <button
              className='btn btn-success'
              onClick={handleCreateShoppingList}
            >
              Create
            </button>
          </div>
        )}
      </div>

      {/* Display shopping list names below header */}
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
                    onClick={() => handleSelectList(list.shoppingListId)}
                  >
                    {list.listName}
                  </button>
                </h5>
              </div>

              <div
                id={`collapse${index}`}
                className={`collapse ${selectedList === list.shoppingListId ? 'show' : ''}`}
                aria-labelledby={`heading${index}`}
                data-parent="#accordion"
              >
                <div className="card-body">
                  <ItemList
                    items={itemsPerList[selectedList] || []}
                    onRemoveItems={handleRemoveItems}
                    onEditItem={setCurrentItem}
                  />
                  <button
                    className="btn btn-secondary mt-3"
                    onClick={toggleItemFormVisibility}
                  >
                    {isItemFormVisible ? 'Hide Add Item Form' : 'Add New Item'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No shopping lists available</p>
      )}

      {/* Add Item Form */}
      {isItemFormVisible && (
        <div className="mb-4">
          <ItemForm 
            onAddItem={handleAddItemToSelectedList}
            currentItem={currentItem}
            onUpdateItem={handleUpdateItem}
          />
        </div>
      )}

      {/* Error Handling */}
      {error && (
        <div className="alert alert-danger">
          {error}
        </div>
      )}
    </div>
  );
}

export default ShoppingList;