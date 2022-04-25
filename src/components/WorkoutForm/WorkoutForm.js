import React, { useState } from 'react'
import { Button, Form, Spinner } from 'react-bootstrap'
import { toast } from 'react-toastify'
import { FormWrapper } from './WorkoutForm.style'
import { getWorkoutData } from '../../utils/getWorkoutData'
import addActivityToDatabase from '../../firebase/utils/addActivityToDatabase'
import { auth } from '../../firebase/config'
import WorkoutResult from '../WorkoutResult'

const WorkoutForm = () => {
  const currentUser = auth.currentUser

  const [loading, setLoading] = useState(false)
  const [workoutData, setWorkoutData] = useState()
  const [inputValue, setInputValue] = useState('')
  const [error, setError] = useState(false)

  const toastConfig = {
    position: 'bottom-center',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  }

  const fetchDataFromAPI = () => {
    try {
      setLoading(true)

      getWorkoutData(inputValue).then((res) => {
        setWorkoutData(res[0])

        addActivityToDatabase(currentUser.email, res[0])
          .then(() => {
            toast.success('Activity was registered', toastConfig)
            setLoading(false)
          })
          .catch((error) => {
            toast.error('Sorry, an error occured', toastConfig)
            console.error(error)
            setLoading(false)
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
    setInputValue('')
  }

  return (
    <>
      <FormWrapper>
        <Form onSubmit={handleSubmit}>
          <Form.Group className='mb-3' controlId='workoutForm'>
            <Form.Label>Enter a short workout description</Form.Label>
            <Form.Control
              value={inputValue}
              placeholder='Running for 30 minutes'
              onChange={(event) => setInputValue(event.target.value)}
              isInvalid={error}
            />
            <Form.Control.Feedback type='invalid' className='mt-2'>
              Please enter a workout description.
            </Form.Control.Feedback>
          </Form.Group>
          <Button variant='success' type='submit' className='mt-3' onSubmit={handleSubmit}>
            Submit
          </Button>
        </Form>
      </FormWrapper>

      {loading ? (
        <Spinner animation='border' variant='secondary' className='d-block mx-auto mt-5' />
      ) : (
        workoutData && <WorkoutResult {...workoutData} />
      )}
    </>
  )
}

export default WorkoutForm
