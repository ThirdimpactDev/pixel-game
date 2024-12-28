import React, { useState, useEffect } from 'react';
import axios from 'axios';
import websocketService from '../service/websocketService';
import RetroAudioButton from '../components/RetroAudioButton';
import RetroButton from '../components/RetroButton';
import buttonStyles from '../components/Button.module.css';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080'
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('jwt_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

const Game = () => {
  const [grid, setGrid] = useState(Array(10).fill(Array(10).fill(0)));
  const [colors, setColors] = useState([]);
  const [selectedCell, setSelectedCell] = useState(null);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [clickPosition, setClickPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    websocketService.connect()
      .then(() => {
        websocketService.subscribe('/topic/grid', (message) => {
          setGrid(message);
        });
      })
      .catch(console.error);

    const fetchColors = async () => {
      try {
        const response = await axiosInstance.get('/colors');
        const colorArray = Object.values(response.data).map(code => `#${code}`);
        setColors(colorArray);
      } catch (error) {
        console.error('Error fetching colors:', error);
        if (error.response?.status === 401) {
          window.location.href = '/login';
        }
      }
    };

    fetchColors();
    return () => websocketService.disconnect();
  }, []);

  const handleColorSelect = (colorIndex) => {
    if (selectedCell) {
      websocketService.send('/app/game.sendPixel', {
        y: selectedCell.col,
        x: selectedCell.row,
        color: colorIndex
      });
    }
    setShowColorPicker(false);
    setSelectedCell(null);
  };

  const getColorFromNumber = (number) => colors[number] || '#fff';

  const handleCellClick = (e, rowIndex, colIndex) => {
    setSelectedCell({ row: rowIndex, col: colIndex });
    setClickPosition({ x: e.clientX, y: e.clientY });
    setShowColorPicker(true);
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
      
      <div style={{ background: 'red', height: '500px', width: '500px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${grid.length}, 1fr)`,
            gridTemplateRows: `repeat(${grid[0]?.length}, 1fr)`,
            width: '100%',
            height: '100%',
          }}
        >
          {grid.map((row, rowIndex) => 
            row.map((cell, colIndex) => (
              <div
                key={`${rowIndex}-${colIndex}`}
                style={{
                  backgroundColor: getColorFromNumber(cell),
                  cursor: 'pointer',
                  width: '100%',
                  height: '100%',
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
        <RetroButton onClick={() => setGrid(Array(10).fill(Array(10).fill(0)))}>
          Reset Grid
        </RetroButton>
      </div>

      <RetroAudioButton />
    </div>
  );
};

export default Game;