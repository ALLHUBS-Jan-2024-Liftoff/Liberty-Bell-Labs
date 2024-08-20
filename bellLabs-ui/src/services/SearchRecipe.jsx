import { useState, useEffect } from 'react';
import axios from 'axios';

const SearchRecipe = () => {
    // State to store the fetched data
    const[recipes, setRecipes] = useState([]);
    const [query, setQuery] = useState('');

    // Function to fetch data using Axios
    const fetchRecipe = async () => {
        if(!query) {
            return;
        }
        try {
            const response = await axios.get('https://api.spoonacular.com/recipes/complexSearch', {
                params: {
                    query: query, //
                    apiKey: import.meta.env.VITE_SPOONACULAR_API_KEY , // API key
                },
            });
            setRecipes(response.data.results);
        } catch (error) {
            console.error("Error feathing recipes", error);
        }
    };
 // Call fetchData on component mount
    useEffect(() => {
        fetchRecipe();
    }, []);

    return (
        <div>
            <h2>Search for Recipes:</h2>
            <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder='Enter a recipe name'
            />
            <button onClick={fetchRecipe}>Search</button>

            <h2>Recipes:</h2>
            <ul>
                {recipes.map((recipe) => (
                     <li key={recipe.id}>{recipe.title}</li>
                ))}
            </ul>
        </div>
    )
   
}

  

export default SearchRecipe;
