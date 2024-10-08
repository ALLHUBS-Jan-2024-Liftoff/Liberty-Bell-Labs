import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle';
import Login from "./pages/Login";
import Register from "./pages/Register";
import Logout from "./pages/Logout";
import NavBar from './components/NavBar';
import Dashboard from './pages/Dashboard';
import ShoppingListPage from './pages/ShoppingListPage';
import SearchRecipe from './services/SearchRecipe';

import "./App.css";
import Home from "./pages/Home";
import About from './pages/About'; // Import LearnMore component
import RecipePage from "./pages/RecipePage";

function ProtectedRoute({ authenticated, children }) {
  return authenticated ? children : <Navigate to="/login" replace />;
}

function App() {
  const [authenticated, setAuthenticated] = useState(false);

  return (
    <Router>
      <NavBar authenticated={authenticated} />
      <div className="App">
        <header className="App-header">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route
              path="/login"
              element={<Login setAuthenticated={setAuthenticated} />}
            />
            <Route path="/register" element={<Register />} />
            <Route path="/about" element={<About />} /> {/* Add route for LearnMore */}

            {/* Private Routes */}
            <Route path="/dashboard" element={
              <ProtectedRoute authenticated={authenticated}>
                <Dashboard />
              </ProtectedRoute>
            } />
            <Route path="/search" element={
              <ProtectedRoute authenticated={authenticated}>
                <SearchRecipe />
              </ProtectedRoute>
            } />
            <Route path="/shoppinglists" element={
              <ProtectedRoute authenticated={authenticated}>
                <ShoppingListPage/>
              </ProtectedRoute>
            } />
             <Route path="/recipes" element={
              <ProtectedRoute authenticated={authenticated}>
                <RecipePage />
              </ProtectedRoute>
            } />
            <Route path="/logout" element={
              <ProtectedRoute authenticated={authenticated}>
                <Logout setAuthenticated={setAuthenticated} />
              </ProtectedRoute>
            } />
          </Routes>
        </header>
      </div>
    </Router>
  );
}

export default App;
