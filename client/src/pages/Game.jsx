import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RetroAudioButton from '../components/RetroAudioButton';
import RetroButton from '../components/RetroButton';
import buttonStyles from '../components/Button.module.css';

const Game = () => {
   const rows = 30;
   const cols = 40;
   const totalSquares = rows * cols;

   const [colors, setColors] = useState([]);
   const [selectedSquares, setSelectedSquares] = useState({});
   const [isDrawing, setIsDrawing] = useState(false);

   // Fetch colors from backend on component mount
   useEffect(() => {
     const fetchColors = async () => {
       try {
         console.log('Intentando traer colores');
         const response = await axios.get('http://localhost:8080/color');
         console.log('Respuesta del backend:', response.data);
         
         // Convierte los códigos de color a valores de color con #
         const colorValues = Object.entries(response.data).map(([key, colorCode]) => `#${colorCode}`);
         console.log('Colores convertidos:', colorValues);
         
         setColors(colorValues);
       } catch (error) {
         console.error('Error fetching colors:', error);
         // Fallback to default colors if fetch fails
         setColors(['#E34234', '#26619C', '#50C878', '#800080', '#FFD700']);
       }
     };

     fetchColors();
   }, []);

   const handleSquareClick = (id, event) => {
     setSelectedSquares((prev) => {
       const currentColor = prev[id];
       let newColor;
       
       if (event.ctrlKey) {
         // Cycle through colors if Ctrl is pressed
         const currentIndex = colors.indexOf(currentColor);
         newColor = colors[(currentIndex + 1) % colors.length];
       } else {
         // Toggle color on normal click
         newColor = currentColor ? null : colors[0];
       }
       
       return {
         ...prev,
         [id]: newColor,
       };
     });
   };

   const handleMouseDown = (id, event) => {
     setIsDrawing(true);
     handleSquareClick(id, event);
   };

   const handleMouseEnter = (id, event) => {
     if (isDrawing) {
       handleSquareClick(id, event);
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
       
       <div
         style={{
           display: 'flex',
           justifyContent: 'center',
           alignItems: 'center',
           height: '80vh',
         }}
       >
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
               onMouseDown={(event) => handleMouseDown(index, event)}
               onMouseEnter={(event) => handleMouseEnter(index, event)}
               onMouseUp={handleMouseUp}
               style={{
                 width: '1rem',
                 height: '1rem',
                 backgroundColor: selectedSquares[index] || 'white',
                 transition: 'background-color 0.15s',
               }}
             />
           ))}
         </div>
       </div>

       <div style={{ marginTop: '1rem', fontSize: '0.9rem' }}>
         <p>Tip: Hold Ctrl and click on a square to cycle through colors.</p>
       </div>

       <div style={{ position: 'center', bottom: '1rem', right: '1rem' }}>
         <RetroButton onClick={() => console.log('Start Game clicked!')}>
           Start Game
         </RetroButton>
       </div>

       <RetroAudioButton />
     </div>
   );
};

export default Game;