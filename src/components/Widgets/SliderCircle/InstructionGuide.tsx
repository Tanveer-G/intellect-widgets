import styles from "../Common/styles/InstructionGuide.module.css";

export default function InstructionGuide() {
  return (
    <ul className={styles.instructionList}>
      <li className={styles.listItem}>
        <span aria-hidden="true" className={styles.bullet}>
          •
        </span>
        <span>
          Enter a number between <kbd>0</kbd> and <kbd>10</kbd> in the input box.
        </span>
      </li>

      <li className={styles.listItem}>
        <span aria-hidden="true" className={styles.bullet}>
          •
        </span>
        <span>
          Use the slider or keyboard arrows ( <kbd>↑</kbd> <kbd>↓</kbd> <kbd>←</kbd> <kbd>→</kbd> ).
        </span>
      </li>
    </ul>
  );
}
