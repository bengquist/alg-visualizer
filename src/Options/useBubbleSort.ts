import { useEffect, useState } from "react";

function useBubbleSort(
  barRefs: HTMLDivElement[],
  sortSpeed: number,
  barCount: number
) {
  const [outerLoopIndex, setOuterLoopIndex] = useState(barCount - 1);
  const [innerLoopIndex, setInnerLoopIndex] = useState(0);

  useEffect(() => {
    setOuterLoopIndex(barCount - 1);
  }, [barCount]);

  const reset = () => {
    setOuterLoopIndex(barCount - 1);
    setInnerLoopIndex(0);
  };

  const nextSwap = (inner: number, outer: number) => {
    if (outer < inner) {
      return;
    }

    if (!barRefs[inner + 1] || inner >= outer) {
      const el1 = barRefs[outer];

      el1.style.background = "blue";

      setOuterLoopIndex(outer - 1);
      setInnerLoopIndex(0);

      return;
    }

    const prevEl = inner > 0 && barRefs[inner - 1];
    const el1 = barRefs[inner];
    const el2 = barRefs[inner + 1];
    const el1Value = Number(barRefs[inner].innerText);
    const el2Value = Number(barRefs[inner + 1].innerText);

    if (prevEl && inner - 1 < outer) prevEl.style.background = "#47c539";
    el1.style.background = "orange";
    el2.style.background = "orange";

    setTimeout(() => {
      if (el1Value > el2Value) {
        const style1 = window.getComputedStyle(el1);
        const style2 = window.getComputedStyle(el2);

        const transform1 = style1.getPropertyValue("transform");
        const transform2 = style2.getPropertyValue("transform");

        [barRefs[inner], barRefs[inner + 1]] = [
          barRefs[inner + 1],
          barRefs[inner],
        ];

        el1.style.transform = transform2;
        el2.style.transform = transform1;
      }

      setInnerLoopIndex(inner + 1);
    }, sortSpeed / 2);
  };

  return {
    reset,
    nextSwap: () => nextSwap(innerLoopIndex, outerLoopIndex),
  };
}

export default useBubbleSort;
