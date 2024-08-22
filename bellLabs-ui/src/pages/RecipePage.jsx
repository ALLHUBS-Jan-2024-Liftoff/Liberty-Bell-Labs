import { useState } from 'react';
import { useLocation } from 'react-router-dom';

function removeHTMLTags(str) {
  return str.replace(/<\/?[^>]+(>|$)/g, "");
}

const styles = {
  card: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    overflow: 'hidden', // Ensure content does not overflow
  },
  imageContainer: {
    height: '200px',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  cardBody: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    padding: '15px', // Add padding for consistency
  },
  title: {
    fontSize: '1.25rem',
    marginBottom: '10px',
  },
  summary: {
    flexGrow: 1,
    marginBottom: '10px',
    color: '#333',
    overflow: 'hidden', // Hide overflow
  },
  showMoreButton: {
    color: '#007bff',
    cursor: 'pointer',
    fontWeight: 'bold',
    marginTop: '10px',
  },
  divider: {
    height: '1px',
    backgroundColor: '#ddd',
    margin: '10px 0',
  },
  meta: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr', // Adjusted columns
    gap: '10px',
    marginBottom: '10px',
  },
  metaItem: {
    fontSize: '0.9rem',
    color: '#555',
  },
  metaTitle: {
    fontWeight: 'bold',
    marginRight: '5px',
  },
  buttonContainer: {
    marginTop: 'auto',
  },
};

function Meta({ title, description }) {
  return (
    <div style={styles.metaItem}>
      <span style={styles.metaTitle}>{title}:</span> {description || 'N/A'}
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
                <div className="card mb-4" style={styles.card}>
                  <div style={styles.imageContainer}>
                    <img
                      src={recipe.image || 'default-image-url'}
                      style={styles.image}
                      alt={recipe.title || 'No Title'}
                    />
                  </div>
                  <div className="card-body" style={styles.cardBody}>
                    <h5 className="card-title" style={styles.title}>
                      {recipe.title || 'No Title'}
                    </h5>

                    {/* Summary with Show More/Less */}
                    <div style={styles.summary}>
                      {isFullSummaryShown
                        ? summaryText
                        : truncateSummary(summaryText, 100)}
                    </div>
                    {summaryText.length > 100 && (
                      <div
                        style={styles.showMoreButton}
                        onClick={() => handleShowMore(recipe.id)}
                      >
                        {isFullSummaryShown ? 'Show Less' : 'Show More'}
                      </div>
                    )}

                    {/* Divider */}
                    <div style={styles.divider} />

                    {/* Meta Information */}
                    <div style={styles.meta}>
                      <Meta title="Course" description={recipe.dishTypes?.join('/')} />
                      <Meta title="Ready in" description={`${recipe.readyInMinutes} minutes`} />
                      <Meta title="Cuisine" description={recipe.cuisines?.join('/')} />
                      <Meta title="Servings" description={recipe.servings} />
                    </div>

                    {/* Button container for consistency */}
                    <div style={styles.buttonContainer}>
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
