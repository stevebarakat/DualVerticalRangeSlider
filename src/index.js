import React from 'react';
import ReactDOM from 'react-dom';
import DualRangeSlider from './DualRangeSlider';
import './global.css';

ReactDOM.render(
  <React.StrictMode>
    hello
    <DualRangeSlider min={235} max={1090} decimals={0} step={0} width="500px" primaryColor="hsl(196, 100%, 48%)" />
    hello
  </React.StrictMode>,
  document.getElementById('root')
);
