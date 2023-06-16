import { useEffect, useReducer } from "react";
import validator from "../../validators/validator";

import "./Input.scss";

//---------------reducer for input
const inputReducer = (state, action) => {
  switch (action.type) {
    case 'CHANGE': {
      return {
        ...state,
        value: action.value,
        isValid: validator(action.value, action.validations)  // mire be samt function validator v ya true barmigarde ya false => isValid:true or false
      }
    }

    default: {
      return state
    }
  }
}

const Input = (props) => {
  console.log(props.validations);

  //steta for value & validations -> useReducer
  const [mainInput, dispatch] = useReducer(inputReducer, {
    value: '',
    isValid: false
  })

  //---------for useForm
    //---------destructuring
  const { value, isValid } = mainInput;
  const {id, onInputHandler} = props;
  
  
  useEffect(() => {
    onInputHandler(id, value, isValid)
  }, [value])

  const onChangeHandler = (e) => {
    dispatch({
      type: 'CHANGE',
      value: e.target.value,               //ino az chiziy k karbar type kard migirim v be onvane vorodye aval validatoir()
      isValid: true,
      validations: props.validations       //ino az props (Login.jsx or Register.jsx) migirim v be case CHANGE mifrestim be onvane vorodye dovom validator()
    })
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