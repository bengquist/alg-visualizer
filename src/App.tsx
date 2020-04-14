import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import useInterval from "./common/useInterval";
import Graph from "./Graph/Graph";
import { shuffle } from "./helpers";
import OptionsBar from "./Options/OptionsBar";

function App() {
  const barRefs = useRef<HTMLDivElement[]>([]);
  const [isSorting, setIsSorting] = useState(false);
  const [barCount, setBarCount] = useState(10);
  const [sortSpeed, setSortSpeed] = useState(1000);

  const [bars, setBars] = useState(
    shuffle(Array.from({ length: barCount }, (_, index) => ++index))
  );
  const [barRefsCopy, setBarRefsCopy] = useState<HTMLDivElement[]>(
    barRefs.current
  );

  const [outerLoopIndex, setOuterLoopIndex] = useState(bars.length - 1);
  const [innerLoopIndex, setInnerLoopIndex] = useState(0);

  useEffect(() => {
    const shuffledBars = shuffle(
      Array.from({ length: barCount }, (_, index) => ++index)
    );
    setBars(shuffledBars);
  }, [barCount]);

  const nextSwap = (inner: number, outer: number, bars: HTMLDivElement[]) => {
    let barsCopy = Array.from(bars);

    if (!barsCopy[inner + 1] || inner > outer) {
      const prevEl = inner <= outer && barsCopy[outer + 1];
      const el1 = barsCopy[outer];

      if (prevEl) prevEl.style.background = "blue";
      el1.style.background = "blue";

      setOuterLoopIndex(outer - 1);
      setInnerLoopIndex(0);

      return;
    }

    const prevEl = inner > 0 && bars[inner - 1];
    const el1 = bars[inner];
    const el2 = bars[inner + 1];
    const el1Value = Number(barsCopy[inner].innerText);
    const el2Value = Number(barsCopy[inner + 1].innerText);

    if (prevEl && inner - 1 < outer) prevEl.style.background = "#47c539";
    el1.style.background = "orange";
    el2.style.background = "orange";

    setTimeout(() => {
      if (el1Value > el2Value) {
        const style1 = window.getComputedStyle(el1);
        const style2 = window.getComputedStyle(el2);

        const transform1 = style1.getPropertyValue("transform");
        const transform2 = style2.getPropertyValue("transform");

        [barsCopy[inner], barsCopy[inner + 1]] = [
          barsCopy[inner + 1],
          barsCopy[inner],
        ];

        el1.style.transform = transform2;
        el2.style.transform = transform1;
      }

      setBarRefsCopy(barsCopy);
      setInnerLoopIndex(inner + 1);
    }, sortSpeed / 2);
  };

  useInterval(
    () => isSorting && nextSwap(innerLoopIndex, outerLoopIndex, barRefsCopy),
    sortSpeed
  );

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="w-screen max-w-2xl">
        <Graph ref={barRefs} bars={bars} />
        <OptionsBar
          isSorting={isSorting}
          onPlay={() => setIsSorting(!isSorting)}
          onCount={(e: ChangeEvent<HTMLInputElement>) =>
            setBarCount(Number(e.target.value) * 10)
          }
          onSpeed={(e: ChangeEvent<HTMLInputElement>) =>
            setSortSpeed(1000 / Number(e.target.value))
          }
        />
      </div>
    </div>
  );
}

export default App;
