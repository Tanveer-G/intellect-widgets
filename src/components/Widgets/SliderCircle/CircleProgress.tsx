import React, {
  useState,
  useEffect,
  useMemo,
  useCallback
} from 'react';
import styles from './styles/CircleProgress.module.css';
import useDebounce from '../../../hooks/useDebounce';
import { clampValue } from '../../../utils/circleUtils';

export interface CircleProgressProps {
  /** current value */
  value: number;
  /** called with clamped number after debounce */
  onChange: (value: number) => void;
  /** inclusive minimum (default 0) */
  min?: number;
  /** inclusive maximum (default 10) */
  max?: number;
  /** circle diameter in px (default 200) */
  size?: number;
}

export const CircleProgress: React.FC<CircleProgressProps> = React.memo(({
  value,
  onChange,
  min = 0,
  max = 10,
  size = 200,
}) => {
  // Local string state so user can clear field
  const [text, setText] = useState<number | "">(value ?? 0);
  // Debounce text → notify parent
  const debouncedText = useDebounce(text, 300);

  // When external `value` changes, sync text
  useEffect(() => { 
    setText(value);
  }, [value]);

  useEffect(() => {
    if(debouncedText === "") return;
    
    const num = Number(debouncedText);
    if (!isNaN(num)) {
      const clamped = clampValue(num, min, max);
      if (clamped !== value) onChange(clamped);
    }

  }, [debouncedText, onChange])
  
  const handleInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = Number(e.target.value);
      // Check if val is a valid number
      if (e.target.value !== "" && !isNaN(val)) {
        setText(val);
      } else {
        setText("");
      }
    },
    []
  );
  

  // Arc math
  const strokeWidth = 8;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const fraction = (value - min) / (max - min);

  const dashOffset = useMemo(
    () => circumference * (1 - fraction),
    [circumference, fraction]
  );

  return (
    <div
      className={styles.container}
      style={{ width: size, height: size }}
    >
      <svg
        className={styles.svg}
        width={size}
        height={size}
        role="progress"
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={value}
      >
        <circle
          className={styles.bgCircle}
          cx={size / 2}
          cy={size / 2}
          r={radius}
        />
        <circle
          className={styles.progressCircle}
          cx={size / 2} // Center X: horizontally center the circle in the SVG viewbox
          cy={size / 2} // Center Y: vertically center the circle in the SVG viewbox
          r={radius} // Radius of the circle, adjusted to account for stroke width
          strokeDasharray={circumference} // Full length of the circle's stroke (used for calculating visible progress)
          strokeDashoffset={dashOffset} // Hides part of the stroke to indicate unfilled progress (larger offset = less progress)        
        />
      </svg>

      <input
        type="number"
        inputMode="tel"
        className={styles.inputField}
        aria-label="Progress value"
        value={text}
        onChange={handleInput}
        min={min}
        max={max}
        step="1" 
      />
    </div>
  );
});

export default CircleProgress;
