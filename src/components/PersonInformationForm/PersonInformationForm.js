import React from 'react'
import { Form } from 'react-bootstrap'
import { FormHeading, FormWrapper } from './PersonInformationForm.style'

const PersonInformationForm = ({ onChange }) => {
  const genders = [
    { name: 'Male', value: 'male' },
    { name: 'Female', value: 'female' },
  ]

  const handleChange = (event) => {
    onChange((prev) => ({ ...prev, [event.target.name]: event.target.value }))
  }

  return (
    <>
      <FormWrapper>
        <Form className='w-100'>
          <FormHeading className='d-block text-align-center'>Your parameters:</FormHeading>
          <Form.Group className='mb-3'>
            <Form.Label>Gender</Form.Label>
            <Form.Select name='gender' onChange={(event) => onChange((prev) => ({ ...prev, gender: event.target.value }))}>
              {genders.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Group className='mb-3'>
            <Form.Label>Age</Form.Label>
            <Form.Control name='age' placeholder={25} type='number' pattern='[0-9]' onChange={handleChange} />
          </Form.Group>
          <Form.Group className='mb-3'>
            <Form.Label>Height</Form.Label>
            <Form.Control name='height' placeholder={175} type='number' pattern='[0-9]' onChange={handleChange} />
          </Form.Group>
          <Form.Group className='mb-3'>
            <Form.Label>Weight</Form.Label>
            <Form.Control name='weight' placeholder={70} type='number' pattern='[0-9]' onChange={handleChange} />
          </Form.Group>
        </Form>
      </FormWrapper>
    </>
  )
}

export default PersonInformationForm
