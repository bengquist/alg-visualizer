import React from "react";
import Canvas from "./Canvas/Canvas";
import OptionsBar from "./Options/OptionsBar";

function App() {
  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="w-screen max-w-xl">
        <Canvas />
        <OptionsBar />
      </div>
    </div>
  );
}

export default App;
