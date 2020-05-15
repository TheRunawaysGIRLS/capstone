import React from 'react'

export const CheckBox = (props, index) => {
  return (
    <li>
      <input
        key={index}
        onClick={props.handleCheckChieldElement}
        type="checkbox"
        checked={props.isChecked}
        value={props.name}
      />{' '}
      {props.name}
    </li>
  )
}

export default CheckBox
