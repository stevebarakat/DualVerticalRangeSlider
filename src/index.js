import React from "react";
import ReactDOM from "react-dom";
import DualVerticalRangeSlider from "./DualVerticalRangeSlider";
import "./global.css";

ReactDOM.render(
  <React.StrictMode>
    <div style={{ display: "flex", gap: "3rem" }}>
      <div
        style={{
          border: "1px solid grey",
          borderRadius: "8px",
          padding: "1rem",
          background: "lavender"
        }}
      >
        <DualVerticalRangeSlider
          min={0}
          max={100}
          step={5}
          ticks
          // decimals={2}
          height="800px"
          primaryColor="hsl(196, 100%, 48%)"
          primaryColor50="hsla(196, 100%, 48%, 0.5)"
          initiaUpperVal={70}
          initialLowerVal={30}
        />
      </div>
      <div
        style={{
          border: "1px solid grey",
          borderRadius: "8px",
          padding: "1rem",
          background: "lavender"
        }}
      >
        <DualVerticalRangeSlider
          min={-500}
          max={500}
          step={50}
          decimals={0}
          height="800px"
          primaryColor="hsl(196, 100%, 48%)"
          primaryColor50="hsla(196, 100%, 48%, 0.5)"
          initiaUpperVal={250}
          initialLowerVal={-250}
        />
      </div>
      <div
        style={{
          border: "1px solid grey",
          borderRadius: "8px",
          padding: "1rem",
          background: "lavender"
        }}
      >
        <DualVerticalRangeSlider
          min={0}
          max={200}
          step={10}
          decimals={2}
          height="800px"
          primaryColor="hsl(196, 100%, 48%)"
          primaryColor50="hsla(196, 100%, 48%, 0.5)"
          prefix="$"
          initiaUpperVal={160}
          initialLowerVal={40}
        />
      </div>
      <div
        style={{
          border: "1px solid grey",
          borderRadius: "8px",
          padding: "1rem",
          background: "lavender"
        }}
      >
        <DualVerticalRangeSlider
          min={0}
          max={500}
          step={25}
          decimals={0}
          height="800px"
          primaryColor="hsl(196, 100%, 48%)"
          primaryColor50="hsla(196, 100%, 48%, 0.5)"
          suffix="Gallons"
          initiaUpperVal={425}
          initialLowerVal={75}
        />
      </div>
    </div>
  </React.StrictMode>,
  document.getElementById("root")
);
