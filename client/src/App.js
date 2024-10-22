import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login.jsx'; // Cambia a Login.jsx
import Home from './pages/Home'; // Asegúrate de tener un componente Home

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} /> {/* Componente de inicio */}
        <Route path="/login" element={<Login />} /> {/* Ruta para el login */}
      </Routes>
    </Router>
  );
};

export default App;
