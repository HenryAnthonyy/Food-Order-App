import React, { useContext, useState } from 'react'
import CartContext from '../../Context/CartContext'
import Done from '../Submission/Done'
import Submit from '../Submission/Submit'
import Modal from '../UI/Modal'
import classes from './Cart.module.css'
import CartItem from './CartItem'
import Checkout from './Checkout'

const Cart = (props) => {

    const[orderMade, setOrderMade] = useState(false);
    const[isSubmitting, setIsSubmitting] = useState(false);
    const[submitted, setSubmitted] = useState(false);

    const cartCtx = useContext(CartContext)
    const hasItems = cartCtx.items.length > 0
   
    const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;

    const cartItemRemoveHandler = id => {
        cartCtx.removeItem(id);
    };

    const cartItemAddHandler = item => {
        cartCtx.addItem({...item, amount:1})
    };


    // setTimeout = (() => {
    //     const loadingSpinner = <Submit/>
    // }, []);

    
    

    //submittig ordered items
    const submitHandler = async(userData) => {
        setIsSubmitting(true)
        await fetch('https://foodorderapp-a2b94-default-rtdb.firebaseio.com/orders.json', {
            method: 'POST',
            body: JSON.stringify({
                user: userData,
                orderedItems: cartCtx.items
            }),
        })
        setIsSubmitting(false);
        setSubmitted(true);
        cartCtx.clearCart();
    };

    const cartItems = <ul className={classes['cart-items']}>
        {cartCtx.items.map(
            (item) => (
                <CartItem
                    key={item.id}
                    id={item.id}
                    name={item.name}
                    amount={item.amount}
                    price={item.price}
                    onRemove={cartItemRemoveHandler.bind(null, item.id)}
                    onAdd={cartItemAddHandler.bind(null, item)}
                />
            )
        )}
    </ul>

    const showCheckOut = () => {
        setOrderMade(true);
    }

    const hideCheckOut = () => {
        setOrderMade(false);
    }

    const modalActions = (<div className={classes.actions}>
    <button className={classes['button--alt']} onClick={props.onClose}>close</button>
    {hasItems && <button className={classes.button} onClick={showCheckOut}>order</button>}
    </div>)

    

    const cartContent = <React.Fragment>
        {cartItems}

        <div className={classes.total}>
            <span>Total Amount</span>
            <span>{totalAmount}</span>
        </div>

        {!orderMade && modalActions}

        {orderMade && <Checkout onConfirmOrder={submitHandler} onCancel={hideCheckOut}/>}
    </React.Fragment>

    // const EnteraddressScreen = <React.Fragment>{orderMade && <Checkout onConfirmOrder={submitHandler} onCancel={hideCheckOut}/>}</React.Fragment>

    
    

  return (
    <Modal onClose={props.onClose}>
        {!isSubmitting && !submitted && cartContent}
        {isSubmitting && <Submit/>}
        {submitted && <Done/>}
        
    </Modal>
  )
}

export default Cart