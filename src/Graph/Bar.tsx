import React from "react";
import styled from "styled-components";

type Props = {
  width: number;
  height: number;
};

function Bar({ width, height }: Props) {
  return <Container style={{ width, height }}></Container>;
}

export default Bar;

const Container = styled.div`
  display: inline-block;
  background: blue;
`;
