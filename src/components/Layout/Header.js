import React from 'react'

import mealsImage from '../../assets/meals.jpg';
import classes from './Header.module.css';
import HeaderCartButton from './HeaderCartButton';

const Header = (props) => {
  return (
    <React.Fragment>
        <header className={classes.header}>
            <h1>Meals Menu</h1>
            <span className={classes.cartBtn}>
              <HeaderCartButton onClick={props.onShowCart}/>
            </span>
            
        </header>
        <div className = {classes['main-image']}>
            <img src={mealsImage} alt="table of meals"/>
        </div>
    </React.Fragment>
  )
}

export default Header;