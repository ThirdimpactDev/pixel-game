import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login.jsx'; // Asegúrate de que la ruta sea correcta
import Home from './pages/Home.jsx'; // Asegúrate de que la ruta sea correcta

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

