import React from 'react'
import { ClipLoader } from 'react-spinners'
import './submit.css'

const Submit = () => {
  return (
    <div className='spinner'>
        <h2>Submitting..</h2>
        <ClipLoader color="#d92e45" size={50}/>
    </div>
    
  )
}

export default Submit