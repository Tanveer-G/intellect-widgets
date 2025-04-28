  export const clampValue = (value: number, min: number, max: number): number => {
    return Math.min(Math.max(value, min), max);
  };

  
  export const validateRange = (min: number, max: number): void => {
    if (min >= max) {
      throw new Error(`Invalid range: min (${min}) must be less than max (${max})`);
    }
  };
  
  
  export const generateUniqueId = (prefix: string): string => {
    return `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
  };