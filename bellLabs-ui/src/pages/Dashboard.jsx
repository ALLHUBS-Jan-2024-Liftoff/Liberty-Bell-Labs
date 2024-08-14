import { useState, useEffect } from 'react';
import axios from 'axios';
import ItemForm from '../components/ItemForm';
import ItemList from '../components/ItemList';
import '../Dashboard.css'; // Import the CSS file (if needed)
import { useNavigate } from 'react-router-dom'; // Import navigate

function Dashboard() {
  const [items, setItems] = useState([]);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [error, setError] = useState(null);
  const [currentItem, setCurrentItem] = useState(null); // State for item being updated
  const navigate = useNavigate(); // Initialize navigate function

  useEffect(() => {
    axios.get('http://localhost:8080/api/items')
      .then(response => setItems(response.data))
      .catch(error => {
        console.error('Error fetching items:', error);
        setError('Error fetching items');
      });
  }, []);

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

  const goToShoppingList = () => {
    navigate('/shoppinglists');
  };

  return (
    <div className="container mt-4">

      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1>My Dashboard</h1>
        <div>
          <button
            className="btn btn-secondary me-2"
            onClick={toggleFormVisibility}
          >
            {isFormVisible ? 'Hide Add Item Form' : 'Add New Item'}
          </button>
          <button
            className="btn btn-info"
            onClick={goToShoppingList}
          >
            Shopping Lists
          </button>
        </div>
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

export default Dashboard;
