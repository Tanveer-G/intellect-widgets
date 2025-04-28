  // Utility function to clamp value between min and max
  export const clampValue = (value: number, min: number, max: number): number => {
    return Math.min(Math.max(value, min), max);
  };
  

  // Calculate progress percentage
  export const calculateProgress = (value: number, min: number, max: number): number => {
    const rawProgress = ((value - min) / (max - min)) * 100;
    return clampValue(rawProgress, 0, 100);
  };


  // * unused code

  export const validateRange = (min: number, max: number): boolean => {
    if (min >= max) {
      console.error('RangeSlider: min must be less than max');
      return false;
    }
    return true;
  };

  
  export const validateValue = (value: number, min: number, max: number): boolean => {
    if (value < min || value > max) {
      console.error(`RangeSlider: value (${value}) must be between ${min} and ${max}`);
      return false;
    }
    return true;
  };
  

  // Generate unique ID for accessibility
  export const generateUniqueId = (prefix: string): string => {
    return `${prefix}-${Math.random().toString(36).substring(2, 10)}`;
  };