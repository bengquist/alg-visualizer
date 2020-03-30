import React from "react";

function OptionsBar() {
  return (
    <div className="rounded overflow-hidden shadow-lg bg-gray-800 flex flex-row justify-between">
      <select className="bg-gray-200 border border-gray-200 text-gray-700 px-4 pr-8 focus:outline-none focus:bg-white focus:border-gray-500">
        <option>Bubble</option>
      </select>
      <button className="p-6 p-4">hey</button>
      <input type="range" />
      <input type="range" />
      <button className="p-6 p-4">ayylmao</button>
    </div>
  );
}

export default OptionsBar;
