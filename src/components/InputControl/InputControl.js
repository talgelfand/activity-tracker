// TODO: not sure this component is neede - might as well be replaced with Bootstrap component
import React from 'react'

import styles from './InputControl.module.css'

function InputControl(props) {
  return (
    <div className={styles.container}>
      {props.label && <label>{props.label}</label>}
      <input type="text" {...props} />
    </div>
  )
}

export default InputControl
