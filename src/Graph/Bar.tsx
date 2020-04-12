import React from "react";
import styled from "styled-components";

type Props = {
  width: number;
  height: number;
  place: number;
};

function Bar({ width, height, place }: Props) {
  return <Container style={{ width, height }} place={place * width} />;
}

export default Bar;

const Container = styled.div<{ place: number }>`
  position: absolute;
  background: blue;
  border: 1px solid white;
  bottom: 0;

  transition: 1s;

  transform: matrix(1, 0, 0, 1, ${({ place }) => place}, 0);
`;
