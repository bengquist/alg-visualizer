import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import useInterval from "./common/useInterval";
import Graph from "./Graph/Graph";
import { shuffle } from "./helpers";
import OptionsBar from "./Options/OptionsBar";
import useBubbleSort from "./Options/useBubbleSort";

function App() {
  const barRefs = useRef<HTMLDivElement[]>([]);
  const [isSorting, setIsSorting] = useState(false);
  const [barCount, setBarCount] = useState(10);
  const [sortSpeed, setSortSpeed] = useState(1000);
  const [bars, setBars] = useState(
    shuffle(Array.from({ length: barCount }, (_, index) => ++index))
  );
  const { nextSwap, reset } = useBubbleSort(
    barRefs.current,
    sortSpeed,
    barCount,
    () => setIsSorting(false)
  );

  useInterval(() => isSorting && nextSwap(), sortSpeed);

  useEffect(() => {
    const shuffledBars = shuffle(
      Array.from({ length: barCount }, (_, index) => ++index)
    );
    setBars(shuffledBars);
  }, [barCount]);

  const onResetHandler = () => {
    barRefs.current.forEach((barRef) => (barRef.style.background = "#47c539"));
    const newArr = shuffle(Array.from(bars));
    setBars(newArr);
    reset();
  };

  const onCountHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setBarCount(Number(e.target.value) * 10);
  };

  const onSpeedHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setSortSpeed(1000 / Number(e.target.value));
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="w-screen max-w-2xl">
        <Graph ref={barRefs} bars={bars} />
        <OptionsBar
          isSorting={isSorting}
          onPlay={() => setIsSorting(!isSorting)}
          onCount={onCountHandler}
          onSpeed={onSpeedHandler}
          onReset={onResetHandler}
        />
      </div>
    </div>
  );
}

export default App;
