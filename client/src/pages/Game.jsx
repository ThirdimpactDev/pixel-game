import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RetroAudioButton from '../components/RetroAudioButton';
import RetroButton from '../components/RetroButton';
import buttonStyles from '../components/Button.module.css';
import { Stomp } from "@stomp/stompjs";
import SockJS from "sockjs-client";

const Game = () => {
  const [colors, setColors] = useState([]);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [clickPosition, setClickPosition] = useState({ x: 0, y: 0 });
  const [selectedCell, setSelectedCell] = useState(null);
  const [grid, setGrid] = useState([]);
  const [stompClient, setStompClient] = useState(null);

  useEffect(() => {
    const socket = new SockJS("http://localhost:8080/ws");
    const client = Stomp.over(socket);

    client.connect(
      {},
      () => {
        setStompClient(client);
        client.subscribe("/topic/grid", (message) => {
          setGrid(JSON.parse(message.body));
        });
        client.send("/app/game.subscribeGrid", {}, JSON.stringify({}));
      }
    );

    const fetchColors = async () => {
      try {
        const response = await axios.get('http://localhost:8080/colors');
        const colorArray = Object.values(response.data).map(code => `#${code}`);
        setColors(colorArray);
        console.log("Colors loaded:", colorArray);
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
    // Obtener la posición del elemento que contiene la cuadrícula
    const gridElement = event.currentTarget.parentElement;
    const gridRect = gridElement.getBoundingClientRect();
    
    // Calcular la posición relativa del clic dentro de la cuadrícula
    const cellWidth = gridRect.width / grid[0].length;
    const cellHeight = gridRect.height / grid.length;
    
    // Calcular la posición exacta del clic
    const x = Math.floor((event.clientX - gridRect.left) / cellWidth);
    const y = Math.floor((event.clientY - gridRect.top) / cellHeight);

    setClickPosition({
      x: event.clientX,
      y: event.clientY
    });
    
    setSelectedCell({
      row: x,
      col: y
    });
    
    setShowColorPicker(true);
  };

  const handleColorSelect = (colorIndex) => {
    if (selectedCell && stompClient) {
      const payload = {
        x: selectedCell.col,
        y: selectedCell.row,
        color: colorIndex
      };
      
      console.log('Sending pixel update:', payload);
      stompClient.send("/app/game.sendPixel", {}, JSON.stringify(payload));
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
      
      <div style={{ background: 'red', height: '500px', width: '500px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${grid.length || 10}, 1fr)`,
            gridTemplateRows: `repeat(${grid[0]?.length || 10}, 1fr)`,
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