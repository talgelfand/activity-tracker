import React from 'react'
import { Form } from 'react-bootstrap'
import { FormWrapper } from './PersonInformationForm.style'

const PersonInformationForm = ({onInfoChange}) => {
  const genders = ['Male', 'Female']

  const handleOnlyNumbers = (event) => {
    let number = event.target.value

    if (!Number(number)) {
        return
    }

    onInfoChange((prev) => ({ ...prev, [event.target.name]: number }))
  }
  
  return (
    <FormWrapper>
      <Form>
        <Form.Group className='mb-3'>
          <Form.Label>Gender</Form.Label>
          <Form.Select
            name='gender'
            defaultValue='Male'
            onChange={(event) => onInfoChange((prev) => ({ ...prev, gender: event.target.value }))}>
            {genders.map(option => (
              <option key={option}>{option}</option>
            ))}
          </Form.Select>
        </Form.Group>
        <Form.Group className='mb-3'>
          <Form.Label>Age</Form.Label>
          <Form.Control
            name='age'
            type='number'
            defaultValue={25}
            onChange={handleOnlyNumbers}
          />
        </Form.Group>
        <Form.Group className='mb-3'>
          <Form.Label>Height</Form.Label>
          <Form.Control
            name='height'
            type='number'
            defaultValue={175}
            onChange={handleOnlyNumbers}
          />
        </Form.Group>
        <Form.Group className='mb-3'>
          <Form.Label>Weight</Form.Label>
          <Form.Control
            name='weight'
            type='number'
            defaultValue={70}
            onChange={handleOnlyNumbers}
          />
        </Form.Group>
      </Form>
    </FormWrapper>
  )
}

export default PersonInformationForm
