import React from 'react'

import './style.css'

const Output = props => (
  <label>
    <span>{props.text}</span>
    <output>{props.format} {props.value} {props.percent}</output>
  </label>
)

export default Output