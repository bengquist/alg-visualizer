import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { shuffle } from "../helpers";
import useInterval from "../hooks/useInterval";
import Bar from "./Bar";

type Props = {
  isSorting?: boolean;
};

const barCount = 20;

function Graph({ isSorting }: Props) {
  const barRefs = useRef<HTMLDivElement[]>([]);
  const graphRef = useRef<HTMLDivElement>(null);
  const [barWidth, setBarWidth] = useState(0);
  const [bars, setBars] = useState(
    Array.from({ length: barCount }, (_, index) => ++index)
  );

  useEffect(() => {
    if (graphRef.current) {
      setBarWidth(graphRef.current?.clientWidth / barCount);
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

    el1.style.transform = transform2;
    el2.style.transform = transform1;
  };

  useInterval(() => isSorting && nextSwap(), 1000);

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

  return <Container ref={graphRef}>{renderBars()}</Container>;
}

export default Graph;

const Container = styled.div`
  position: relative;
`;
