import { LEVELS } from '../constants/funnelScale';


export const getLevelFromEvent = (event: MouseEvent): number | null => {
  const bar = (event.target as HTMLElement).closest('[data-level]'); // nearest  ancestor element (or the element itself)  that has the data-level attribute.
  if (!bar) return null;
  const level = Number(bar.getAttribute('data-level'));
  return level >= 1 && level <= LEVELS ? level : null;
};


export const getNextLevel = (
  key: string,
  currentLevel: number,
  totalLevels: number
): number => {
  if (key === 'ArrowUp') return Math.min(totalLevels, currentLevel + 1);
  if (key === 'ArrowDown') return Math.max(1, currentLevel - 1);
  if (/^[1-9]$/.test(key)) {
    const num = Number(key);
    return num >= 1 && num <= totalLevels ? num : currentLevel;
  }
  return currentLevel;
};