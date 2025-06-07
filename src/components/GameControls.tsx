import React from 'react';
import { Dice1, Dice2, Dice3, Dice4, Dice5, Dice6, Play, RotateCcw } from 'lucide-react';
import { Player, GameState } from '../types/game';

interface GameControlsProps {
  gameState: GameState;
  diceValue: number;
  isRolling: boolean;
  currentPlayer: Player;
  onRollDice: () => void;
  onStartGame: () => void;
  onResetGame: () => void;
}

const GameControls: React.FC<GameControlsProps> = ({
  gameState,
  diceValue,
  isRolling,
  currentPlayer,
  onRollDice,
  onStartGame,
  onResetGame
}) => {
  const getDiceIcon = (value: number) => {
    const iconProps = { size: 48, className: "text-white" };
    switch (value) {
      case 1: return <Dice1 {...iconProps} />;
      case 2: return <Dice2 {...iconProps} />;
      case 3: return <Dice3 {...iconProps} />;
      case 4: return <Dice4 {...iconProps} />;
      case 5: return <Dice5 {...iconProps} />;
      case 6: return <Dice6 {...iconProps} />;
      default: return <Dice1 {...iconProps} />;
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-2xl p-6 space-y-6">
      <h2 className="text-2xl font-bold text-center text-gray-800">Game Controls</h2>
      
      {gameState === 'waiting' && (
        <div className="text-center space-y-4">
          <p className="text-gray-600">Ready to play?</p>
          <button
            onClick={onStartGame}
            className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-green-600 hover:to-green-700 transition-all duration-200 flex items-center justify-center gap-2 shadow-lg"
          >
            <Play size={20} />
            Start Game
          </button>
        </div>
      )}

      {gameState === 'playing' && (
        <div className="space-y-6">
          {/* Current Player */}
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-2">Current Turn</p>
            <div className="flex items-center justify-center gap-3">
              <div
                className="w-6 h-6 rounded-full border-2 border-white shadow-lg"
                style={{ backgroundColor: currentPlayer.color }}
              />
              <span className="font-semibold text-lg">{currentPlayer.name}</span>
            </div>
          </div>

          {/* Dice */}
          <div className="text-center space-y-4">
            <div
              className={`
                inline-flex items-center justify-center w-20 h-20 rounded-2xl shadow-lg
                ${isRolling ? 'animate-spin bg-gradient-to-r from-purple-500 to-pink-500' : 'bg-gradient-to-r from-blue-500 to-purple-600'}
                transition-all duration-300
              `}
            >
              {diceValue > 0 && getDiceIcon(diceValue)}
              {diceValue === 0 && <Dice1 size={48} className="text-white opacity-50" />}
            </div>
            
            {diceValue > 0 && !isRolling && (
              <p className="text-2xl font-bold text-gray-800">You rolled: {diceValue}</p>
            )}
            
            <button
              onClick={onRollDice}
              disabled={isRolling}
              className={`
                w-full py-3 px-6 rounded-xl font-semibold transition-all duration-200 shadow-lg
                ${isRolling 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white'
                }
              `}
            >
              {isRolling ? 'Rolling...' : 'Roll Dice'}
            </button>
          </div>
        </div>
      )}

      {gameState === 'finished' && (
        <div className="text-center space-y-4">
          <p className="text-lg font-semibold text-green-600">Game Finished!</p>
          <button
            onClick={onResetGame}
            className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-blue-600 hover:to-blue-700 transition-all duration-200 flex items-center justify-center gap-2 shadow-lg"
          >
            <RotateCcw size={20} />
            New Game
          </button>
        </div>
      )}

      {gameState !== 'waiting' && (
        <button
          onClick={onResetGame}
          className="w-full bg-gradient-to-r from-gray-500 to-gray-600 text-white py-2 px-4 rounded-lg font-medium hover:from-gray-600 hover:to-gray-700 transition-all duration-200 flex items-center justify-center gap-2"
        >
          <RotateCcw size={16} />
          Reset Game
        </button>
      )}
    </div>
  );
};

export default GameControls;