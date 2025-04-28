import { useState, useCallback, memo, useId } from "react";
import styles from "./styles/RangeSlider.module.css";
import { clampValue, calculateProgress } from "../../../utils/rangeSliderUtils";

export interface RangeSliderProps {
  // label: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
}

export const RangeSlider: React.FC<RangeSliderProps> = ({
  // label="",
  value,
  onChange,
  min = 0,
  max = 10,
  step = 1,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const errorId = useId();
  const tooltipId = useId();

  const progress = calculateProgress(value, min, max);
  const clampedValue = clampValue(value, min, max);

  const showTooltip = isFocused && clampedValue > 0;

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange(Number(e.target.value));
    },
    [onChange]
  );

  return (
    <div className={styles.container}>
      <input
        type="range"
        className={styles.slider}
        min={min}
        max={max}
        step={step}
        value={clampedValue}
        aria-label="Value selector from 0 to 10"
        aria-invalid={clampedValue !== value}
        aria-errormessage={clampedValue !== value ? errorId : undefined}
        aria-valuetext={`${clampedValue} (range ${min}-${max})`}
        aria-describedby={tooltipId}
        onChange={handleChange}
        onMouseEnter={() => setIsFocused(true)}
        onMouseLeave={() => setIsFocused(false)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        style={{ "--progress": `${progress}%` } as React.CSSProperties}
      />

      <output
        id={tooltipId}
        aria-live="polite"
        className={styles.tooltip}
        style={{
          visibility: showTooltip ? "visible" : "hidden",
          left: `${progress}%`,
        }}
      >
        {clampedValue}
      </output>

      {clampedValue !== value && (
        <div id={errorId} role="alert" className={styles.error}>
          Value clamped to allowed range ({min}-{max})
        </div>
      )}
    </div>
  );
};

export default memo(RangeSlider);
