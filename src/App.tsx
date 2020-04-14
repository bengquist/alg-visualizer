import React, { useState } from "react";
import Graph from "./Graph/Graph";
import OptionsBar from "./Options/OptionsBar";

function App() {
  const [isSorting, setIsSorting] = useState(false);

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="w-screen max-w-2xl">
        <Graph isSorting={isSorting} />
        <OptionsBar
          isSorting={isSorting}
          onPlay={() => setIsSorting(!isSorting)}
        />
      </div>
    </div>
  );
}

export default App;
