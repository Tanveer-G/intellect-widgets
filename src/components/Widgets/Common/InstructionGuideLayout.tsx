import { ReactNode } from "react";
import styles from './styles/InstructionGuide.module.css';


interface Props {
    heading: string;
    children: ReactNode;
  }
  
  const InstructionGuideLayout: React.FC<Props> = ({ heading, children }) => {
  return (
    <section 
    aria-labelledby="funnel-instructions-heading"
    className={styles.container}
    tabIndex={-1} // Allow programmatic focus
  >
    <h2 
      aria-level={2}
      className={styles.heading}
      id="funnel-instructions-heading"
    >
      {heading}
    </h2>
    {children }
  </section>
  )
}

export default InstructionGuideLayout;
