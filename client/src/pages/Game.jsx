import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RetroAudioButton from '../components/RetroAudioButton';
import RetroButton from '../components/RetroButton';
import buttonStyles from '../components/Button.module.css';

const Game = () => {
  const [colors, setColors] = useState([]);
  const [currentColor, setCurrentColor] = useState(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [clickPosition, setClickPosition] = useState({ x: 0, y: 0 });
  const [selectedCell, setSelectedCell] = useState(null);
  
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
        const colorArray = Object.values(response.data).map(code => `#${code}`);
        setColors(colorArray);
        setCurrentColor(colorArray[0]);
      } catch (error) {
        console.error('Error fetching colors:', error);
      }
    };

    fetchColors();
  }, []);

  const getColorFromNumber = (number) => {
    if (colors.length === 0) return '#ffffff';
    return colors[number] || '';
  };

  const handleCellClick = (event, rowIndex, colIndex) => {
    // Store click position for color picker menu
    setClickPosition({
      x: event.clientX,
      y: event.clientY
    });
    setSelectedCell({ rowIndex, colIndex });
    setShowColorPicker(true);
  };

  const handleColorSelect = (colorIndex) => {
    if (selectedCell) {
      const newMatrix = [...matrix];
      newMatrix[selectedCell.rowIndex][selectedCell.colIndex] = colorIndex;
      setMatrix(newMatrix);
    }
    setShowColorPicker(false);
    setSelectedCell(null);
  };

  const ColorPickerMenu = () => (
    <div
      style={{
        position: 'fixed',
        left: clickPosition.x,
        top: clickPosition.y,
        backgroundColor: 'white',
        border: '1px solid #ccc',
        borderRadius: '4px',
        padding: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
        zIndex: 1000,
        display: 'grid',
        gridTemplateColumns: 'repeat(5, 1fr)',
        gap: '4px'
      }}
    >
      {colors.map((color, index) => (
        <div
          key={index}
          onClick={() => handleColorSelect(index)}
          style={{
            width: '20px',
            height: '20px',
            backgroundColor: color,
            cursor: 'pointer',
            border: '1px solid #ccc'
          }}
        />
      ))}
    </div>
  );

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
                onClick={(e) => handleCellClick(e, rowIndex, colIndex)}
              />
            ))
          )}
        </div>
      </div>

      {showColorPicker && <ColorPickerMenu />}

      <div style={{ marginTop: '1rem', fontSize: '0.9rem' }}>
        <p>Click on cells to select a new color.</p>
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