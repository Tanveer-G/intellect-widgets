import FunnelScale from "./FunnelScale";
import InstructionGuide from "./InstructionGuide";
import styles from './styles/FunnelScaleWidget.module.css';
import InstructionGuideLayout from "../Common/InstructionGuideLayout";


export default function FunnelScaleWidget() {
  return (
    <section className={styles.container}>
      <FunnelScale />
      <InstructionGuideLayout heading="Funnel Controls">
       <InstructionGuide />
      </InstructionGuideLayout>
    </section>
  )
}
