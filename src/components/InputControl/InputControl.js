import React from 'react'
import { Container, Label, Input } from './InputControl.style'

const InputControl = (props) => {
  return (
    <Container>
      {props.label && <Label>{props.label}</Label>}
      <Input type='text' {...props} />
    </Container>
  )
}

export default InputControl
