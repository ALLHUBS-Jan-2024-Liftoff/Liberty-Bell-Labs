import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ItemForm from '../components/ItemForm';
import ItemList from '../components/ItemList';
import notebookList from '../assets/notebookList.jpg'


function Dashboard() {
  const [items, setItems] = useState([]);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    //change the endpoint from 'api items' '/api/items' to http://localhost:8080/api/items to make buttons appear
    axios.get('http://localhost:8080/api/items')
      .then(response => setItems(response.data))
      .catch(error => {
        console.error('Error fetching items:', error);
        setError('Error fetching items');
      });
  }, []);

  const handleAddItem = (item) => {
    axios.post('/api/items', item)
      .then(response => setItems([...items, response.data]))
      .catch(error => {
        console.error('Error adding item:', error);
        setError('Error adding item');
      });
  };

  const handleRemoveItems = (selectedIndices) => {
    const idsToDelete = selectedIndices.map(index => items[index].id);
    axios.delete('/api/items', { data: idsToDelete })
      .then(() => setItems(items.filter((_, index) => !selectedIndices.includes(index))))
      .catch(error => {
        console.error('Error deleting items:', error);
        setError('Error deleting items');
      });
  };

  const toggleFormVisibility = () => {
    setIsFormVisible(isFormVisible);
  };

  //Navigate to shopping list page
  const goToShoppingList = () => {
    navigate('shoppinglists');
  }

  return (
    <div>
      <h1>My Dashboard</h1>

    <div className="d-flex align-items-start">
      {/* image */}
      
      <img src={notebookList} 
      alt="Notebook Item List" 
      style={{width:300, height: 'auto', marginLeft: '0px' }}/>

      {error && <div className="error">{error}</div>}
      <div className="flex-grow-1">
        <ItemList items={items} onRemoveItems={handleRemoveItems} />
      </div>
      {isFormVisible && <div className="ms-3"><ItemForm onAddItem={handleAddItem} /></div>}
      <button onClick={toggleFormVisibility}>Toggle Add Item</button>
    </div>
    {/* Add shopping list button */}
    <button onClick={goToShoppingList}>Shopping Lists</button>
    </div>
    
  );
}
export default Dashboard;