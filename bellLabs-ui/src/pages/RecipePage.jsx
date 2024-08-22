import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import '../RecipePage.css'; // Import the CSS file

function removeHTMLTags(str) {
  return str.replace(/<\/?[^>]+(>|$)/g, "");
}

function truncateSummary(text, length = 100) {
  if (text.length <= length) return text;
  return text.substring(0, length) + '...';
}

function Meta({ title, description }) {
  return (
    <div className="metaItem">
      <span className="metaTitle">{title}:</span> {description || 'N/A'}
    </div>
  );
}

function RecipePage() {
  const location = useLocation();
  const { recipes } = location.state || { recipes: [] };
  const [showFullSummary, setShowFullSummary] = useState({});
  const [userIngredients, setUserIngredients] = useState([]);

  useEffect(() => {
    // Fetch user ingredients from the Spring Boot controller
    axios.get('http://localhost:8080/api/items')
      .then(response => {
        setUserIngredients(response.data);
      })
      .catch(error => {
        console.error('Error fetching user ingredients:', error);
      });
  }, []);

  const handleShowMore = (id) => {
    setShowFullSummary((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const countMatchingIngredients = (recipeIngredients) => {
    return recipeIngredients.filter(ingredient => 
      userIngredients.includes(ingredient.nameClean)
    ).length;
  };

  const sortedRecipes = [...recipes].sort((a, b) => 
    countMatchingIngredients(b.extendedIngredients) - countMatchingIngredients(a.extendedIngredients)
  );

  const formatIngredients = (ingredients) => {
    return ingredients.map(ingredient => {
      const isMatching = userIngredients.includes(ingredient.nameClean);
      return (
        <span
          key={ingredient.id}
          className={isMatching ? 'matchingIngredient' : 'unmatchingIngredient'}
        >
          {ingredient.nameClean}
        </span>
      );
    });
  };

  return (
    <div className="container">
      <h1>Recipe Recommendations</h1>
      <div className="row">
        {sortedRecipes.length > 0 ? (
          sortedRecipes.map((recipe) => {
            const summaryText = removeHTMLTags(recipe.summary);
            const isFullSummaryShown = showFullSummary[recipe.id];
            const matchingCount = countMatchingIngredients(recipe.extendedIngredients);

            return (
              <div key={recipe.id} className="col-md-4">
                <div className="card mb-4">
                  <div className="imageContainer">
                    <img
                      src={recipe.image || 'default-image-url'}
                      className="image"
                      alt={recipe.title || 'No Title'}
                    />
                  </div>
                  <div className="cardBody">
                    <h5 className="card-title title">
                      {recipe.title || 'No Title'}
                    </h5>

                    {/* Ingredients */}
                    <div className="ingredients">
                      <strong>Ingredients:</strong> {formatIngredients(recipe.extendedIngredients)}
                    </div>

                    {/* Summary with Show More/Less */}
                    <div className="summary">
                      {isFullSummaryShown
                        ? summaryText
                        : truncateSummary(summaryText, 100)}
                    </div>
                    {summaryText.length > 100 && (
                      <div
                        className="showMoreButton"
                        onClick={() => handleShowMore(recipe.id)}
                      >
                        {isFullSummaryShown ? 'Show Less' : 'Show More'}
                      </div>
                    )}

                    {/* Divider */}
                    <div className="divider" />

                    {/* Meta Information */}
                    <div className="meta">
                      <Meta title="Course" description={recipe.dishTypes?.join('/')} />
                      <Meta title="Ready in" description={`${recipe.readyInMinutes} minutes`} />
                      <Meta title="Cuisine" description={recipe.cuisines?.join('/')} />
                      <Meta title="Servings" description={recipe.servings} />
                    </div>

                    {/* Button container for consistency */}
                    <div className="buttonContainer">
                      {recipe.sourceUrl ? (
                        <a
                          href={recipe.sourceUrl}
                          className="btn btn-primary"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          View Recipe
                        </a>
                      ) : (
                        <p className="card-text">Source URL not available</p>
                      )}
                    </div>

                    {/* Matching Ingredients Count */}
                    <div className="matchingCount">
                      {matchingCount} matching ingredients
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <p>No recipes found</p>
        )}
      </div>
    </div>
  );
}

export default RecipePage;