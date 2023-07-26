import React, { useEffect, useState, useReducer } from "react";
import "./ToggleSwitch.css";

const ToggleSwitch = (props) => {
  const [toggleVal, setToggleVal] = useState("off");
  const { changeToggleValue } = props;

  useEffect(() => {
    if (props.on) {
    const toggle = document.getElementById('toggle-switch');
      if (props.on === true) {
        setToggleVal("on");
        toggle.checked=true
      } else {
        setToggleVal("off");
        toggle.checked=false
      }
    }
  }, []);
  
  const toggleHandler = (event) => {
    let newVal = "";
    if (toggleVal === "off") {
      newVal = "on";
    } else {
      newVal = "off";
    }
    setToggleVal(newVal);
    changeToggleValue(newVal);
  };

  return (
    <React.Fragment>
        <div className="label">{props.label}</div>
      <label className="switch">
        <input
          type="checkbox"
          id="toggle-switch"
          onChange={toggleHandler}
          value={toggleVal}
        ></input>
        <span className="slider round"></span>
      </label>
    </React.Fragment>
  );
};
export default ToggleSwitch;
