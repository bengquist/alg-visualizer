import React from "react";
import Graph from "./Graph/Graph";
import OptionsBar from "./Options/OptionsBar";

function App() {
  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="w-screen max-w-xl">
        <Graph />
        <OptionsBar />
      </div>
    </div>
  );
}

export default App;
