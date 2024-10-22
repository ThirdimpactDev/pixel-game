import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home'; // Vista principal
import Login from './pages/Login'; // Vista de login

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Ruta para la página principal */}
        <Route path="/" element={<Home />} />

        {/* Ruta para la vista de login */}
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default App;
