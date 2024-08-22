import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function ItemList({ items, onRemoveItems, onEditItem }) {
  const [selectedItems, setSelectedItems] = useState([]);
  const navigate = useNavigate();

  const handleSelectItem = (itemId) => {
    setSelectedItems((prev) =>
      prev.includes(itemId)
        ? prev.filter((id) => id !== itemId)
        : [...prev, itemId]
    );
  };

  const handleRemove = () => {
    onRemoveItems(selectedItems);
    setSelectedItems([]);
  };

  const handleGetRecipes = async () => {
    const selectedIngredients = selectedItems.map(index => items[index].name);
    if (selectedIngredients.length === 0) {
      alert('Please select ingredients');
      return;
    }
  
    try {
      // Step 1: Fetch recipes based on selected ingredients
      const recipeResponse = await axios.get('https://api.spoonacular.com/recipes/findByIngredients', {
        params: {
          ingredients: selectedIngredients.join(','),
          number: 5,  // Increase the number to get a wider range
          ranking: 2,  // Use ranking to diversify sources
          apiKey: import.meta.env.VITE_SPOONACULAR_API_KEY,
        }
      });
  
      const recipes = recipeResponse.data;
  
      // Step 2: Fetch detailed recipe information
      const recipeIds = recipes.map(recipe => recipe.id);
      const detailedRecipeRequests = recipeIds.map(id =>
        axios.get(`https://api.spoonacular.com/recipes/${id}/information`, {
          params: {
            apiKey: import.meta.env.VITE_SPOONACULAR_API_KEY,
          }
        })
      );
  
      const detailedRecipesResponses = await Promise.all(detailedRecipeRequests);
      const detailedRecipes = detailedRecipesResponses
        .map(response => response.data)
        // .filter(recipe => recipe.sourceName !== 'Foodista'); // Exclude Foodista recipes
  
      // Navigate to the recipes page and pass the detailed recipe data
      navigate('/recipes', { state: { recipes: detailedRecipes } });
    } catch (error) {
      console.error('Error fetching recipes:', error);
    }
  };
  
  

  return (
    <div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Select</th>
            <th scope="col">Name</th>
            <th scope="col">Expiration Date</th>
            <th scope="col">Quantity</th>
            <th scope="col">Unit</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={index}>
              <td>
                <input
                  type="checkbox"
                  checked={selectedItems.includes(index)}
                  onChange={() => handleSelectItem(index)}
                />
              </td>
              <td>{item.name}</td>
              <td>{item.expirationDate}</td>
              <td>{item.quantity}</td>
              <td>{item.unit}</td>
              <td>
                <button className="btn btn-info btn-sm" onClick={() => onEditItem(item)}>
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="d-flex justify-content-between">
        <button className="btn btn-danger btn-sm" onClick={handleRemove}>Remove Selected</button>
        <button className="btn btn-success btn-sm" onClick={handleGetRecipes}>Get Recipe Recommendations</button>
      </div>
    </div>
  );
}

export default ItemList;
