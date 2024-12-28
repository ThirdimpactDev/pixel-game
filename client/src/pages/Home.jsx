import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/Home.css';
import Button from '../components/Button';

const Home = () => {
  const [mouseStars, setMouseStars] = useState([]);
  const [pixelExplosions, setPixelExplosions] = useState([]);
  const audioUrl = "https://white-mariellen-36.tiiny.site/click_effect-86995.mp3";
  const audio = new Audio(audioUrl);
  const navigate = useNavigate();

  const createStar = (e) => {
    if (Math.random() > 0.15) return;

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

  const handleLoginClick = (e) => {
    audio.play();
    navigate('/login');
    handleExplosion(e);
  };

  const handlePlayClick = (e) => {
    audio.play();
    navigate('/game');
    handleExplosion(e);
  };

  const handleExplosion = (e) => {
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const explosions = Array.from({ length: 10 }).map((_, index) => ({
      id: `${Date.now()}-${Math.random()}-${index}`,
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
  {[...Array(7)].map((_, i) => (
    <div key={`small-star-${i}`} className="stars-small" style={{
      left: `${15 + i * 15}%`,
      top: `${20 + (i % 3) * 15}%`
    }}></div>
  ))}

  {[...Array(10)].map((_, i) => (
    <div key={`medium-star-${i}`} className="stars-medium" style={{
      left: `${10 + i * 10}%`,
      top: `${(30 + i * 5) % 85}%`
    }}></div>
  ))}
</div>

      <h1 className="glitch" data-text="Welcome to Pixel Totsugeki!">Welcome to Pixel Totsugeki!</h1>
      
      <button className="pixel-button" onClick={handleLoginClick}>
        Login
        <div className="pixel-animation">
          {[...Array(32)].map((_, index) => (
            <div key={index} className="pixel" />
          ))}
        </div>
      </button>

      <button className="play-button" onClick={handlePlayClick}>
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
