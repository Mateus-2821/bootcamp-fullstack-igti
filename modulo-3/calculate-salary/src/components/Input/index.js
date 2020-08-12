import React from 'react'

import './style.css'

const Input = props => (
  <label>
    <span>{props.text}</span>
    <input type="number" {...props} onChange={props.handleChange} autofocus/>
  </label>
)


export default Input