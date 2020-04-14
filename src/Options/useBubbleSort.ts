import { useState } from "react";

function useBubbleSort(
  barRefs: HTMLDivElement[],
  sortSpeed: number,
  barCount: number
) {
  const [outerLoopIndex, setOuterLoopIndex] = useState(barCount - 1);
  const [innerLoopIndex, setInnerLoopIndex] = useState(0);
  const [barRefsCopy, setBarRefsCopy] = useState<HTMLDivElement[]>(barRefs);

  const nextSwap = (inner: number, outer: number, bars: HTMLDivElement[]) => {
    let barsCopy = Array.from(bars);

    console.log(outer);

    if (!barsCopy[inner + 1]) {
      const prevEl = inner <= outer && barsCopy[outer + 1];
      const el1 = barsCopy[outer];

      if (prevEl) prevEl.style.background = "blue";
      el1.style.background = "blue";

      setOuterLoopIndex(outer - 1);
      setInnerLoopIndex(0);

      return;
    }

    const prevEl = inner > 0 && bars[inner - 1];
    const el1 = bars[inner];
    const el2 = bars[inner + 1];
    const el1Value = Number(barsCopy[inner].innerText);
    const el2Value = Number(barsCopy[inner + 1].innerText);

    if (prevEl && inner - 1 < outer) prevEl.style.background = "#47c539";
    el1.style.background = "orange";
    el2.style.background = "orange";

    setTimeout(() => {
      if (el1Value > el2Value) {
        const style1 = window.getComputedStyle(el1);
        const style2 = window.getComputedStyle(el2);

        const transform1 = style1.getPropertyValue("transform");
        const transform2 = style2.getPropertyValue("transform");

        [barsCopy[inner], barsCopy[inner + 1]] = [
          barsCopy[inner + 1],
          barsCopy[inner],
        ];

        el1.style.transform = transform2;
        el2.style.transform = transform1;
      }

      setBarRefsCopy(barsCopy);
      setInnerLoopIndex(inner + 1);
    }, sortSpeed / 2);
  };

  return {
    nextSwap: () => nextSwap(innerLoopIndex, outerLoopIndex, barRefsCopy),
  };
}

export default useBubbleSort;
