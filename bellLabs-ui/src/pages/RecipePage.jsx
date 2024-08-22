import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import '../RecipePage.css'; // Import the CSS file

function removeHTMLTags(str) {
  return str.replace(/<\/?[^>]+(>|$)/g, "");
}

function Meta({ title, description }) {
  return (
    <div className="metaItem">
      <span className="metaTitle">{title}:</span> {description || 'N/A'}
    </div>
  );
}

function truncateSummary(text, length = 100) {
  if (text.length <= length) return text;
  return text.substring(0, length) + '...';
}

function RecipePage() {
  const location = useLocation();
  const { recipes } = location.state || { recipes: [] };
  const [showFullSummary, setShowFullSummary] = useState({});

  const handleShowMore = (id) => {
    setShowFullSummary((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="container">
      <h1>Recipe Recommendations</h1>
      <div className="row">
        {recipes.length > 0 ? (
          recipes.map((recipe) => {
            const summaryText = removeHTMLTags(recipe.summary);
            const isFullSummaryShown = showFullSummary[recipe.id];

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