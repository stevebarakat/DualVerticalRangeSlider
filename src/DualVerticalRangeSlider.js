import React, { useState, useEffect, useLayoutEffect, useRef } from "react";
import styled from 'styled-components';

let newValue1 = "";
let newValue2 = "";
let newPosition1 = "";
let newPosition2 = "";
let focusColor = "";
let blurColor = "";
let marks = [];

const DualVerticalRangeSlider = ({ min = 0, max = 100, decimals = 0, step = 0, ticks = true, height = "250px", prefix = "", suffix = "", primaryColor = "black", primaryColor50 }) => {
  const upperRange = useRef(null);
  const lowerRange = useRef(null);
  const outputEl = useRef(null);
  const [lowerVal, setLowerVal] = useState(max / 3);
  const [upperVal, setUpperVal] = useState(max / 1.5);
  const [lowerFocused, setLowerFocused] = useState(true);
  const [upperFocused, setUpperFocused] = useState(true);
  const [progressFocused, setProgressFocused] = useState(false);
  const [selectedValue, setSelectedValue] = useState({ upper: "", lower: "" });
  const [outputWidth, setOutputWidth] = useState('');
  const [tickWidth, setTickWidth] = useState('');
  const factor = (max - min) / 10;
  focusColor = primaryColor;
  blurColor = primaryColor50;
  newValue1 = Number(((lowerVal - min) * 100) / (max - min));
  newPosition1 = 10 - newValue1 * 0.2;
  newValue2 = Number(((upperVal - min) * 100) / (max - min));
  newPosition2 = 10 - newValue2 * 0.2;

  useLayoutEffect(() => {
    ticks && setTickWidth(outputEl.current.parentNode.lastChild.lastChild.firstChild.clientHeight);
    setOutputWidth(outputEl.current.clientHeight);
  }, [ticks, lowerVal, upperVal]);

  useEffect(() => {
    console.log(selectedValue.upper, selectedValue.lower);
  }, [selectedValue]);

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  if (ticks) {
    let markers = [];
    for (let i = min; i <= max; i += step) {
      const labelLength = i.toString().length;
      markers.push(<Tick length={labelLength} key={i}><div>{prefix + numberWithCommas(i.toFixed(decimals)) + " " + suffix}</div></Tick>);
    }
    marks = markers.map(marker => marker);
  }

  function handleKeyPress(e) {
    switch (e.keyCode) {
      case 13: //Enter
      case 32: //Space
        setSelectedValue({
          upper: upperVal,
          lower: lowerVal
        });
        return;
      case 27: //Esc
        upperRange.current.blur();
        lowerRange.current.blur();
        return;
      default: 
        return null;
    }
  }


  //If the upper value slider is LESS THAN the lower value slider.
  if (upperVal > lowerVal) {
    //The lower slider value is set to equal the upper value slider.
    setLowerVal(parseFloat(upperVal));
    //If the lower value slider equals its set minimum.
    if (lowerVal === 0) {
      //Set the upper slider value to equal 1.
      setUpperVal(min);
    }
  }
  //If the lower value slider is GREATER THAN the upper value slider minus one.
  if (lowerVal < upperVal - 1) {
    //The upper slider value is set to equal the lower value slider.
    setUpperVal(parseFloat(lowerVal));
    //If the upper value slider equals its set maximum.
    if (upperVal === max) {
      //Set the lower slider value to equal the upper value slider's maximum value.
      setLowerVal(parseFloat(max));
    }
  }

  return (
    <RangeWrapWrap outputWidth={outputWidth} ticks={ticks} tickWidth={tickWidth} heightVal={height}>
      <RangeWrap outputWidth={outputWidth} ticks={ticks} tickWidth={tickWidth} heightVal={height}>
        <Progress
          focused={progressFocused}
          id="range-color"
          className="range-color"
        ></Progress>
        <RangeOutput
          ref={outputEl}
          focused={progressFocused}
          style={{ left: `calc(${newValue1}% + (${newPosition1 / 10}rem))` }}
          className="range-value"
        >
          lo: {prefix + numberWithCommas(lowerVal.toFixed(decimals)) + " " + suffix}
        </RangeOutput>
        <StyledRangeSlider
          tabIndex="0"
          ref={lowerRange}
          type="range"
          min={min}
          max={max}
          value={lowerVal}
          step={step}
          onFocus={() => {
            setLowerFocused(true);
            setProgressFocused(true);
          }}
          onBlur={() => setProgressFocused(false)}
          onInput={e => {
            setLowerVal(e.target.valueAsNumber);
          }}
          onKeyDown={e => handleKeyPress(e)}
          focused={lowerFocused}
          style={lowerFocused ? { pointerEvents: "none" } : { pointerEvents: "all" }}
        />
        <RangeOutput
          focused={progressFocused}
          style={{ left: `calc(${newValue2}% + (${newPosition2 / 10}rem))` }}
          className="range-value"
        >
          up: {prefix + numberWithCommas(upperVal.toFixed(decimals)) + " " + suffix}
        </RangeOutput>
        <StyledRangeSlider
          tabIndex="0"
          ref={upperRange}
          type="range"
          min={min}
          max={max}
          value={upperVal}
          step={step}
          onFocus={() => {
            setUpperFocused(true);
            setProgressFocused(true);
          }}
          onBlur={() => setProgressFocused(false)}
          onInput={e => {
            setUpperVal(e.target.valueAsNumber);
          }}
          onKeyDown={e => handleKeyPress(e)}
          focused={upperFocused}
          style={upperFocused ? { pointerEvents: "none" } : { pointerEvents: "all" }}
        />
        {ticks && <Ticks>{marks}</Ticks>}
      </RangeWrap>
    </RangeWrapWrap>
  );
};

export default DualVerticalRangeSlider;


const blackColor = "#999";
const whiteColor = "white";

const RangeWrapWrap = styled.div`
  width: ${p => p.ticks ? p.outputWidth + p.tickWidth + 75 + "px" : p.outputWidth + 60 + "px"};
  height: ${p => p.heightVal};
  background: lightyellow;
  border: 1px dashed red;
  padding-left: 10px;
`;
const RangeWrap = styled.div`
  width: ${p => p.heightVal};
  margin-left: ${p => p.ticks ? p.tickWidth + "px" : "-1rem"};
  transform: rotate(270deg);
  transform-origin: top left;
  margin-top: ${p => p.heightVal};
  left: 0;
  top: 0;
  font-family: sans-serif;
`;

const RangeOutput = styled.div`
  position: absolute;
  margin-top: 3.5rem;
  margin-left: -0.8rem;
  border: ${p => p.focused ? `1px solid ${focusColor}` : `1px solid ${blackColor}`};
  background: ${p => p.focused ? focusColor : whiteColor};
  color: ${p => p.focused ? whiteColor : blackColor};
  text-align: left;
  padding: 0.75rem 0.25rem 0.75rem 0.1rem;
  font-size: 1rem;
  display: block;
  border-radius: 5px;
  box-shadow: 0 1px 5px 0 rgba(0, 0, 0, 0.25);
  writing-mode: vertical-lr;
  transition: all 0.15s ease-out;
  white-space: nowrap;
`;

const StyledRangeSlider = styled.input.attrs({ type: "range" })`
  cursor: pointer;
  appearance: none;
  position: absolute;
  width: 100%;
  height: 15px;
  border-radius: 15px;
  background: transparent;
  margin: 20px 0 0 0;
  &:focus {
    outline: none;
  }

  &::-webkit-slider-thumb {
    pointer-events: all;
    position: relative;
    height: 2.15rem;
    width: 2.15rem;
    border-radius: 50%;
    box-shadow: 0 0 4px 0 rgba(0, 0, 0, 1);
    cursor: pointer;
    -webkit-appearance: none;
    z-index: 50;
    background: ${p => !p.focused ? `-webkit-radial-gradient(center, ellipse cover,  ${focusColor} 0%,${focusColor} 35%,${whiteColor} 40%,${whiteColor} 100%)` :
    `-webkit-radial-gradient(center, ellipse cover,  ${focusColor} 0%,${focusColor} 35%,${whiteColor} 40%,${whiteColor} 100%)`};
  }
  
  &::-moz-range-thumb {
    pointer-events: all;
    position: relative;
    height: 2.15rem;
    width: 2.15rem;
    border-radius: 50%;
    box-shadow: 0 0 4px 0 rgba(0, 0, 0, 1);
    cursor: pointer;
    appearance: none;
    z-index: 50;
    background: ${p => !p.focused ? `-moz-radial-gradient(center, ellipse cover,  ${focusColor} 0%,${focusColor} 35%,${whiteColor} 40%,${whiteColor} 100%)` :
    `-moz-radial-gradient(center, ellipse cover,  ${focusColor} 0%,${focusColor} 35%,${whiteColor} 40%,${whiteColor} 100%)`};
  }

  &:focus::-webkit-slider-thumb {
    background: ${p => !p.focused ? `-webkit-radial-gradient(center, ellipse cover,  ${focusColor} 0%,${focusColor} 35%,${whiteColor} 40%,${whiteColor} 100%)` :
    `-webkit-radial-gradient(center, ellipse cover,  ${whiteColor} 0%,${whiteColor} 35%,${focusColor} 40%,${focusColor} 100%)`};
    transition: all 0.15s ease-out;
  }

  &:focus::-moz-range-thumb {
    background: ${p => !p.focused ? `-moz-radial-gradient(center, ellipse cover,  ${focusColor} 0%,${focusColor} 35%,${whiteColor} 40%,${whiteColor} 100%)` :
    `-moz-radial-gradient(center, ellipse cover,  ${whiteColor} 0%,${whiteColor} 35%,${focusColor} 40%,${focusColor} 100%)`};
    transition: all 0.15s ease-out;
  }
  `;

const Progress = styled.div`
  z-index: 0;
  background: ${p => p.focused ? `-webkit-linear-gradient(left,  #EFEFEF ${`calc(${newValue2}% + (${newPosition2}px))`},${focusColor} ${`calc(${newValue2}% + (${newPosition2}px))`},${focusColor} ${`calc(${newValue1}% + (${newPosition1}px))`},#EFEFEF ${`calc(${newValue1}% + (${newPosition1}px))`})` :
    `-webkit-linear-gradient(left,  #EFEFEF ${`calc(${newValue2}% + (${newPosition2}px))`},${blurColor} ${`calc(${newValue2}% + (${newPosition2}px))`},${blurColor} ${`calc(${newValue1}% + (${newPosition1}px))`},#EFEFEF ${`calc(${newValue1}% + (${newPosition1}px))`})`};
  border: solid 1px #000;
  border-radius: 50px;
  width: 100%;
  display: block;
  height: 15px;
  position: absolute;
  box-shadow: inset 1px 1px 2px hsla(0, 0%, 0%, 0.25),
    inset 0px 0px 2px hsla(0, 0%, 0%, 0.25);
  transition: all 0.15s ease-out;
  margin: 20px 0 0 0;
`;

const Ticks = styled.div`
  display: flex;
  justify-content: space-between;
  margin-right: 1rem;
  margin-left: 1rem;
`;

const Tick = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  justify-content: flex-end;
  width: 1px;
  background: ${blackColor};
  height: 5px;
  div {
    writing-mode: vertical-rl;
    margin-left: 0.4rem;
    margin-bottom: 0.5rem;
    white-space: nowrap;
  }
`;