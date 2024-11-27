import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RetroAudioButton from '../components/RetroAudioButton';
import RetroButton from '../components/RetroButton';
import buttonStyles from '../components/Button.module.css';

const Game = () => {
  const [colors, setColors] = useState([]);
  const [currentColor, setCurrentColor] = useState(null);
  const [isDrawing, setIsDrawing] = useState(false);
  
  // Matriz inicial con el patrón de números
  const initialMatrix = [
    [3, 1, 2, 3, 4, 5, 6, 7, 8, 0],
    [1, 2, 3, 4, 5, 6, 7, 8, 0, 1],
    [2, 3, 4, 5, 6, 7, 8, 0, 1, 2],
    [3, 4, 5, 6, 7, 8, 0, 1, 2, 3],
    [4, 5, 6, 7, 8, 0, 1, 2, 3, 4],
    [5, 6, 7, 8, 0, 1, 2, 3, 4, 5],
    [6, 7, 8, 0, 1, 2, 3, 4, 5, 6],
    [7, 8, 0, 1, 2, 3, 4, 5, 6, 7],
    [8, 0, 1, 2, 3, 4, 5, 6, 7, 8],
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 0]
  ];

  const [matrix, setMatrix] = useState(initialMatrix);

  useEffect(() => {
    const fetchColors = async () => {
      try {
        const response = await axios.get('http://localhost:8080/color');
        // Ahora guardamos el objeto completo con los códigos de color
        const colorArray = Object.values(response.data).map(code => `#${code}`);
        setColors(colorArray);
        setCurrentColor(colorArray[0]);
      } catch (error) {
        console.error('Error fetching colors:', error);
        // Ya no necesitamos colores por defecto ya que siempre usaremos los del backend
      }
    };

    fetchColors();
  }, []);

  const getColorFromNumber = (number) => {
    // Si aún no tenemos colores del backend, retornamos un color neutral
    if (colors.length === 0) return '#ffffff';
    return colors[number] || '';
  };

  const handleClick = (rowIndex, colIndex) => {
    const newMatrix = [...matrix];
    const currentValue = matrix[rowIndex][colIndex];
    // Asegurémonos de que el número no exceda la cantidad de colores disponibles
    newMatrix[rowIndex][colIndex] = (currentValue + 1) % colors.length;
    setMatrix(newMatrix);
  };

  const handleMouseDown = (rowIndex, colIndex) => {
    setIsDrawing(true);
    handleClick(rowIndex, colIndex);
  };

  const handleMouseMove = (rowIndex, colIndex) => {
    if (isDrawing) {
      handleClick(rowIndex, colIndex);
    }
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
  };

  return (
    <div className={buttonStyles["custom-cursor"]} style={{ position: 'relative', padding: '1rem' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem' }}>
        Expanded Game View
      </h1>
      
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${matrix[0].length}, 1fr)`,
            gridTemplateRows: `repeat(${matrix.length}, 1fr)`,
            gap: '1px',
            height: '500px',
            width: '600px',
            backgroundColor: '#9CA3AF',
            padding: '1px'
          }}
        >
          {matrix.map((row, rowIndex) => 
            row.map((cell, colIndex) => (
              <div
                key={`${rowIndex}-${colIndex}`}
                style={{
                  backgroundColor: getColorFromNumber(cell),
                  width: '100%',
                  height: '100%',
                  cursor: 'pointer'
                }}
                onMouseDown={() => handleMouseDown(rowIndex, colIndex)}
                onMouseMove={() => handleMouseMove(rowIndex, colIndex)}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
              />
            ))
          )}
        </div>
      </div>

      <div style={{ marginTop: '1rem', fontSize: '0.9rem' }}>
        <p>Click on cells to change their colors in sequence.</p>
      </div>

      <div style={{ position: 'center', bottom: '1rem', right: '1rem' }}>
        <RetroButton onClick={() => setMatrix(initialMatrix)}>
          Reset Grid
        </RetroButton>
      </div>

      <RetroAudioButton />
    </div>
  );
};

export default Game;