import { SnakeOrLadder } from '../types/game';

export const snakesAndLadders: SnakeOrLadder[] = [
  // Ladders (going up)
  { start: 4, end: 14, type: 'ladder' },
  { start: 9, end: 31, type: 'ladder' },
  { start: 20, end: 38, type: 'ladder' },
  { start: 28, end: 84, type: 'ladder' },
  { start: 40, end: 59, type: 'ladder' },
  { start: 51, end: 67, type: 'ladder' },
  { start: 63, end: 81, type: 'ladder' },
  { start: 71, end: 91, type: 'ladder' },
  
  // Snakes (going down)
  { start: 17, end: 7, type: 'snake' },
  { start: 54, end: 34, type: 'snake' },
  { start: 62, end: 19, type: 'snake' },
  { start: 64, end: 60, type: 'snake' },
  { start: 87, end: 24, type: 'snake' },
  { start: 93, end: 73, type: 'snake' },
  { start: 95, end: 75, type: 'snake' },
  { start: 99, end: 78, type: 'snake' }
];

export const checkForSnakeOrLadder = (position: number): SnakeOrLadder | null => {
  return snakesAndLadders.find(item => item.start === position) || null;
};

export const isWinningPosition = (position: number): boolean => {
  return position === 100;
};