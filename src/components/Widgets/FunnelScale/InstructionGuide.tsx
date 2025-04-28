import styles from "../Common/styles/InstructionGuide.module.css";
import { LEVELS } from "../../../constants/funnelScale";


export default function InstructionGuide() {
  return (
    <ul className={styles.instructionList}>
      <li className={styles.listItem}>
        <span aria-hidden="true" className={styles.bullet}>
          •
        </span>
        <span>
          Click on bar to select levels{" "}
          <span className={styles.srOnly}>in the funnel scale</span>
        </span>
      </li>
      <li className={styles.listItem}>
        <span aria-hidden="true" className={styles.bullet}>
          •
        </span>
        <span>
          Use arrow keys ( <kbd>↑</kbd> <kbd>↓</kbd> ) or number keys ({" "}
          <kbd>1</kbd> - <kbd>{LEVELS}</kbd> )
        </span>
      </li>
    </ul>
  );
}
