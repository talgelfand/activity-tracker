import React, { useEffect, useState } from 'react'
import { Button, Form, Spinner } from 'react-bootstrap'
import { toast } from 'react-toastify'
import { FormWrapper } from './WorkoutForm.style'
import { getWorkoutData } from '../../utils/getWorkoutData'
import addActivityToDatabase from '../../firebase/utils/addActivityToDatabase'
import fetchUserFromDatabase from '../../firebase/utils/fetchUserFromDatabase'
import { auth } from '../../firebase/config'
import WorkoutResult from '../WorkoutResult'
import PersonInformationForm from '../PersonInformationForm'
import { calculateUsersAge } from '../../utils/calculateUsersAge/calculateUsersAge'

const WorkoutForm = () => {
  const currentUser = auth.currentUser

  const [personInfo, setPersonInfo] = useState({
    gender: 'male',
    age: 25,
    height: 175,
    weight: 70,
  })

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

      getWorkoutData(inputValue, personInfo).then((res) => {
        setWorkoutData(res[0])

        if (currentUser) {
          addActivityToDatabase(currentUser.email, res[0])
            .then(() => {
              toast.success('Activity was registered', toastConfig)
            })
            .catch((error) => {
              toast.error('Sorry, an error occured', toastConfig)
              console.error(error)
            })
        }
      })
      setError(false)
      setLoading(false)
    } catch (error) {
      setError(true)
      console.error(error)
      setLoading(false)
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    fetchDataFromAPI()
    setInputValue('')
  }

  useEffect(() => {
    if (currentUser) {
      fetchUserFromDatabase(currentUser.email)
        .then((res) => {
          return res
        })
        .then((data) => {
          const usersAge = calculateUsersAge(data.dateOfBirth.toDate())

          setPersonInfo({
            gender: data.gender,
            age: usersAge,
            height: data.height,
            weight: data.weight,
          })
        })
    }
  }, [])

  return (
    <>
      {!currentUser && <PersonInformationForm onChange={setPersonInfo} />}

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
