import React, { useEffect, useRef, useState } from "react";
import { shuffle } from "../helpers";
import Bar from "./Bar";

function Graph() {
  const ref = useRef<HTMLDivElement>(null);
  const [barCount] = useState(50);
  const [barWidth, setBarWidth] = useState(0);

  useEffect(() => {
    if (ref.current) {
      setBarWidth(ref.current?.clientWidth / 50);
    }
  }, []);

  const renderBars = () => {
    const arr = Array.from({ length: barCount }, (_, index) => ++index);
    const shuffledArr = shuffle(arr);

    return shuffledArr.map((val) => (
      <Bar key={val} width={barWidth} height={val * 5} />
    ));
  };

  return <div ref={ref}>{renderBars()}</div>;
}

export default Graph;
