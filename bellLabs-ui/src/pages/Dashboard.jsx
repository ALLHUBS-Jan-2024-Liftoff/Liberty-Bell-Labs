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

  const goToRecipeRecommendations = (selectedItems) => {
    // Navigate to the recipe page with the selected items as ingredients
    navigate('/recipes', { state: { ingredients: selectedItems.map(index => items[index].name) } });
  };

  const goToShoppingList = () => {
    navigate('/shoppinglists');
  };

  return (
    <div className="container mt-4">
      {/* Hero Section */}
      <div className="hero text-black bg-dark bg-opacity-10 text-center py-5 mb-4 rounded-lg shadow">
        <h1 className="display-4 mb-3">Welcome to Your Dashboard!</h1>
        <p className="lead mb-4">
          Manage your items efficiently. Add, update, or remove items as needed and keep track of everything seamlessly. Use the buttons below to get started.
        </p>
      </div>

      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Item Management</h2>
        <div>
          <button
            className="btn btn-light me-2"
            onClick={toggleFormVisibility}
          >
            {isFormVisible ? 'Hide Form' : 'Add New Item'}
          </button>
        </div>
      </div>

      {isFormVisible &&
        <div className="mb-4">
          <div className="card shadow-sm">
            <div className="card-body">
              <ItemForm 
                onAddItem={handleAddItem}
                onUpdateItem={handleUpdateItem}
                currentItem={currentItem}
              />
            </div>
          </div>
        </div>
      }

      <div>
        {error && (
          <div className="alert alert-danger">
            {error}
          </div>
        )}
        <div className="card shadow-sm">
          <div className="card-body">
            <ItemList 
              items={items} 
              onRemoveItems={handleRemoveItems}
              onEditItem={handleEditItem}
              onGetRecipes={goToRecipeRecommendations} // Pass the new handler 
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;