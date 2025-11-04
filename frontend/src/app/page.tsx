"use client";

import { useState, useEffect } from "react";

export default function Home() {
  const [gameStarted, setGameStarted] = useState(false);
  const [scaleFactor, setScaleFactor] = useState(1);
  const [gameState, setGameState] = useState({
    score: {
      machine: 0,
      human: 0
    },
    // Add other game state properties as needed
    ball: { x: 0, y: 0 },
    paddles: { machine: 0, human: 0 }
  });

  const gameWidth = 60;
  const gameHeight = 45;

  const startGame = () => {
    setGameStarted(true);
    //Call the backend API to get start position of the ball and paddles 
    //Let's simulate this for now 
    const setGameStateWithStartPosition = () => {
      setGameState({
        ...gameState,
        ball: {
          x: 33,
          y: 25,
        },
        machinePaddle: {
          y: 19,
        },
        humanPaddle: {
          y: 19,
        },
        score: {
          machine: 0,
          human: 0,
        },
      });
    };
    setGameStateWithStartPosition();
  };
  

  useEffect(() => {
    const calculateScale = () => {
      const availableWidth = window.innerWidth-40; // Account for padding
      const availableHeight = window.innerHeight -200; // Account for UI elements

      const widthScale = Math.floor(availableWidth / gameWidth);
      const heightScale = Math.floor(availableHeight / gameHeight);
      
      // Use the smaller scale, but ensure at least 1x
      setScaleFactor(Math.max(Math.min(widthScale, heightScale), 1));
      
       };

    calculateScale();
    window.addEventListener('resize', calculateScale);
    
    return () => window.removeEventListener('resize', calculateScale);
  }, [gameWidth, gameHeight]);

  // Calculate actual pixel dimensions
  const displayWidth = gameWidth * scaleFactor;
  const displayHeight = gameHeight * scaleFactor;

   return (
    <div className={`flex min-h-screen bg-black ${!gameStarted ? 'items-center justify-center' : ''}`}>
      <main className={`flex min-h-screen w-full flex-col items-center px-16 bg-black ${!gameStarted ? 'justify-center' : 'justify-start pt-8'}`}> 
        {!gameStarted ? (
          // Welcome Screen (disappears when button is clicked)
          <div className="flex flex-col items-center gap-8 text-center">
            <h1 className="text-6xl font-bold tracking-wider text-[#149414] font-mono drop-shadow-[0_0_8px_rgba(45,200,30,0.6)]">
              Welcome to the pong game
            </h1>
            <button 
              onClick={startGame}
              className="px-12 py-4 bg-[#149414] text-black font-bold text-2xl rounded-lg mt-8 shadow-[0_0_12px_rgba(14,107,14,0.7)] hover:bg-[#1db31d] hover:shadow-[0_0_16px_rgba(45,200,30,0.8)] transition-all duration-200 font-mono"
            >
              PLAY
            </button>
          </div>
        ) : (
         // Game Screen
          <div className="flex flex-col items-center justify-center w-full">
            {/* Score at the top */}
            <div className="py-4 text-center w-full">
              <h2 className="text-6xl font-bold text-[#149414] font-mono drop-shadow-[0_0_8px_rgba(45,200,30,0.6)]">
                {gameState.score.machine} : {gameState.score.human}
              </h2>
            </div>
            
           {/* Game view using gameWidth and gameHeight */}
<div 
  className="bg-gray-900 relative" 
  style={{ 
    width: `${displayWidth}px`, 
    height: `${displayHeight}px`, 
    imageRendering: 'pixelated',
  }}
>

{/* Center line - dashed */}
  {Array.from({ length: gameHeight}).map((_, i) => (
    i % 2 === 0 && (
      <div
        key={i}
        className="absolute bg-[#149414]"
        style={{
          left: `${(gameWidth / 2) * scaleFactor - scaleFactor/2}px`,
          top: `${i * scaleFactor}px`,
          width: `${scaleFactor}px`,
          height: `${scaleFactor}px`,
        }}
      />
    )
  ))}

   {/* Left paddle */}
  <div
    className="absolute bg-[#149414]"
    style={{
      left: `${2 * scaleFactor}px`,
      top: `${gameState.machinePaddle.y * scaleFactor}px`,
      width: `${1 * scaleFactor}px`,
      height: `${8 * scaleFactor}px`,
    }}
  />
  
  {/* Right paddle */}
  <div
    className="absolute bg-[#149414]"
    style={{
      right: `${2 * scaleFactor}px`,
      top: `${gameState.humanPaddle.y * scaleFactor}px`,
      width: `${1 * scaleFactor}px`,
      height: `${8 * scaleFactor}px`,
    }}
  />
  
  {/* Ball */}
  <div
    className="absolute bg-[#149414]"
    style={{
      left: `${gameState.ball.x * scaleFactor - scaleFactor/2}px`,
      top: `${gameState.ball.y * scaleFactor}px`,
      width: `${1 * scaleFactor}px`,
      height: `${1 * scaleFactor}px`,
    }}
  />
</div>          </div>
        )}
      </main>
    </div>
  );
} 
