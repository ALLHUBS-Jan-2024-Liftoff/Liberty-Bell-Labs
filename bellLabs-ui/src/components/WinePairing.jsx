import { useState, useEffect } from 'react';
import axios from 'axios';

function WinePairing({ recipeTitle }) {
  const [winePairings, setWinePairings] = useState([]);

  useEffect(() => {
    const fetchWinePairing = () => {
      axios.get(`https://api.spoonacular.com/food/wine/pairing`, {
        params: {
          food: recipeTitle,
          apiKey: import.meta.env.VITE_SPOONACULAR_API_KEY,
        }
      })
      .then(response => {
        setWinePairings(response.data.pairedWines || []);
      })
      .catch(error => {
        console.error('Error fetching wine pairing:', error);
      });
    };

    fetchWinePairing();
  }, [recipeTitle]);

  return (
    <div className="winePairing">
      <h3>Wine Pairing Suggestions:</h3>
      {winePairings.length > 0 ? (
        <ul>
          {winePairings.map((wine, idx) => (
            <li key={idx}>{wine}</li>
          ))}
        </ul>
      ) : (
        <p>Loading wine pairings...</p>
      )}
    </div>
  );
}

export default WinePairing;