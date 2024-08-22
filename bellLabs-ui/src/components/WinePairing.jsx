import { useState, useEffect } from 'react';
import axios from 'axios';
import '../WinePairing.css';

function WinePairing({ recipeTitle, ingredients }) {
  const [productMatches, setProductMatches] = useState([]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const fetchWinePairing = () => {
      const query = ingredients.length > 0 ? ingredients[0] : recipeTitle;
      axios.get(`https://api.spoonacular.com/food/wine/pairing`, {
        params: {
          food: query,
          apiKey: import.meta.env.VITE_SPOONACULAR_API_KEY,
        }
      })
      .then(response => {
        setProductMatches(response.data.productMatches || []);
      })
      .catch(error => {
        console.error('Error fetching wine pairing:', error);
      });
    };

    fetchWinePairing();
  }, [recipeTitle, ingredients]);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div className="winePairing">
      <button onClick={toggleVisibility} className="btn btn-secondary">
        {isVisible ? 'Hide Wine Pairing' : 'Show Wine Pairing'}
      </button>

      {isVisible && (
        <div className="winePairingContainer">
          {productMatches.length > 0 ? (
            <div className="productMatches">
              <h4>Recommended Wine:</h4>
              <ul>
                {productMatches.map((product, idx) => (
                  <li key={idx}>
                    <a href={product.link} target="_blank" rel="noopener noreferrer">
                      <img src={product.imageUrl} alt={product.title} />
                      <p>{product.price}</p>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p>No wine pairing available.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default WinePairing;