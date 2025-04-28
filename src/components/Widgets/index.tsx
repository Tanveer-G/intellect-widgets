import SliderCircle from "./SliderCircle";
import FunnelScaleWidget from "./FunnelScale";
import styles from './widgets.module.css';


export default function Widgets() {
  return (
    <main className={styles.widgetsContainer}>
      <SliderCircle />
      <FunnelScaleWidget />
    </main>
  );
}
