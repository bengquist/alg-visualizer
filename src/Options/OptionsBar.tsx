import {
  faBackward,
  faForward,
  faPause,
  faPlay,
  faUndo,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { ChangeEvent } from "react";

type Props = {
  onPlay: () => void;
  onReset: () => void;
  onCount: (e: ChangeEvent<HTMLInputElement>) => void;
  onSpeed: (e: ChangeEvent<HTMLInputElement>) => void;
  isSorting?: boolean;
};

function OptionsBar({ onPlay, onReset, onCount, onSpeed, isSorting }: Props) {
  return (
    <div className="rounded overflow-hidden shadow-lg bg-gray-800 flex flex-row justify-between p-4 text-white">
      <select className="bg-gray-200 border border-gray-200 text-gray-700 px-3 focus:outline-none focus:bg-white focus:border-gray-500">
        <option>Bubble</option>
      </select>

      <div className="flex">
        <button className="p-3" onClick={onReset}>
          <FontAwesomeIcon icon={faUndo} />
        </button>
        <button className="p-3">
          <FontAwesomeIcon icon={faBackward} />
        </button>
        <button className="p-3" onClick={onPlay}>
          {isSorting ? (
            <FontAwesomeIcon icon={faPause} />
          ) : (
            <FontAwesomeIcon icon={faPlay} />
          )}
        </button>
        <button className="p-3">
          <FontAwesomeIcon icon={faForward} />
        </button>
      </div>

      <input type="range" defaultValue="1" min="1" max="5" onChange={onCount} />
      <input type="range" defaultValue="1" min="1" max="5" onChange={onSpeed} />
    </div>
  );
}

export default OptionsBar;
