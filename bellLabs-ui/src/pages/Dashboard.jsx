import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ItemForm from '../components/ItemForm';
import ItemList from '../components/ItemList';
import notebookList from '../assets/notebookList.jpg';
import '../Dashboard.css'; // Import the CSS file
//import navigate
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const [items, setItems] = useState([]);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [error, setError] = useState(null);
  //initialize navigate function
  const navigate = useNavigate();

  useEffect(() => {
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
    setIsFormVisible(!isFormVisible);
  };
//calll navigate
  const goToShoppingList = () => {
    navigate('/shoppinglists');
  };

  return (
    <div className="dashboard-wrapper">
    {/* <div className="image-container">
      <img src={notebookList} alt="Notebook Item List" />
    </div> */}
  
    <div className="dashboard-header">
      <h1>My Dashboard</h1>
    </div>
  
    <div className="dashboard-buttons">
      <button onClick={toggleFormVisibility}>Toggle Add Item</button>
      <button onClick={goToShoppingList}>Shopping Lists</button>
    </div>
  
    {isFormVisible && <div className="form-container"><ItemForm onAddItem={handleAddItem} /></div>}
  {/* //Notebook Image */}
   <div className="image-container">
      <img src={notebookList} alt="Notebook Item List" />
    </div>
  

      <div className="content-container">
        {error && <div className="error">{error}</div>}
        <div className="item-list">
          <ItemList items={items} onRemoveItems={handleRemoveItems} />
        </div>
        {/* {isFormVisible && <div className="form-container"><ItemForm onAddItem={handleAddItem} /></div>} */}
      </div>
    </div>
  );
}

export default Dashboard;
