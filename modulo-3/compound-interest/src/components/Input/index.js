import React from 'react'

import './style.css'

const Input = ({label, value, handleChange}) => (
  <label className='inputComponent'>
    <span>{label}</span>
    <input type="number" value={value} onChange={handleChange}></input>
  </label>
)

export default Input