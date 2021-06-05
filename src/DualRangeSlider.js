import React, { useState, useRef } from "react";
import styled from 'styled-components';

let newValue1 = "";
let newValue2 = "";
let newPosition1 = "";
let newPosition2 = "";
let fillColor = "";

const DualRangeSlider = ({ min = 0, max = 100, vertical = false, decimal = 0, step = 1, width = "400px", accentColor = "black" }) => {
  const upperRange = useRef(null);
  const lowerRange = useRef(null);
  const [lowerVal, setLowerVal] = useState(min - 1);
  const [upperVal, setUpperVal] = useState(max);
  const [isFocused, setIsFocused] = useState(false);

  fillColor = accentColor;
  newValue1 = Number(
    ((lowerVal - min) * 100) /
    (max - min)
  );
  newPosition1 = 10 - newValue1 * 0.2;

  newValue2 = Number(
    ((upperVal - min) * 100) /
    (max - min)
  );
  newPosition2 = 10 - newValue2 * 0.2;


  //If the upper value slider is LESS THAN the lower value slider.
  if (upperVal > lowerVal) {
    //The lower slider value is set to equal the upper value slider.
    upperVal && setLowerVal(parseFloat(upperVal));
    //If the lower value slider equals its set minimum.
    if (lowerVal === 0) {
      //Set the upper slider value to equal 1.
      setUpperVal(min);
    }
  }
  //If the lower value slider is GREATER THAN the upper value slider minus one.
  if (lowerVal < upperVal - 1) {
    //The upper slider value is set to equal the lower value slider plus one.
    lowerVal && setUpperVal(parseFloat(lowerVal) + 1);
    //If the upper value slider equals its set maximum.
    if (upperVal === max) {
      //Set the lower slider value to equal the upper value slider's maximum value minus one.
      setLowerVal(parseFloat(max));
    }
  }


  return (
    <RangeWrap style={{ width: width }}>
      <div className="multi-range">
        <RangeOutput
          focused={isFocused}
          style={{ left: `calc(${newValue1}% + (${newPosition1 / 10}rem))` }}
          className="range-value"
        >
          {lowerVal ? lowerVal.toFixed(decimal) : 0}
        </RangeOutput>
        <StyledRangeSlider
          tabIndex="2"
          ref={lowerRange}
          type="range"
          min={min}
          max={max}
          value={lowerVal}
          step={step}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onInput={e => {
            setLowerVal(parseFloat(e.target.value));
            lowerRange.current.focus();
          }}
        />
        <Progress
          focused={isFocused}
          id="range-color"
          className="range-color"
        ></Progress>
        <RangeOutput
          focused={isFocused}
          style={{ left: `calc(${newValue2}% + (${newPosition2 / 10}rem))` }}
          className="range-value"
        >
          {upperVal ? upperVal.toFixed(decimal) : 0}
        </RangeOutput>
        <StyledRangeSlider
          tabIndex="1"
          ref={upperRange}
          type="range"
          min={min}
          max={max}
          value={upperVal}
          step={step}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onInput={e => {
            upperRange.current.focus();
            setUpperVal(parseFloat(e.target.value));
          }}
        />
      </div>
    </RangeWrap>
  );
};

export default DualRangeSlider;


const blackColor = "#999";
const whiteColor = "white";

const RangeWrap = styled.div`
    position: relative;
    height: 2.2rem;
    margin-top: 4rem;
  `;

const RangeOutput = styled.div`
    font-family: sans-serif;
    line-height: 1.75rem;
    text-align: center;
    background: #000;
    padding: 0.15rem 0.35rem;
    color: #fff;
    font-size: 1rem;
    display: block;
    position: absolute;
    left: 0;
    top: 0;
    transform: translate(-50%, 0);
    border-radius: 5px;
    box-shadow: 0 1px 5px 0 rgba(0, 0, 0, 0.25);
    background: ${p => p.focused ? fillColor : whiteColor};
    color: ${p => p.focused ? whiteColor : blackColor};
    border: ${p => p.focused ? "none" : `1px solid ${blackColor}`};
    transform: translateX(50%);
    margin-left: -7.5%;
    margin-top: -12.5%;
    transition: all 0.15s ease-out;
  `;

const StyledRangeSlider = styled.input.attrs({ type: "range" })`
  position: absolute;
  box-sizing: border-box;
  appearance: none;
  width: 100%;
  height: 12px;
  background-color: transparent;
  border-radius: 50px;
  margin: 0;
  border: 0;
  pointer-events: none;
  &:focus {
    outline: none;
  }

  &::-webkit-slider-thumb {
  height: 2.2rem;
  width: 2.2rem;
  border-radius: 50%;
  border: solid 1px #b2b2b2;
  background-color: #fff;
  position: relative;
  z-index: 50;
  cursor: pointer;
  appearance: none;
  pointer-events: all;
  box-shadow: 0 1px 4px 0.5px rgba(0, 0, 0, 0.25);
}

&::-moz-range-thumb {
  height: 2.2rem;
  width: 2.2rem;
  border-radius: 50%;
  border: solid 1px #b2b2b2;
  background-color: #fff;
  cursor: pointer;
  appearance: none;
  pointer-events: all;
  box-shadow: 0 1px 4px 0.5px rgba(0, 0, 0, 0.25);
}

&:focus::-webkit-slider-thumb {
  background: ${p => p.focused ? whiteColor : `-webkit-radial-gradient(center, ellipse cover,  ${fillColor} 0%,${fillColor} 35%,${whiteColor} 40%,${whiteColor} 100%)`};
  transition: all 0.15s ease-out;
  transition: all 0.15s ease-out;
}
&:focus::-moz-slider-thumb {
  background: ${p => p.focused ? whiteColor : `-webkit-radial-gradient(center, ellipse cover,  ${fillColor} 0%,${fillColor} 35%,${whiteColor} 40%,${whiteColor} 100%)`};
  transition: all 0.15s ease-out;
  transition: all 0.15s ease-out;
}
`;


const Progress = styled.div`
  z-index: -1;
  background: ${p => p.focused ? `-webkit-linear-gradient(left,  #EFEFEF ${`calc(${newValue2}% + (${newPosition2}px))`},${fillColor} ${`calc(${newValue2}% + (${newPosition2}px))`},${fillColor} ${`calc(${newValue1}% + (${newPosition1}px))`},#EFEFEF ${`calc(${newValue1}% + (${newPosition1}px))`})` : whiteColor};
  border: solid 1px #000;
  border-radius: 50px;
  width: 100%;
  display: block;
  height: 12px;
  position: absolute;
  box-shadow: inset 1px 1px 2px hsla(0, 0%, 0%, 0.25),
    inset 0px 0px 2px hsla(0, 0%, 0%, 0.25);
  transition: all 0.15s ease-out;
`;

