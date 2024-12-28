// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Game from './pages/Game';
import OAuthRedirect from './components/OAuthRedirect';
import ProtectedRoute from './components/ProtectedRoute';

const App = () => {
    return (
        <Router>
            <Routes>
                {/* Rutas públicas */}
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                
                {/* Rutas de autenticación OAuth */}
                <Route path="/oauth2/redirect" element={<OAuthRedirect />} />
                <Route path="/login/oauth2/code/google" element={<OAuthRedirect />} />
                <Route path="/oauth/callback" element={<OAuthRedirect />} />
                
                {/* Ruta protegida */}
                <Route
                    path="/game"
                    element={
                        <ProtectedRoute>
                            <Game />
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </Router>
    );
};

export default App;