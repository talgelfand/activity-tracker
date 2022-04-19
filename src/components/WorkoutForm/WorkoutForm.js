import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { FormWrapper } from './WorkoutForm.style'
import { getWorkoutData } from '../../utils/getWorkoutData'
import addActivityToDatabase from '../../firebase/utils/addActivityToDatabase/addActivityToDatabase'
import { auth } from '../../firebase/config'

const WorkoutForm = () => {
  const currentUser = auth.currentUser

  const [workoutData, setWorkoutData] = useState([])
  const [inputValue, setInputValue] = useState('')
  const [error, setError] = useState(false)

  const fetchDataFromAPI = () => {
    try {
      getWorkoutData(inputValue).then((res) => {
        setWorkoutData(res[0])

        addActivityToDatabase(currentUser.email, res[0])
          .then(() => {
            console.log('Activity added to the database')
          })
          .catch((error) => {
            console.error(error)
          })
      })
      setError(false)
    } catch (error) {
      setError(true)
      console.error(error)
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
          <Form.Group className='mb-3' controlId='formBasicEmail'>
            <Form.Label>Enter a short workout description</Form.Label>
            <Form.Control placeholder='Running for 30 minutes' onChange={(event) => setInputValue(event.target.value)} isInvalid={error} />
            <Form.Control.Feedback type='invalid' className='mt-2'>
              Please enter a workout description.
            </Form.Control.Feedback>
          </Form.Group>
          <Button variant='primary' type='submit' className='mt-3' onSubmit={handleSubmit}>
            Submit
          </Button>
        </Form>
      </FormWrapper>
    </>
  )
}

export default WorkoutForm
