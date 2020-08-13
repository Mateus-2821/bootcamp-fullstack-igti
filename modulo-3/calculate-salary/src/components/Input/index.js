import React from 'react'

import './style.css'

const Input = props => (
  <label>
    <span>{props.text}</span>
    <input type="number" {...props} onChange={props.handleChange} />
  </label>
)


export default Input