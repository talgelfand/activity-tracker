import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { FormWrapper } from './WorkoutForm.style'
import { getWorkoutData } from '../../utils/getWorkoutData'

const WorkoutForm = () => {
  const [workoutData, setWorkoutData] = useState([])
  const [inputValue, setInputValue] = useState('')
  const [error, setError] = useState(false)

  const fetchDataFromAPI = () => {
    try {
      getWorkoutData(inputValue).then((res) => {
        setWorkoutData(res)
      })
      setError(false)
    } catch (e) {
      setError(true)
      console.error(e)
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    fetchDataFromAPI()
  }

  return (
    <>
      <FormWrapper>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Enter a short workout description</Form.Label>
            <Form.Control
              placeholder="Ran for 30 minutes"
              onChange={(event) => setInputValue(event.target.value)}
              isInvalid={error}
            />
            <Form.Control.Feedback type="invalid" className="mt-2">
              Please enter a workout description.
            </Form.Control.Feedback>
          </Form.Group>
          <Button
            variant="primary"
            type="submit"
            className="mt-3"
            onSubmit={handleSubmit}
          >
            Submit
          </Button>
        </Form>
      </FormWrapper>
      <div className="mt-5" style={{ textAlign: 'center' }}>
        <h2>Data from API (temporary displayed here)</h2>
        <p>{JSON.stringify(workoutData)}</p>
      </div>
    </>
  )
}

export default WorkoutForm
