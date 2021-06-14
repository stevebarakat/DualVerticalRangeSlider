import React from 'react';
import ReactDOM from 'react-dom';
import DualVerticalRangeSlider from './DualVerticalRangeSlider';
import './global.css';

ReactDOM.render(
  <React.StrictMode>
    <div style={{ display: 'flex' }}>
      <DualVerticalRangeSlider 
        min={0}
        max={500}
        step={10}
        decimals={0}
        height="800px"
        primaryColor="hsl(196, 100%, 48%)"
        primaryColor50="hsla(196, 100%, 48%, 0.5)"
      />
      <DualVerticalRangeSlider 
        min={-500}
        max={500}
        step={50}
        decimals={0}
        height="800px"
        primaryColor="hsl(196, 100%, 48%)"
        primaryColor50="hsla(196, 100%, 48%, 0.5)"
      />
      <DualVerticalRangeSlider 
        min={0}
        max={50000000000}
        step={1000000000}
        decimals={0}
        height="800px"
        primaryColor="hsl(196, 100%, 48%)"
        primaryColor50="hsla(196, 100%, 48%, 0.5)"
        prefix="$"
      />
      <DualVerticalRangeSlider 
        min={0}
        max={500}
        step={10}
        decimals={0}
        height="800px"
        primaryColor="hsl(196, 100%, 48%)"
        primaryColor50="hsla(196, 100%, 48%, 0.5)"
        suffix="Gallons"
      />
    </div>
  </React.StrictMode>,
  document.getElementById('root')
);
