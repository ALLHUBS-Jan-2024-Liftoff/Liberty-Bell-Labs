import React from 'react';
import './App.css'
import { BrowserRouter as Router, Route, Routes, BrowserRouter } from 'react-router-dom';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import NavBar from './components/NavBar';
import Dashboard from './pages/Dashboard';
import { RegistrationPage } from './pages/RegistrationPage';
import { LoginPage } from './pages/LoginPage';
import { AuthProvider } from './context/AuthContext';
import  SearchRecipe  from './services/SearchRecipe';
import ShoppingList from './pages/ShoppingList';

function App() {
  
  return (
    <AuthProvider>
      <BrowserRouter>
        <NavBar/>
        <Routes>
          <Route 
            path="/dashboard" 
            element={<Dashboard/>}
          />
          <Route 
            path="/register" 
            element={<RegistrationPage/>}
          />
          <Route 
            path="/" 
            element={<LoginPage/>}
          />
          {/* testing out searchrecipe */}
          <Route path="/search" element={<SearchRecipe/>}/>
          <Route path="/shoppinglists" element={<ShoppingList/>}/>
        </Routes>
    </BrowserRouter>
    </AuthProvider>
  )
}

export default App;