import React from 'react';
import { Player } from '../types/game';
import { snakesAndLadders } from '../utils/gameLogic';

interface GameBoardProps {
  players: Player[];
}

const GameBoard: React.FC<GameBoardProps> = ({ players }) => {
  const renderCell = (number: number) => {
    const playersOnCell = players.filter(p => p.position === number);
    const snakeOrLadder = snakesAndLadders.find(sl => sl.start === number);
    
    return (
      <div
        key={number}
        className={`
          relative aspect-square border border-gray-300 flex items-center justify-center text-sm font-semibold
          ${number % 2 === 0 ? 'bg-amber-50' : 'bg-white'}
          ${snakeOrLadder?.type === 'snake' ? 'bg-red-100 border-red-300' : ''}
          ${snakeOrLadder?.type === 'ladder' ? 'bg-green-100 border-green-300' : ''}
          transition-all duration-300 hover:scale-105
        `}
      >
        {/* Cell number */}
        <span className="absolute top-1 left-1 text-xs text-gray-600">{number}</span>
        
        {/* Snake or Ladder indicator */}
        {snakeOrLadder && (
          <div className="absolute inset-0 flex items-center justify-center">
            {snakeOrLadder.type === 'snake' ? (
              <span className="text-2xl">🐍</span>
            ) : (
              <span className="text-2xl">🪜</span>
            )}
          </div>
        )}
        
        {/* Players on this cell */}
        {playersOnCell.length > 0 && (
          <div className="absolute bottom-1 right-1 flex gap-1">
            {playersOnCell.map(player => (
              <div
                key={player.id}
                className="w-4 h-4 rounded-full border-2 border-white shadow-lg animate-bounce"
                style={{ backgroundColor: player.color }}
                title={player.name}
              />
            ))}
          </div>
        )}
      </div>
    );
  };

  const createBoard = () => {
    const board = [];
    for (let row = 9; row >= 0; row--) {
      const cells = [];
      for (let col = 0; col < 10; col++) {
        const number = row % 2 === 1 
          ? row * 10 + col + 1 
          : row * 10 + (10 - col);
        
        if (number <= 100) {
          cells.push(renderCell(number));
        }
      }
      board.push(
        <div key={row} className="grid grid-cols-10 gap-1">
          {cells}
        </div>
      );
    }
    return board;
  };

  return (
    <div className="bg-white rounded-2xl shadow-2xl p-6 border-4 border-yellow-400">
      <div className="space-y-1">
        {createBoard()}
      </div>
      
      {/* Legend */}
      <div className="mt-4 flex justify-center gap-6 text-sm">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🐍</span>
          <span className="text-gray-600">Snake (Down)</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-2xl">🪜</span>
          <span className="text-gray-600">Ladder (Up)</span>
        </div>
      </div>
    </div>
  );
};

export default GameBoard;