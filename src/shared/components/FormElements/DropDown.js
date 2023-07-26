import React, { useState, useEffect, useReducer } from "react";
import "./DropDown.css";

const DropDown = (props) => {
  const [selectedOption, setSelectedOption] = useState(props.defVal);
  const { selectChangeHandler } = props;

  const selectReducer = (state, action) => {
    switch (action.type) {
      case "CHANGE":
        return {
          ...state,
          value: action.val,
          isValid: true,
        };
    }
  };

  const [selectState, dispatch] = useReducer(selectReducer, {
    value: props.intialValue || '',
    isValid: props.intialValid || false
  });

  const {id, onSelect} = props;
  const {value, isValid} = selectState;

  useEffect(() => {
    onSelect(id, value, isValid)
  }, [id, value, isValid, onSelect])

  const changeHandler = (event) => {
    dispatch({
      type: "CHANGE",
      val: event.target.value
    });
  };

  // const selectHandler = (event) => {
  //   setSelectedOption(event.target.value);
  //   selectChangeHandler(event.target.value);
  // };

  return (
    <React.Fragment>
      <label
        htmlFor={props.id}
        className="drop-label"
        defaultValue={props.defVal}
      >
        {props.label}
      </label>
      <select
        className="drop-down"
        name={props.name}
        id={props.id}
        // value={selectedOption}
        // onChange={selectHandler}
        onChange={props.onChange || changeHandler}
        value={selectState.value}
      >
        {props.options.map((op, index) => (
          <option key={index} name={op} value={op}>
            {op}
          </option>
        ))}
      </select>
    </React.Fragment>
  );
};

export default DropDown;
