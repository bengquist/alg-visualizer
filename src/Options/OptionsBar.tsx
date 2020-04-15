import {
  faBackward,
  faForward,
  faPause,
  faPlay,
  faUndo,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { ChangeEvent } from "react";
import styled from "styled-components";

type Props = {
  onPlay: () => void;
  onReset: () => void;
  onSpeed: (e: ChangeEvent<HTMLInputElement>) => void;
  isSorting?: boolean;
};

function OptionsBar({ onPlay, onReset, onSpeed, isSorting }: Props) {
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

const Slider = styled.input`
  appearance: none;
  cursor: pointer;

  :focus {
    outline: none;
  }
  ::-webkit-slider-runnable-track {
    width: 100%;
    height: 5px;
    background: #47c539;
    border-radius: 5px;
  }
  ::-webkit-slider-thumb {
    border: 2px solid #47c539;
    height: 20px;
    width: 20px;
    border-radius: 50%;
    background: #ffffff;
    -webkit-appearance: none;
    margin-top: -8px;
  }
`;
