import React, { ChangeEvent, useState } from "react";
import Graph from "./Graph/Graph";
import OptionsBar from "./Options/OptionsBar";

function App() {
  const [isSorting, setIsSorting] = useState(false);
  const [barCount, setBarCount] = useState(1);

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="w-screen max-w-2xl">
        <Graph barCount={barCount} isSorting={isSorting} />
        <OptionsBar
          isSorting={isSorting}
          onPlay={() => setIsSorting(!isSorting)}
          onCount={(e: ChangeEvent<HTMLInputElement>) =>
            setBarCount(Number(e.target.value))
          }
        />
      </div>
    </div>
  );
}

export default App;
