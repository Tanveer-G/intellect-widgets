import { CircleProgress } from "./CircleProgress";
import { RangeSlider } from "./RangeSlider";
import { useCallback, useState } from "react";
import styles from './styles/SliderCircle.module.css';
import InstructionGuide from "./InstructionGuide";
import InstructionGuideLayout from "../Common/InstructionGuideLayout";


export default function SliderCircle() {
  const [value, setValue] = useState<number>(0);

  const handleChange = useCallback((val: number) => setValue(val), []);

  return (
    <div className={styles.container}>
        <CircleProgress value={value} onChange={handleChange} />
        <RangeSlider value={value} onChange={handleChange} />
        
        <InstructionGuideLayout heading="Slider Circle Controls">
       <InstructionGuide />
      </InstructionGuideLayout>
    </div>
  );
}
