import React, { useState } from 'react'
import { Form } from 'react-bootstrap'
import { FormWrapper } from './PersonInformationForm.style'

const PersonInformationForm = () => {
  const [personInfo, setPersonInfo] = useState({
    gender: 'Male',
    age: 25,
    height: 175,
    weight: 70,
  })

  const genders = ['Male', 'Female']

  const handleOnlyNumbers = (input) => {
    let number = input.target.value
    console.log(number)

    if (!Number(number)) {
        return
    }
    setPersonInfo((prev) => ({ ...prev, [input.target.name]: number }))
  }
  
  return (
    <>
      <FormWrapper>
        <Form>
          <Form.Group className='mb-3'>
            <Form.Label>Gender</Form.Label>
            <Form.Select
              name = "gender"
              value={personInfo.gender}
              onChange={(event) => setPersonInfo((prev) => ({ ...prev, gender: event.target.value }))}>
              {genders.map(option => (
                <option key={option}>{option}</option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Group className='mb-3'>
            <Form.Label>Age</Form.Label>
            <Form.Control
              name = "age"
              type="number"
              value={personInfo.age}
              onChange={handleOnlyNumbers}
            />
          </Form.Group>
          <Form.Group className='mb-3'>
            <Form.Label>Height</Form.Label>
            <Form.Control
              name = "height"
              type="number"
              value={personInfo.height}
              onChange={handleOnlyNumbers}
            />
          </Form.Group>
          <Form.Group className='mb-3'>
            <Form.Label>Weight</Form.Label>
            <Form.Control
              name = "weight"
              type="number"
              value={personInfo.weight}
              onChange={handleOnlyNumbers}
            />
          </Form.Group>
        </Form>
      </FormWrapper>
    </>
  )
}

export default PersonInformationForm
