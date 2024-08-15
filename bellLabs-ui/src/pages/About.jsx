// src/pages/LearnMore.js
import React from 'react';
import '../About.css';

export default function LearnMore() {
  return (
    <div className="learn-more-container">
      <div className="learn-more-content">
        <h1>Learn More About Kitchen Compass</h1>
        <p>
          Kitchen Compass is your ultimate recipe discovery tool, helping you make the most out of your ingredients. Explore new recipes, get meal ideas, and manage your shopping list with ease.
        </p>
        <div className="features">
          <div className="feature-item">
            <h2>Ingredient-Based Search</h2>
            <p>Find recipes using the ingredients you have at home.</p>
          </div>
          <div className="feature-item">
            <h2>Recipe Suggestions</h2>
            <p>Get recommendations for new dishes to try based on your preferences.</p>
          </div>
          <div className="feature-item">
            <h2>Shopping List Integration</h2>
            <p>Create and manage shopping lists to keep track of what you need.</p>
          </div>
          <div className="feature-item">
            <h2>Personalized Recommendations</h2>
            <p>Receive tailored suggestions that fit your taste and dietary needs.</p>
          </div>
        </div>
        <a href="/" className="btn btn-primary">Back to Home</a>
      </div>
    </div>
  );
}
