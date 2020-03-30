import React from "react";

function OptionsBar() {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-gray-800">
      <select className="appearance-none bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
        <option>Bubble</option>
      </select>
      <button className="p-6 p-4">hey</button>
    </div>
  );
}

export default OptionsBar;
