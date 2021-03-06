import React, { ChangeEvent, useRef, useState } from "react";
import { shuffle } from "./common/arrayHelpers";
import useInterval from "./common/useInterval";
import Graph from "./Graph/Graph";
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

  const onSkipHandler = () => {
    setIsSorting(false);
    nextSwap();
  };

  return (
    <>
      <div className="min-h-screen flex flex-col justify-center items-center">
        <div className="w-screen max-w-xl  px-2">
          <Graph ref={barRefs} bars={bars} />
          <OptionsBar
            isSorting={isSorting}
            onPlay={onPlayHandler}
            onSkip={onSkipHandler}
            onSpeed={onSpeedHandler}
            onReset={onResetHandler}
          />
          <div className="flex justify-center text-xs text-gray-800 font-bold">
            <a
              href="https://github.com/bengquist/alg-visualizer"
              rel="noopener noreferrer"
              target="_blank"
            >
              Source code
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
