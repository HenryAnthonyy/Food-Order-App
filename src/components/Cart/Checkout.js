import React from 'react'
import useInput from '../../hooks/use-Input';


import './Checkout.css';

const Checkout = (props) => {

    const {
        value: name,
        isValid: nameIsValid,
        hasError: nameHasError,
        inputChangeHandler: nameInput,
        inputBlurChangeHandler: nameInputBlur
    } = useInput(value => value.trim() !== '')

    const {
        value: contact,
        isValid: contactIsValid,
        hasError: contactHasError,
        inputChangeHandler: contactInput,
        inputBlurChangeHandler: contactInputBlur
    } = useInput(value => value.length === 11)

    const {
        value: building,
        isValid: buildingIsValid,
        hasError: buildingHasError,
        inputChangeHandler: buildingInput,
        inputBlurChangeHandler: buildingInputBlur
    } = useInput(value => value.trim() !== '')

    const {
        value: room,
        isValid: roomIsValid,
        hasError: roomHasError,
        inputChangeHandler: roomInput,
        inputBlurChangeHandler: roomInputBlur
    } = useInput(value => value.trim() !== '')

    const checkoutSubmitHandler = (event) => {
        event.preventDefault();



        console.log('Name:',name, 'Building:', building, 'Room:', room)

        props.onConfirmOrder({
            name: name,
            buildingNumber: building,
            roomNumber: room
        })
    };

    const nameClasses = !nameIsValid && nameHasError ? 'control invalid' : 'control';
    const buildingClasses = !buildingIsValid && buildingHasError ? 'control invalid' : 'control';
    const roomClasses = !roomIsValid && roomHasError ? 'control invalid' : 'control';
    const contactClasses = !contactIsValid && contactHasError ? 'control invalid' : 'control';

    let formIsValid = false;

    if(nameIsValid && buildingIsValid && roomIsValid && contactIsValid){
        formIsValid = true;
    }

  return (
    <form onSubmit={checkoutSubmitHandler} className='form'>
        <h1>Address And Contact</h1>
        <div className='control'>
            <div className='Name-Contact'>
                <div className={nameClasses}>
                    <label htmlFor='name'>Name</label>
                    <input 
                        id='name'
                        type='text'
                        value={name}
                        onChange={nameInput}
                        onBlur={nameInputBlur}
                    />
                    {nameHasError && <p>Name cannot be empty</p>}
                </div>
                <div className={contactClasses}>
                    <label htmlFor='contact'>Contact</label>
                    <input 
                        id='contact'
                        type='text'
                        value={contact}
                        onChange={contactInput}
                        onBlur={contactInputBlur}
                    />
                    {contactHasError && <p>Contact is Invalid</p>}
                </div>
            </div>
            <div className='address'>
            <div className={buildingClasses}>
                <label htmlFor='building' >Building</label>
                <input 
                    id='building'
                    type='number' 
                    min='14' 
                    max='17'
                    value={building}
                    onChange={buildingInput}
                    onBlur={buildingInputBlur}
                />
                {buildingHasError && <p>Building number cannot be empty</p>}
            </div>
            <div className={roomClasses}>
                <label htmlFor='room'>Room</label>
                <input 
                    id='room'
                    type='number' 
                    min='101' 
                    max='615'
                    value={room}
                    onChange={roomInput}
                    onBlur={roomInputBlur}
                />
                {roomHasError && <p>Room cannot be empty</p>}
            </div>
            </div>
        </div>

        <div className='actions'>
            <button type='button' onClick={props.onCancel}>Cancel</button>
            <button type='submit' className='submit' disabled={!formIsValid}>Confirm</button>
        </div>
    </form>

    
  )
}

export default Checkout