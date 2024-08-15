import React from 'react';
import logo from './logo.jpg';
import '../Home.css';

export default function Home() {
  return (
    <div className="home-container">
      <div className="home-content text-center">
        <img src={logo} alt="Kitchen Compass Logo" className="logo" />
        <h1 className="mt-4">Welcome to Kitchen Compass!</h1>
        <p className="lead mt-2">Your ultimate destination for discovering delicious recipes based on the ingredients you have.</p>
        <p className="mt-3">Whether you're a home cook or a professional chef, Kitchen Compass helps you make the most of what you have in your pantry. Explore new dishes, find inspiration, and never run out of meal ideas.</p>
        <div className="cta-buttons mt-4">
          <a href="/login" className="btn btn-primary btn-lg">Get Started</a>
          <a href="/about" className="btn btn-secondary btn-lg ms-2">Learn More</a>
        </div>
      </div>
    </div>
  );
}
