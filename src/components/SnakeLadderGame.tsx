import React, { useState, useEffect } from 'react';
import GameBoard from './GameBoard';
import GameControls from './GameControls';
import PlayerStats from './PlayerStats';
import GameMessage from './GameMessage';
import { Player, GameState, MessageType } from '../types/game';
import { checkForSnakeOrLadder, isWinningPosition } from '../utils/gameLogic';

const SnakeLadderGame: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>('waiting');
  const [currentPlayer, setCurrentPlayer] = useState<number>(0);
  const [diceValue, setDiceValue] = useState<number>(0);
  const [isRolling, setIsRolling] = useState<boolean>(false);
  const [message, setMessage] = useState<{ text: string; type: MessageType }>({ text: '', type: 'info' });
  const [players, setPlayers] = useState<Player[]>([
    { id: 1, name: 'Player 1', position: 0, color: '#FF6B6B' },
    { id: 2, name: 'Player 2', position: 0, color: '#4ECDC4' }
  ]);

  const showMessage = (text: string, type: MessageType, duration: number = 3000) => {
    setMessage({ text, type });
    setTimeout(() => setMessage({ text: '', type: 'info' }), duration);
  };

  const rollDice = () => {
    if (gameState !== 'playing' || isRolling) return;

    setIsRolling(true);
    setDiceValue(0);

    // Animate dice rolling
    const rollAnimation = setInterval(() => {
      setDiceValue(Math.floor(Math.random() * 6) + 1);
    }, 100);

    setTimeout(() => {
      clearInterval(rollAnimation);
      const finalValue = Math.floor(Math.random() * 6) + 1;
      setDiceValue(finalValue);
      setIsRolling(false);
      movePlayer(finalValue);
    }, 1000);
  };

  const movePlayer = (steps: number) => {
    const player = players[currentPlayer];
    let newPosition = player.position + steps;

    // Check if move is valid (not exceeding 100)
    if (newPosition > 100) {
      showMessage(`${player.name} needs exactly ${100 - player.position} to win!`, 'warning');
      nextTurn();
      return;
    }

    // Update player position
    setPlayers(prev => prev.map(p => 
      p.id === player.id ? { ...p, position: newPosition } : p
    ));

    // Check for win condition
    if (isWinningPosition(newPosition)) {
      setGameState('finished');
      showMessage(`🎉 ${player.name} wins the game! 🎉`, 'success', 5000);
      return;
    }

    // Check for snakes and ladders after a delay to show movement
    setTimeout(() => {
      const snakeOrLadder = checkForSnakeOrLadder(newPosition);
      if (snakeOrLadder) {
        if (snakeOrLadder.type === 'snake') {
          showMessage('🐍 Oops! Bitten by a snake - LOOSER! 🐍', 'danger', 2000);
          setPlayers(prev => prev.map(p => 
            p.id === player.id ? { ...p, position: snakeOrLadder.end } : p
          ));
        } else {
          showMessage('🪜 Climbing up the ladder - HURRY! 🪜', 'success', 2000);
          setPlayers(prev => prev.map(p => 
            p.id === player.id ? { ...p, position: snakeOrLadder.end } : p
          ));
        }
      }
      
      setTimeout(() => {
        nextTurn();
      }, 1500);
    }, 1000);
  };

  const nextTurn = () => {
    setCurrentPlayer(prev => (prev + 1) % players.length);
  };

  const startGame = () => {
    setGameState('playing');
    setCurrentPlayer(0);
    setDiceValue(0);
    setPlayers(prev => prev.map(p => ({ ...p, position: 0 })));
    showMessage('Game started! Roll the dice to begin!', 'info');
  };

  const resetGame = () => {
    setGameState('waiting');
    setCurrentPlayer(0);
    setDiceValue(0);
    setPlayers(prev => prev.map(p => ({ ...p, position: 0 })));
    setMessage({ text: '', type: 'info' });
  };

  return (
    <div className="min-h-screen p-4 flex flex-col items-center justify-center">
      <div className="max-w-6xl w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-white mb-2 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
            🐍 Snake & Ladder 🪜
          </h1>
          <p className="text-xl text-gray-300">Classic board game with a modern twist</p>
        </div>

        {/* Game Message */}
        <GameMessage message={message} />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Player Stats */}
          <div className="lg:col-span-1">
            <PlayerStats 
              players={players} 
              currentPlayer={currentPlayer} 
              gameState={gameState}
            />
          </div>

          {/* Game Board */}
          <div className="lg:col-span-2">
            <GameBoard players={players} />
          </div>

          {/* Game Controls */}
          <div className="lg:col-span-1">
            <GameControls
              gameState={gameState}
              diceValue={diceValue}
              isRolling={isRolling}
              currentPlayer={players[currentPlayer]}
              onRollDice={rollDice}
              onStartGame={startGame}
              onResetGame={resetGame}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SnakeLadderGame;