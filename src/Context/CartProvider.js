import React, { useReducer } from 'react'
import CartContext from './CartContext'

const defaultCartState = {
    items: [],
    totalAmount: 0,
}

const cartReducer = (state, action) => {

    if(action.type === 'ADD_CART_ITEM')
    {

        //findIndex finds the index of the item in an existing array
        const existingCartItemIndex = state.items.findIndex(item => item.id === action.item.id);

        const existingCartItem = state.items[existingCartItemIndex];

        let updatedItems;

        //if the item exists in the cart
        if(existingCartItem){
            const updatedItem = {
                ...existingCartItem,
                amount: existingCartItem.amount + action.item.amount
            };
            updatedItems = [...state.items]
            updatedItems[existingCartItemIndex] = updatedItem;
        }
        else{
            updatedItems = state.items.concat(action.item);
        }

        const updatedTotalAmount = state.totalAmount + (action.item.price * action.item.amount)

        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount,
        }
    }

    if(action.type === 'REMOVE_CART_ITEM')
    {
        const existingCartItemIndex = state.items.findIndex((item) => item.id === action.id);

        const existingCartItem = state.items[existingCartItemIndex];
        const cartTotalAmount = state.totalAmount - existingCartItem.price;

        let updatedItems;

        if(existingCartItem.amount === 1){
            updatedItems = state.items.filter(item => item.id !== action.id)
        }
        else{

            //the item to be reduced
            const updatedItem = {...existingCartItem, amount: existingCartItem.amount - 1};

            //all the items that remain
            updatedItems = [...state.items];

            //replacing the item index whose amount is to be reduced with the new amount
            updatedItems[existingCartItemIndex] = updatedItem;
        }

        return {
            items: updatedItems,
            totalAmount: cartTotalAmount 
        };
    }

    return defaultCartState;
} 


const CartProvider = (props) => {

    const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState)

    const addItemToCartHandler = (item) => {
        dispatchCartAction({type: 'ADD_CART_ITEM', item: item})
    };

    const removeItemFromCartHandler = (id) => {
        dispatchCartAction({type: 'REMOVE_CART_ITEM', id: id})
    };

    const cartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemToCartHandler,
        removeItem: removeItemFromCartHandler,
    };

  return (
    <CartContext.Provider value={cartContext}>
        {props.children}
    </CartContext.Provider>
  )
}

export default CartProvider