export interface Player {
  id: number;
  name: string;
  position: number;
  color: string;
}

export interface SnakeOrLadder {
  start: number;
  end: number;
  type: 'snake' | 'ladder';
}

export type GameState = 'waiting' | 'playing' | 'finished';

export type MessageType = 'info' | 'success' | 'warning' | 'danger';