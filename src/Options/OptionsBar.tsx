import {
  faBackward,
  faForward,
  faPlay,
  faUndo,
  faVolumeMute,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

function OptionsBar() {
  return (
    <div className="rounded overflow-hidden shadow-lg bg-gray-800 flex flex-row justify-between p-4 text-white">
      <select className="bg-gray-200 border border-gray-200 text-gray-700 px-4 pr-8 focus:outline-none focus:bg-white focus:border-gray-500">
        <option>Bubble</option>
      </select>

      <div className="flex">
        <button className="p-3">
          <FontAwesomeIcon icon={faUndo} />
        </button>
        <button className="p-3">
          <FontAwesomeIcon icon={faBackward} />
        </button>
        <button className="p-3">
          <FontAwesomeIcon icon={faPlay} />
        </button>
        <button className="p-3">
          <FontAwesomeIcon icon={faForward} />
        </button>
        <button className="p-3">
          <FontAwesomeIcon icon={faVolumeMute} />
        </button>
      </div>

      <input type="range" />
      <input type="range" />
    </div>
  );
}

export default OptionsBar;
