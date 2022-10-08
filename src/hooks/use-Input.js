import React, { useReducer } from 'react'

const initialInputState = {
    value: '',
    entryMade: false,
}

const inputStateReducer = (state, action) => {

    if(action.type === 'INPUT'){
        return {
            value: action.value,
            entryMade: state.entryMade
        }
    }
    if(action.type === 'BLUR'){
        return {
            entryMade: true,
            value: state.value
        }
    }

    return initialInputState
};


const useInput = (validatedValue) => {

    const[inputState, dispatch] = useReducer(inputStateReducer, initialInputState);

    const valueIsValid = validatedValue(inputState.value);
    const hasError = !valueIsValid && inputState.entryMade;

    const inputChangeHandler = (event) => {
        dispatch({type: 'INPUT', value: event.target.value});
    };

    const inputBlurChangeHandler = () => {
        dispatch({type: 'BLUR'});
    };



  return {
    value: inputState.value,
    isValid: valueIsValid,
    hasError,
    inputChangeHandler,
    inputBlurChangeHandler
  }
}

export default useInput