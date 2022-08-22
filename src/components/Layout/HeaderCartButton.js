import React, { useContext, useEffect, useState } from 'react'
import CartContext from '../../Context/CartContext';
import CartIcon from '../Cart/CartIcon'
import classes from './HeaderCartButton.module.css';

const HeaderCartButton = (props) => {

  const[animateCartBtn, setAnimateCartBtn] = useState(false)

  const cartCtx = useContext(CartContext);

  //use array destructuring to pull out the items from cartCtx
  const { items } = cartCtx;

  //reduce function transforms an array of values into a single value
  const numberOfitems = items.reduce((currentNo, item) => {

    return currentNo + item.amount
    
  }, 0);

  const cartBtnClasses = `${classes.button} ${animateCartBtn ? classes.bump : ''}`;
  
  //items should be used as a dependency instead of cartCtx to prevent the useEffect from re-evaluating the state whenever anything changes about the cart context

  useEffect(() => {

    //if no items in the cart, do not play the animation
    if(items.length === 0){
      return;
    }

    // play animation after first item is added
    setAnimateCartBtn(true)

    //clear the animation function after 300ms so that it can be played again after the next item is added
    const timer = setTimeout(() => {
      setAnimateCartBtn(false)
    }, 300);

    //clean up function to prevent rapid animation if the add button is rapidly pressed
    return () => {
      clearTimeout(timer)
    };
      
  }, [items])

  return (
    <button className = {cartBtnClasses} onClick={props.onClick}>
        <span className={classes.icon}>
            <CartIcon/>
        </span>
        <span>My Cart</span>
        <span className={classes.badge}>{numberOfitems}</span>
    </button>
  )
}

export default HeaderCartButton