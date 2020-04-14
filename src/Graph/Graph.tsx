import React, { useEffect, useRef, useState } from "react";
import { shuffle } from "../helpers";
import useInterval from "../hooks/useInterval";
import Bar from "./Bar";

type Props = {
  barCount: number;
  isSorting?: boolean;
};

function Graph({ barCount, isSorting }: Props) {
  const barRefs = useRef<HTMLDivElement[]>([]);
  const graphRef = useRef<HTMLDivElement>(null);
  const [barWidth, setBarWidth] = useState(0);
  const [bars, setBars] = useState(
    Array.from({ length: barCount * 10 }, (_, index) => ++index)
  );
  const [barRefsCopy, setBarRefsCopy] = useState<HTMLDivElement[]>(
    barRefs.current
  );

  const [outerLoopIndex, setOuterLoopIndex] = useState(bars.length - 1);
  const [innerLoopIndex, setInnerLoopIndex] = useState(0);

  useEffect(() => {
    setBars(Array.from({ length: barCount * 10 }, (_, index) => ++index));
  }, [barCount]);

  useEffect(() => {
    if (graphRef.current) {
      setBarWidth(graphRef.current?.clientWidth / (barCount * 10));
    }
  }, [barCount]);

  useEffect(() => {
    const shuffledBars = shuffle(bars);
    setBars(shuffledBars);
  }, []);

  const nextSwap = (inner: number, outer: number, bars: HTMLDivElement[]) => {
    let barsCopy = Array.from(bars);

    if (!barsCopy[inner + 1] || inner > outer) {
      const el1 = barsCopy[outer];
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
    }, 700);
  };

  useInterval(
    () => isSorting && nextSwap(innerLoopIndex, outerLoopIndex, barRefsCopy),
    1400
  );

  const renderBars = () => {
    return bars.map((val, index) => (
      <Bar
        key={val}
        val={val}
        width={barWidth}
        height={val * 25}
        place={index}
        ref={(ref: HTMLDivElement) => (barRefs.current[index] = ref)}
      />
    ));
  };

  return (
    <div className="relative" ref={graphRef}>
      {renderBars()}
    </div>
  );
}

export default Graph;
