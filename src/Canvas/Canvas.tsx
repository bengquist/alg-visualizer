import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { shuffle } from "../helpers";

function Canvas() {
  const values = Array.from({ length: 50 }, (_, index) => ++index);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    shuffle(values);

    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    const ctx = canvasRef.current?.getContext("2d");

    if (ctx) {
      const canvasHeight = ctx.canvas.height;
      const barWidth = ctx.canvas.width / values.length;

      const renderBars = () => {
        ctx.fillStyle = "green";

        //@ts-ignore
        for (let [index, value] of values.entries()) {
          const x = index * barWidth;
          const y = canvasHeight - (value / values.length) * canvasHeight;

          console.log(values);

          ctx.fillRect(x, y, barWidth, canvasHeight);
        }
      };

      renderBars();
    }
  }, [values]);

  return <Container ref={canvasRef}></Container>;
}

export default Canvas;

const Container = styled.canvas`
  width: 100%;
  height: 500px;
`;
