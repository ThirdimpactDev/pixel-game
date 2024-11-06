import React, { useState } from 'react';
import RetroAudioButton from '../components/RetroAudioButton';
import RetroButton from '../components/RetroButton';
import styles from '../components/Button.module.css';

const Game = () => {
  const rows = 30;
  const cols = 40;
  const totalSquares = rows * cols;
  const [selectedSquares, setSelectedSquares] = useState({});
  const [selectedColor, setSelectedColor] = useState('blue');
  const [isDrawing, setIsDrawing] = useState(false);

  const handleSquareClick = (id) => {
    setSelectedSquares((prev) => ({
      ...prev,
      [id]: prev[id] ? null : selectedColor,
    }));
  };

  const handleMouseDown = (id) => {
    setIsDrawing(true);
    handleSquareClick(id);
  };

  const handleMouseEnter = (id) => {
    if (isDrawing) {
      handleSquareClick(id);
    }
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
  };

  return (
    <div style={{ position: 'relative', padding: '1rem' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem' }}>
        Expanded Game View
      </h1>
      <div
        style={{
          display: 'grid',
          width: 'fit-content',
          outline: '1px solid #9CA3AF',
          gridTemplateColumns: `repeat(${cols}, 1fr)`,
          gridTemplateRows: `repeat(${rows}, 1fr)`,
          gridGap: '1px',
        }}
      >
        {[...Array(totalSquares)].map((_, index) => (
          <div
            key={index}
            onMouseDown={() => handleMouseDown(index)}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseUp={handleMouseUp}
            style={{
              width: '1rem',
              height: '1rem',
              cursor: 'pointer',
              backgroundColor: selectedSquares[index] || 'white',
              transition: 'background-color 0.15s',
            }}
          />
        ))}
      </div>
      
      <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
        {/* Botones de selección de color */}
        <button onClick={() => setSelectedColor('blue')} style={{ padding: '0.5rem 1rem', backgroundColor: 'blue', color: 'white' }}>Blue</button>
        <button onClick={() => setSelectedColor('red')} style={{ padding: '0.5rem 1rem', backgroundColor: 'red', color: 'white' }}>Red</button>
        <button onClick={() => setSelectedColor('green')} style={{ padding: '0.5rem 1rem', backgroundColor: 'green', color: 'white' }}>Green</button>
      </div>

      {/* Contenedor para posicionar el botón */}
      <div style={{ position: 'absolute', bottom: '1rem', right: '1rem' }}>
        <RetroButton onClick={() => console.log('Start Game clicked!')}>
          Start Game
        </RetroButton>
      </div>
      
      <RetroAudioButton />
    </div>
  );
};

export default Game;
