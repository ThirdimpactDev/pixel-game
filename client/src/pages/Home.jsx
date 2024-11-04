import React, { useState } from 'react';
import '../assets/Home.css';
import Button from '../components/Button'; // Importa el componente Button

const Home = () => {
  const [mouseStars, setMouseStars] = useState([]);
  const [pixelExplosions, setPixelExplosions] = useState([]);
  const audioUrl = "https://white-mariellen-36.tiiny.site/click_effect-86995.mp3";
  const audio = new Audio(audioUrl);

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

  const handleClick = (e) => {
    audio.play(); // Reproduce el sonido al hacer clic

    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const explosions = Array.from({ length: 10 }).map(() => ({
      id: Date.now() + Math.random(),
      x: centerX + (Math.random() * 40 - 20),
      y: centerY + (Math.random() * 40 - 20),
    }));

    setPixelExplosions(prev => [...prev, ...explosions]);

    setTimeout(() => {
      setPixelExplosions(prev => prev.filter(p => !explosions.includes(p)));
    }, 500);
  };

  return (
    <div className="star-background" onMouseMove={createStar}>
      {/* Animación de explosión de píxeles */}
      {pixelExplosions.map((pixel) => (
        <div
          key={pixel.id}
          className="pixel-explode"
          style={{
            position: 'fixed',
            left: `${pixel.x}px`,
            top: `${pixel.y}px`,
          }}
        />
      ))}

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
        {/* Capa de estrellas pequeñas */}
        <div className="stars-small"></div>
        <div className="stars-small" style={{left: '15%', top: '20%'}}></div>
        <div className="stars-small" style={{left: '25%', top: '45%'}}></div>
        <div className="stars-small" style={{left: '40%', top: '15%'}}></div>
        <div className="stars-small" style={{left: '55%', top: '35%'}}></div>
        <div className="stars-small" style={{left: '70%', top: '25%'}}></div>
        <div className="stars-small" style={{left: '85%', top: '55%'}}></div>
        
        {/* Más capas de estrellas... */}
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

      <h1 className="glitch" data-text="Welcome to Pixel Totsugeki!">Welcome to Pixel Totsugeki!</h1>
      
      {/* Botón de login con animación de explosión de píxeles */}
      <button className="pixel-button" onClick={handleClick}>
        Login
        <div className="pixel-animation">
          {[...Array(32)].map((_, index) => (
            <div key={index} className="pixel" />
          ))}
        </div>
      </button>
      
      <button className="play-button" onClick={handleClick}>
        Play
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
