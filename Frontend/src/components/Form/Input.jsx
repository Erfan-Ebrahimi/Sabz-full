import { useReducer } from "react";

import "./Input.scss";

//---------------reducer for input
const inputReducer = (state, action) => {
  switch (action.type) {
    case 'CHANGE': {
      return {
        ...state,
        value: action.value,
        isValid: action.isValid
      }
    }

    default: {
      return state
    }
  }
}

const Input = (props) => {

  //steta for value & validation -> useReducer
  const [mainInput, dispatch] = useReducer(inputReducer, {
    value: '',
    isValid: false
  })

  const onChangeHandler = (e) => {
    dispatch({ type: 'CHANGE', value: e.target.value, isValid: true })
  }

  const element =
    props.element === "input" ? (
      <input
        type={props.type}
        placeholder={props.placeholder}
        className={`${props.className} ${mainInput.isValid ? 'success' : 'error'}`}
        onChange={onChangeHandler}
        value={mainInput.value}
      />
    ) : (
      <textarea
        placeholder={props.placeholder}
        className={`${props.className} ${mainInput.isValid ? 'success' : 'error'}`}
        onChange={onChangeHandler}
        value={mainInput.value}
      />
    );

  return <div>{element}</div>;
}

export default Input;