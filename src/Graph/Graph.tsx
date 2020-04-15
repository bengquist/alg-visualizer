import React, {
  forwardRef,
  RefObject,
  useEffect,
  useRef,
  useState,
} from "react";
import styled from "styled-components";

type Props = {
  bars: number[];
};

function Graph({ bars }: Props, barRefs: RefObject<HTMLDivElement[]>) {
  const graphRef = useRef<HTMLDivElement>(null);
  const [barWidth, setBarWidth] = useState(0);

  useEffect(() => {
    if (graphRef.current) {
      setBarWidth(graphRef.current?.clientWidth / bars.length);
    }
  }, [bars.length]);

  const renderBars = () => {
    return bars.map((val, index) => {
      return (
        <Container
          ref={(ref: HTMLDivElement) =>
            barRefs.current && (barRefs.current[index] = ref)
          }
          style={{
            width: barWidth,
            height: val * 25,
            transform: `matrix(1, 0, 0, 1, ${index * barWidth}, 0)`,
          }}
        >
          <div className="flex center justify-center text-white">{val}</div>
        </Container>
      );
    });
  };

  return (
    <div className="relative" ref={graphRef}>
      {renderBars()}
    </div>
  );
}

//@ts-ignore
export default forwardRef(Graph);

const Container = styled.div`
  position: absolute;
  background: #47c539;
  border-radius: 5px 5px 0 0;
  border: 1px solid white;
  bottom: 0;
  transition: 0.2s;
`;
