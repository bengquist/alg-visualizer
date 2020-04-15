import React, { ChangeEvent, useRef, useState } from "react";
import useInterval from "./common/useInterval";
import Graph from "./Graph/Graph";
import { shuffle } from "./helpers";
import OptionsBar from "./Options/OptionsBar";
import useBubbleSort from "./Options/useBubbleSort";

const barCount = 10;

function App() {
  const barRefs = useRef<HTMLDivElement[]>([]);
  const [finished, setIsFinished] = useState(false);
  const [isSorting, setIsSorting] = useState(false);
  const [sortSpeed, setSortSpeed] = useState(500);
  const [bars, setBars] = useState(
    shuffle(Array.from({ length: barCount }, (_, index) => ++index))
  );
  const { nextSwap, reset } = useBubbleSort(
    barRefs.current,
    sortSpeed,
    barCount,
    () => {
      setIsSorting(false);
      setIsFinished(true);
    }
  );

  useInterval(() => isSorting && nextSwap(), sortSpeed);

  const onResetHandler = () => {
    barRefs.current.forEach(
      (barRef) => barRef && (barRef.style.background = "#47c539")
    );
    const newArr = shuffle(Array.from(bars));
    setBars(newArr);
    reset();
    setIsSorting(false);
    setIsFinished(false);
  };

  const onSpeedHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setSortSpeed(1000 / Number(e.target.value));
  };

  const onPlayHandler = () => {
    if (finished) {
      onResetHandler();
    }

    setIsSorting(!isSorting);
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="w-screen max-w-xl">
        <Graph ref={barRefs} bars={bars} />
        <OptionsBar
          isSorting={isSorting}
          onPlay={onPlayHandler}
          onSpeed={onSpeedHandler}
          onReset={onResetHandler}
        />
      </div>
    </div>
  );
}

export default App;
