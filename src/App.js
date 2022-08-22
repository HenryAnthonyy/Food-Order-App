import React, { useState } from 'react';
import './App.css';
import Cart from './components/Cart/Cart';
import Header from './components/Layout/Header';
import Meals from './components/Meals/Meals';
import CartProvider from './Context/CartProvider';

function App() {

  const [cartVisible, setCartVisible] = useState(false)

  const showCartHandler = () => {
    setCartVisible(true);
  }

  const hideCartHandler = () => {
    setCartVisible(false);
  }

  return (
    <CartProvider>
      <Header onShowCart={showCartHandler}/>
      {cartVisible && <Cart onClose={hideCartHandler}/>}
      <main>
        <Meals/>
      </main>
    </CartProvider>
  );
}

export default App;
