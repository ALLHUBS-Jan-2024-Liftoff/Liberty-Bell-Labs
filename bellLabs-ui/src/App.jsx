// import React from 'react';
// import './App.css'
// import { BrowserRouter as Router, Route, Routes, BrowserRouter } from 'react-router-dom';
// import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
// import NavBar from './components/NavBar';
// import Dashboard from './pages/Dashboard';
// import { RegistrationPage } from './pages/RegistrationPage';
// import { LoginPage } from './pages/LoginPage';
// import { AuthProvider } from './context/AuthContext';
// import  SearchRecipe  from './services/SearchRecipe';
// import ShoppingList from './pages/ShoppingList';


// function App() {
  
//   return (
//     <AuthProvider>
//       <BrowserRouter>
//         <NavBar/>
//         <Routes>
//           <Route 
//             path="/dashboard" 
//             element={<Dashboard/>}
//           />
//           <Route 
//             path="/register" 
//             element={<RegistrationPage/>}
//           />
//           <Route 
//             path="/" 
//             element={<LoginPage/>}
//           />
//           {/* testing out searchrecipe */}
//           <Route path="/search" element={<SearchRecipe/>}/>
//           <Route path="/shoppinglists" element={<ShoppingList/>}/>
//         </Routes>
//     </BrowserRouter>
//     </AuthProvider>
//   )
// }

// export default App;

import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  Link,
} from "react-router-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Logout from "./pages/Logout";
import NavBar from './components/NavBar';
import Dashboard from './pages/Dashboard';
import  SearchRecipe  from './services/SearchRecipe';
import ShoppingList from './pages/ShoppingList';
import "./App.css";

function App() {
  const [authenticated, setAuthenticated] = useState(false);

  return (
    <Router>
      <nav>
        {!authenticated ? (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        ) : (
          <>
            <NavBar />
            {/* <Link to="/dashboard">Dashboard</Link>
            <Link to="/search">Search Recipe</Link>
            <Link to="/logout">Logout</Link> */}
          </>
        )}
      </nav>
      <div className="App">
        <header className="App-header">
          <Routes>
            {/* Public Routes */}
            <Route
              path="/login"
              element={<Login setAuthenticated={setAuthenticated} />}
            />
            <Route path="/register" element={<Register />} />

            {/* Private Routes */}
            {authenticated ? (
              <>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/search" element={<SearchRecipe />} />
                <Route
                  path="/logout"
                  element={<Logout setAuthenticated={setAuthenticated} />}
                />
              </>
            ) : (
              <Route path="*" element={<Navigate to="/login" replace />} />
            )}
          </Routes>
        </header>
      </div>
    </Router>
  );
}

export default App;