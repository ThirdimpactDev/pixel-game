import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login.jsx'; // Asegúrate de que la ruta sea correcta
import Home from './pages/Home.jsx'; // Asegúrate de que la ruta sea correcta
import Game from './pages/Game.jsx'; // Asegúrate de que la ruta sea correcta
import Music from './pages/Music.jsx'; 

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} /> {/* Componente de inicio */}
        <Route path="/login" element={<Login />} /> {/* Ruta para el login */}
        <Route path="/game" element={<Game />} /> {/* Ruta para el juego */}
      </Routes>
    </Router>
  );
};

export default App;

