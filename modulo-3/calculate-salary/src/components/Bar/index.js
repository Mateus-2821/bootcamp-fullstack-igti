import React from 'react'

const Bar = props => <span style={
  {
    display: "inline-block",
    width: props.width+"%",
    height: "20px",
    backgroundColor: props.color
  }
}></span>

export default Bar