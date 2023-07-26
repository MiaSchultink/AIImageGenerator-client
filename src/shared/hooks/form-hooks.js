import { useCallback, useReducer } from "react";

const formReducer = (state, action) => {
  let formIsValid = true;
  switch (action.type) {
    case "INPUT_CHANGE":
      for (const inputId in state.inputs) {
        if (!state.inputs[inputId]) {
          continue;
        }
        if (inputId === action.inputId) {
          formIsValid = formIsValid && action.isValid;
        } else {
          formIsValid = formIsValid && state.inputs[inputId].isValid;
        }
      }
      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.inputId]: { value: action.value, isValid: action.isValid },
        },
        isValid: formIsValid,
      };
    case "SELECT_CHANGE":
      formIsValid = true;
      for (const selectId in state.selects) {
        if (!state.selects[selectId]) {
          continue;
        }
        if (selectId === action.selectId) {
          formIsValid = formIsValid && action.isValid;
        } else {
          formIsValid = formIsValid && state.selects[selectId].isValid;
        }
      }
      return {
        ...state,
        selects: {
          ...state.selects,
          [action.selectId]: { value: action.value, isValid: action.isValid },
        },
        isValid: formIsValid,
      };
    case "SET_DATA":
      return {
        inputs: action.inputs,
        isValid: action.isValid,
        selects: action.selects,
      };
    default:
      return state;
  }
};

export const useForm = (initialInputs, initialFormValidity, initialSelects) => {
  const [formState, dispatch] = useReducer(formReducer, {
    inputs: initialInputs,
    selects: initialSelects,
    isValid: initialFormValidity,
  });

  const inputHandler = useCallback((id, value, isValid) => {
    console.log(value)
    dispatch({
      type: "INPUT_CHANGE",
      value: value,
      isValid: isValid,
      inputId: id,
    });
  }, []);

  const selectHandler = useCallback((id, value, isValid) => {
    dispatch({
      type: "SELECT_CHANGE",
      value: value,
      isValid: isValid,
      selectId: id,
    });
  }, []);

  const setFormData = useCallback((inputData, formValidity, selectData) => {
    dispatch({
      type: "SET_DATA",
      inputs: inputData,
      selects: selectData,
      formIsValid: formValidity,
    });
  }, []);

  return [formState, inputHandler, setFormData, selectHandler];
};
