import React, { useState } from 'react';
import '../assets/Home.css';

const Home = () => {
  const [mouseStars, setMouseStars] = useState([]);

  const createStar = (e) => {
    if (Math.random() > 0.15) {
      return;
    }

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newStar = {
      id: Date.now(),
      x,
      y,
      size: Math.random() > 0.5 ? 1 : 2,
      animation: Math.random() > 0.5 ? 'float-up-1' : 'float-up-2'
    };

    setMouseStars(prev => [...prev, newStar]);

    setTimeout(() => {
      setMouseStars(prev => prev.filter(star => star.id !== newStar.id));
    }, 1000);
  };

  return (
    <div
      className="star-background"
      onMouseMove={createStar}
    >
      {mouseStars.map(star => (
        <div
          key={star.id}
          className={`mouse-star ${star.animation} ${star.size === 1 ? 'star-small' : 'star-medium'}`}
          style={{
            left: `${star.x}px`,
            top: `${star.y}px`,
          }}
        />
      ))}

      <div className="stars-container">
        {/* Todas las estrellas existentes se mantienen igual */}
        {/* Primera capa de estrellas pequeñas */}
        <div className="stars-small"></div>
        <div className="stars-small" style={{left: '15%', top: '20%'}}></div>
        <div className="stars-small" style={{left: '25%', top: '45%'}}></div>
        <div className="stars-small" style={{left: '40%', top: '15%'}}></div>
        <div className="stars-small" style={{left: '55%', top: '35%'}}></div>
        <div className="stars-small" style={{left: '70%', top: '25%'}}></div>
        <div className="stars-small" style={{left: '85%', top: '55%'}}></div>
        
        {/* Segunda capa de estrellas pequeñas */}
        <div className="stars-small" style={{left: '5%', top: '65%'}}></div>
        <div className="stars-small" style={{left: '35%', top: '80%'}}></div>
        <div className="stars-small" style={{left: '45%', top: '5%'}}></div>
        <div className="stars-small" style={{left: '65%', top: '50%'}}></div>
        <div className="stars-small" style={{left: '80%', top: '75%'}}></div>
        <div className="stars-small" style={{left: '95%', top: '40%'}}></div>
        
        {/* Tercera capa de estrellas pequeñas */}
        <div className="stars-small" style={{left: '8%', top: '35%'}}></div>
        <div className="stars-small" style={{left: '28%', top: '70%'}}></div>
        <div className="stars-small" style={{left: '48%', top: '40%'}}></div>
        <div className="stars-small" style={{left: '68%', top: '15%'}}></div>
        <div className="stars-small" style={{left: '88%', top: '85%'}}></div>

        {/* Estrellas medianas */}
        <div className="stars-medium" style={{left: '10%', top: '30%'}}></div>
        <div className="stars-medium" style={{left: '30%', top: '60%'}}></div>
        <div className="stars-medium" style={{left: '50%', top: '25%'}}></div>
        <div className="stars-medium" style={{left: '75%', top: '45%'}}></div>
        <div className="stars-medium" style={{left: '90%', top: '15%'}}></div>
        <div className="stars-medium" style={{left: '20%', top: '85%'}}></div>
        <div className="stars-medium" style={{left: '40%', top: '55%'}}></div>
        <div className="stars-medium" style={{left: '60%', top: '75%'}}></div>
        <div className="stars-medium" style={{left: '80%', top: '5%'}}></div>
        <div className="stars-medium" style={{left: '95%', top: '65%'}}></div>
      </div>

      <div className="content">
        <h1>Welcome to the Home Page</h1>
      </div>

      {/* Botón de login en la esquina superior derecha */}
      <button className="login-button">
        Login
        <div className="pixel-animation">
          {[...Array(32)].map((_, index) => (
            <div key={index} className="pixel" />
          ))}
        </div>
      </button>
    </div>
  );
};

export default Home;