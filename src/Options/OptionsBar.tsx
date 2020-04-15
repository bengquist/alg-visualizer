import {
  faBackward,
  faForward,
  faPause,
  faPlay,
  faUndo,
} from "@fortawesome/free-solid-svg-icons";
import React, { ChangeEvent } from "react";
import IconButton from "../ui/IconButton";
import { Slider } from "./styles";

type Props = {
  onPlay: () => void;
  onSkip: () => void;
  onReset: () => void;
  onSpeed: (e: ChangeEvent<HTMLInputElement>) => void;
  isSorting?: boolean;
};

function OptionsBar({ onPlay, onSkip, onReset, onSpeed, isSorting }: Props) {
  return (
    <div className="rounded overflow-hidden shadow-lg bg-gray-800 flex flex-row justify-between p-4 text-white">
      <select className="rounded bg-gray-300 border border-gray-200 text-gray-700 px-3 focus:outline-none focus:bg-white focus:border-gray-500">
        <option>Bubble</option>
      </select>

      <div className="flex">
        <IconButton onClick={onReset} icon={faUndo} />
        <IconButton icon={faBackward} />
        <IconButton onClick={onPlay} icon={isSorting ? faPause : faPlay} />
        <IconButton onClick={onSkip} icon={faForward} />
      </div>

      <div className="flex flex-col items-center">
        <p className="mb-2">Speed</p>
        <Slider
          type="range"
          defaultValue="2"
          min="1"
          max="5"
          onChange={onSpeed}
        />
      </div>
    </div>
  );
}

export default OptionsBar;
