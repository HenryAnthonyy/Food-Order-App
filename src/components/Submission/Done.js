import React, { useEffect, useRef } from 'react'
import Lottie from 'lottie-web'
import './Done.css'


const Done = () => {

    const animation = useRef(null)

    useEffect(() => {
        console.log('i am running');
        
        //used the timer to animation so that i can add a cleanup function to prevent another instance of the animation runnning
        const identifier = setTimeout(() => {
            Lottie.loadAnimation({
                container: animation.current,
                renderer: 'svg',
                loop: false,
                animationData: require('../../assets/done-animation.json')
            })
        }, 500);


        return () => {
            clearTimeout(identifier);
            console.log('cleanup')
        };
        
    },[animation]);

    // const animationHandler = () => {
    //     Lottie.loadAnimation({
    //         container: animation,
    //         // renderer: 'svg',
    //         loop: false,
    //         animationData: require('../../assets/done-animation.json')
    //     })
    // }

  return (
    <div className='container'>
        <div className='animation' ref={animation}></div>
        <h1>Done</h1>
    </div>
  )
}

export default Done