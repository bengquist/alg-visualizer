import { useState } from "react";
import { swap } from "../common/arrayHelpers";

function useBubbleSort(
  barRefs: HTMLDivElement[],
  sortSpeed: number,
  barCount: number,
  onStop?: () => void
) {
  const [outerLoopIndex, setOuterLoopIndex] = useState(barCount - 1);
  const [innerLoopIndex, setInnerLoopIndex] = useState(0);
  const [barRefsCopy, setBarRefsCopy] = useState<HTMLDivElement[]>(barRefs);

  const reset = () => {
    setOuterLoopIndex(barCount - 1);
    setInnerLoopIndex(0);
  };

  const nextSwap = (inner: number, outer: number, bars: HTMLDivElement[]) => {
    let barsCopy = Array.from(bars);

    if (outer < inner) {
      if (onStop) onStop();
      return;
    }

    const prevEl = inner > 0 && bars[inner - 1];
    const innerEl1 = bars[inner];
    const innerEl2 = bars[inner + 1];
    const outerEl1 = barsCopy[outer];

    if (!barsCopy[inner + 1] || inner >= outer) {
      const prevEl = inner > 0 && bars[inner - 1];

      if (prevEl && inner - 1 < outer) prevEl.style.background = "#47c539";
      outerEl1.style.background = "#5C6778";

      setOuterLoopIndex(outer - 1);
      setInnerLoopIndex(0);

      return;
    }

    const el1Value = Number(barsCopy[inner].innerText);
    const el2Value = Number(barsCopy[inner + 1].innerText);

    if (prevEl && inner - 1 < outer) prevEl.style.background = "#47c539";
    innerEl1.style.background = "#C84A85";
    innerEl2.style.background = "#C84A85";

    setTimeout(() => {
      if (el1Value > el2Value) {
        const style1 = window.getComputedStyle(innerEl1);
        const style2 = window.getComputedStyle(innerEl2);

        const transform1 = style1.getPropertyValue("transform");
        const transform2 = style2.getPropertyValue("transform");

        swap(barsCopy, inner, inner + 1);

        innerEl1.style.transform = transform2;
        innerEl2.style.transform = transform1;
      }

      setBarRefsCopy(barsCopy);
      setInnerLoopIndex(inner + 1);
    }, sortSpeed / 2);
  };

  return {
    reset,
    nextSwap: () => nextSwap(innerLoopIndex, outerLoopIndex, barRefsCopy),
  };
}

export default useBubbleSort;
