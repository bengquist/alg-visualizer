import React, { forwardRef } from "react";
import styled from "styled-components";

type Props = {
  width: number;
  height: number;
  place: number;
  val: number;
};

function Bar({ width, height, place, val }: Props, ref: any) {
  return (
    <Container ref={ref} style={{ width, height }} place={place * width}>
      <div className="flex center justify-center text-white">{val}</div>
    </Container>
  );
}

export default forwardRef(Bar);

const Container = styled.div<{ place: number }>`
  position: absolute;
  background: #47c539;
  border-radius: 5px 5px 0 0;
  border: 1px solid white;
  bottom: 0;

  transition: 0.5s;

  transform: matrix(1, 0, 0, 1, ${({ place }) => place}, 0);
`;
