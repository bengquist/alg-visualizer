import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { shuffle, swap } from "../helpers";
import useInterval from "../hooks/useInterval";
import Bar from "./Bar";

const barCount = 20;

function Graph() {
  const ref = useRef<HTMLDivElement>(null);
  const [barWidth, setBarWidth] = useState(0);
  const [bars, setBars] = useState(
    Array.from({ length: barCount }, (_, index) => ++index)
  );
  const [firstIndex, setFirstIndex] = useState(0);
  const [secondIndex, setSecondIndex] = useState(0);

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
    const barsCopy = Array.from(bars);

    if (barsCopy[secondIndex] > barsCopy[secondIndex + 1]) {
      swap(barsCopy, secondIndex, secondIndex + 1);
    }

    setSecondIndex(secondIndex + 1);
    setBars(barsCopy);
  };

  useInterval(() => nextSwap(), 1000);

  const renderBars = () => {
    return bars.map((val, index) => (
      <Bar key={val} width={barWidth} height={val * 5} place={index} />
    ));
  };

  console.log(bars);

  return <Container ref={ref}>{renderBars()}</Container>;
}

export default Graph;

const Container = styled.div`
  position: relative;
`;
