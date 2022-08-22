import React, { useRef, useState } from 'react'
import Input from '../../UI/Input';
import classes from './MealItemForm.module.css';

const MealItemForm = (props) => {

  const amountInputRef = useRef()

  const[validAmount, setValidAmount] = useState(true)

  const submitHandler = event => {
    event.preventDefault();

    const enteredAmount = amountInputRef.current.value;
    const enteredNumber = +enteredAmount;

    if(
      enteredAmount.trim().length === 0 || 
      enteredNumber < 1 ||
      enteredNumber > 5
      ){
        setValidAmount(false)
        return;
      }

      //forwarding the onaddtocart function from the mealitem component
      props.onAddToCart(enteredNumber)
  };



  return (
    <form className={classes.form} onSubmit={submitHandler}>
        <Input 
          ref = {amountInputRef}
          label="Amount" input={{
              id: 'amount_' + props.id,
              type: 'number',
              max: '5',
              min: '1',
              step: '1',
              defaultValue: '1',
          }}
        />
        <button>+ Add</button>
        {!validAmount && <p>Please enter a valid amount(1-5)</p>}
    </form>
  )
}

export default MealItemForm