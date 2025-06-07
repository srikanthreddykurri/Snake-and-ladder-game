import React from 'react';
import { Trophy, Target } from 'lucide-react';
import { Player, GameState } from '../types/game';

interface PlayerStatsProps {
  players: Player[];
  currentPlayer: number;
  gameState: GameState;
}

const PlayerStats: React.FC<PlayerStatsProps> = ({ players, currentPlayer, gameState }) => {
  return (
    <div className="bg-white rounded-2xl shadow-2xl p-6 space-y-4">
      <h2 className="text-2xl font-bold text-center text-gray-800 flex items-center justify-center gap-2">
        <Trophy className="text-yellow-500\" size={24} />
        Players
      </h2>
      
      <div className="space-y-4">
        {players.map((player, index) => (
          <div
            key={player.id}
            className={`
              p-4 rounded-xl border-2 transition-all duration-300
              ${index === currentPlayer && gameState === 'playing' 
                ? 'border-blue-400 bg-blue-50 shadow-lg scale-105' 
                : 'border-gray-200 bg-gray-50'
              }
            `}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div
                  className="w-8 h-8 rounded-full border-2 border-white shadow-lg"
                  style={{ backgroundColor: player.color }}
                />
                <span className="font-semibold text-lg">{player.name}</span>
              </div>
              {index === currentPlayer && gameState === 'playing' && (
                <div className="bg-blue-500 text-white px-2 py-1 rounded-full text-xs font-medium animate-pulse">
                  Your Turn
                </div>
              )}
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Position:</span>
                <span className="font-bold text-lg">{player.position}/100</span>
              </div>
              
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="h-3 rounded-full transition-all duration-500 bg-gradient-to-r from-green-400 to-blue-500"
                  style={{ width: `${player.position}%` }}
                />
              </div>
              
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>Progress</span>
                <span>{player.position}%</span>
              </div>
            </div>
            
            {player.position === 100 && (
              <div className="mt-3 flex items-center justify-center gap-2 text-green-600 font-bold">
                <Trophy size={16} />
                Winner!
              </div>
            )}
          </div>
        ))}
      </div>
      
      <div className="mt-6 p-4 bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl">
        <div className="flex items-center gap-2 mb-2">
          <Target className="text-purple-600" size={20} />
          <span className="font-semibold text-purple-800">Goal</span>
        </div>
        <p className="text-sm text-purple-700">
          First player to reach position 100 wins the game!
        </p>
      </div>
    </div>
  );
};

export default PlayerStats;