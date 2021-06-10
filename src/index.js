import React from 'react';
import ReactDOM from 'react-dom';
import DualVerticalRangeSlider from './DualVerticalRangeSlider';
import './global.css';

ReactDOM.render(
  <React.StrictMode>
    <DualVerticalRangeSlider min={0}
      max={500}
      step={10}
      decimals={0}
      height="800px"
      primaryColor="hsl(196, 100%, 48%)"
      primaryColor50="hsla(196, 100%, 48%, 0.5)"
    />
  </React.StrictMode>,
  document.getElementById('root')
);
