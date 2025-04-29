// import { LEVELS } from '../constants/funnelScale';


// export const getLevelFromEvent = (event: MouseEvent): number | null => {
//   const bar = (event.target as HTMLElement).closest('[data-level]'); // nearest  ancestor element (or the element itself)  that has the data-level attribute.
//   if (!bar) return null;
//   const level = Number(bar.getAttribute('data-level'));
//   return level >= 1 && level <= LEVELS ? level : null;
// };


// export const getNextLevel = (
//   key: string,
//   currentLevel: number,
//   totalLevels: number
// ): number => {
//   if (key === 'ArrowUp') return Math.min(totalLevels, currentLevel + 1);
//   if (key === 'ArrowDown') return Math.max(1, currentLevel - 1);
//   if (/^[1-9]$/.test(key)) {
//     const num = Number(key);
//     return num >= 1 && num <= totalLevels ? num : currentLevel;
//   }
//   return currentLevel;
// };

import { LEVELS } from '../constants/funnelScale';

/**
 * Given a native MouseEvent, climbs up to the nearest `[data-level]` ancestor
 * and returns its level (1…LEVELS). If none found or out of range, returns undefined.
 */
export const getLevelFromEvent = (event: MouseEvent): number | undefined => {
  const bar = (event.target as HTMLElement).closest<HTMLElement>('[data-level]');
  if (!bar) return undefined;

  const lvl = Number(bar.getAttribute('data-level'));
  if (Number.isInteger(lvl) && lvl >= 1 && lvl <= LEVELS) {
    return lvl;
  }

  return undefined;
};

/**
 * Given a key and the currentLevel, returns the next level in [1…totalLevels].
 * Supports:
 *  • ArrowUp / ArrowRight → +1
 *  • ArrowDown / ArrowLeft → –1
 *  • Home → 1
 *  • End  → totalLevels
 *  • Digit keys “1”–“9” → that digit (if in range)
 *  • everything else → currentLevel
 */
export const getNextLevel = (
  key: string,
  currentLevel: number,
  totalLevels: number
): number => {
  // increment / decrement
  if (key === 'ArrowUp' || key === 'ArrowRight') {
    return Math.min(totalLevels, currentLevel + 1);
  }
  if (key === 'ArrowDown' || key === 'ArrowLeft') {
    return Math.max(1, currentLevel - 1);
  }

  // home / end
  if (key === 'Home') {
    return 1;
  }
  if (key === 'End') {
    return totalLevels;
  }

  // numeric keys
  if (/^[1-9]$/.test(key)) {
    const n = Number(key);
    if (n >= 1 && n <= totalLevels) {
      return n;
    }
  }

  // otherwise no change
  return currentLevel;
};
