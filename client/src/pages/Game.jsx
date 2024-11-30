import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RetroAudioButton from '../components/RetroAudioButton';
import RetroButton from '../components/RetroButton';
import buttonStyles from '../components/Button.module.css';
import { Stomp } from "@stomp/stompjs";
import SockJS from "sockjs-client";

const Game = () => {
  const [colors, setColors] = useState([]);
  const [currentColor, setCurrentColor] = useState(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [clickPosition, setClickPosition] = useState({ x: 0, y: 0 });
  const [selectedCell, setSelectedCell] = useState(null);
  const [grid, setGrid] = useState([]);

  
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
    const socket = new SockJS("http://localhost:8080/ws");
    const client = Stomp.over(socket);

    client.connect(
      {},
      () => {
        console.log("Conectando a /topic/grid del backend");

        client.subscribe("/topic/grid", (message) => {
          console.log("Grid recibido:", JSON.parse(message.body));
          setGrid(JSON.parse(message.body));
        });

        client.send("/app/game.subscribeGrid", {}, JSON.stringify({}));
      },
      (error) => {
        console.error("Error en la conexión WebSocket", error);
      }
    );

    // return () => {
    //   client.disconnect(() => {
    //     console.log("Conexión WebSocket desconectada");
    //   });
    // };

    const fetchColors = async () => {
      try {
        const response = await axios.get('http://localhost:8080/colors');
        const colorArray = Object.values(response.data).map(code => `#${code}`);
        setColors(colorArray);
        setCurrentColor(colorArray[0]);
        console.log("################## COLORS #########################")
        console.log(response.data)
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
      
      <div style={{ background: 'red', height: '500px', width: '500px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${grid.length}, 1fr)`,
            gridTemplateRows: `repeat(${grid[0]?.length}, 1fr)`,  // Ensure grid[0] is not undefined
            width: '100%',
            height: '100%',
          }}
        >
          {
            grid.map((row, rowIndex) => 
              row.map((cell, colIndex) => (
                <div
                  key={`${rowIndex}-${colIndex}`}
                  style={{
                    backgroundColor: getColorFromNumber(cell), // Get color based on cell value
                    cursor: 'pointer',
                    width: '100%', // Adjust size as needed
                    height: '100%', // Adjust size as needed
                  }}
                  onClick={(e) => handleCellClick(e, rowIndex, colIndex)} // Handle color selection on click
                />
              ))
            )
          }
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