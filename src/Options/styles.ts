import styled from "styled-components";

export const Slider = styled.input`
  appearance: none;
  cursor: pointer;
  background: #5c6778;

  ::-webkit-slider-runnable-track {
    width: 100%;
    height: 5px;
    border-radius: 5px;
  }
  ::-webkit-slider-thumb {
    border: 2px solid #5c6778;
    height: 20px;
    width: 20px;
    border-radius: 50%;
    background: #efefef;
    -webkit-appearance: none;
    margin-top: -8px;
  }
  :focus {
    outline: none;
  }
`;
