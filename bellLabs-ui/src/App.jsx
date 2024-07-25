import React from 'react';
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import NavBar from './components/NavBar';
import Dashboard from './pages/Dashboard';

function App() {
  
  return (
    <Router>
      <div className="App">
        <NavBar/>
        <Routes>
          <Route 
            path="/dashboard" 
            element={<Dashboard/>}
          />
        </Routes>
      </div>
    </Router>
  )
}

export default App;