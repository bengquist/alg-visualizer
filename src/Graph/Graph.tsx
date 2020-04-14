import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { shuffle } from "../helpers";
import useInterval from "../hooks/useInterval";
import Bar from "./Bar";

const barCount = 20;

function Graph() {
  const ref = useRef<HTMLDivElement>(null);
  const [barWidth, setBarWidth] = useState(0);
  const [bars, setBars] = useState(
    Array.from({ length: barCount }, (_, index) => ++index)
  );
  const barRefs = useRef([]);

  useEffect(() => {
    if (ref.current) {
      setBarWidth(ref.current?.clientWidth / barCount);
    }
  }, []);

  useEffect(() => {
    const shuffledBars = shuffle(bars);
    setBars(shuffledBars);
  }, []);

  const nextSwap = () => {
    const el1 = barRefs.current[0];
    const el2 = barRefs.current[1];

    const style1 = window.getComputedStyle(el1);
    const style2 = window.getComputedStyle(el2);

    const transform1 = style1.getPropertyValue("transform");
    const transform2 = style2.getPropertyValue("transform");

    //@ts-ignore
    el1.style.transform = transform2;
    //@ts-ignore
    el2.style.transform = transform1;
  };

  useInterval(() => nextSwap(), 1000);

  const renderBars = () => {
    return bars.map((val, index) => (
      <Bar
        key={val}
        width={barWidth}
        height={val * 5}
        place={index}
        //@ts-ignore
        ref={(ref) => (barRefs.current[index] = ref)}
      />
    ));
  };

  console.log(barRefs);

  return <Container ref={ref}>{renderBars()}</Container>;
}

export default Graph;

const Container = styled.div`
  position: relative;
`;
