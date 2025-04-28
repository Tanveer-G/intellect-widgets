import { useState, useId , KeyboardEvent } from 'react';
import styles from './styles/FunnelScale.module.css';
import { LEVELS, LEVEL_LABELS, FIELDSET_LABEL } from '../../../constants/funnelScale';
import { getLevelFromEvent, getNextLevel } from '../../../utils/funnelScaleUtils';


const WIDTHS = Array.from({ length: LEVELS }, (_, i) => 
  ((LEVELS - i) / LEVELS) * 100
);


export const FunnelScale: React.FC = () => {
  const [selected, setSelected] = useState<number>(1);
  const selectionId = useId();


  const selectionText = LEVEL_LABELS[selected - 1] || '';

  const handleClick = (e: React.MouseEvent<HTMLFieldSetElement>) => {
    const level = getLevelFromEvent(e.nativeEvent);
    if (level) setSelected(level);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLFieldSetElement>) => {
      const next = getNextLevel(e.key, selected, LEVELS);
      if (next !== selected) {
        e.preventDefault(); //stops page scroll with arrows
        setSelected(next);
      }
    };


  return (
    <fieldset
      className={styles.container}
      aria-label={FIELDSET_LABEL}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role="radiogroup"
      tabIndex={0}
    >
      <legend className={styles.srOnly}>{FIELDSET_LABEL}</legend>

      <output 
        id={selectionId}
        className={styles.selectionLabel}
        aria-live="polite"
        htmlFor="funnel-scale"
      >
        {selectionText}
      </output>

      {WIDTHS.map((w, idx) => {
        const level = LEVELS - idx;
        const isSelected = level <= selected;
        const labelText = LEVEL_LABELS[level - 1];

        return (
          <label
            key={level}
            data-level={level}
            className={`${styles.bar} ${isSelected ? styles.selected : ''}`}
            style={{ width: `${w}%` }}
            aria-checked={isSelected}
            aria-label={LEVEL_LABELS[level - 1]}
          >
            <input
              type="radio"
              name="funnel-scale"
              className={styles.srOnly}
              value={level}
              checked={isSelected}
              aria-labelledby={selectionId}
              aria-label={labelText}
              readOnly
            />
          </label>
        );
      })}
    </fieldset>
  );
};

export default FunnelScale;