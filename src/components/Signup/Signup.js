import React, { useState } from 'react'
import styles from './Signup.module.css'
import { Link, useNavigate } from 'react-router-dom'

import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { auth } from '../../firebase/config'
import addUserToDatabase from '../../firebase/utils/addUserToDatabase'

import InputControl from '../InputControl/InputControl'
import { FormControl, FormGroup, FormLabel, FormSelect } from 'react-bootstrap'

function Signup() {
  const navigate = useNavigate()
  const [values, setValues] = useState({
    email: '',
    pass: '',
    gender: '',
    date: '',
    height: '',
    weight: '',
  })
  const [errorMsg, setErrorMsg] = useState('')
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false)

  const handleSubmission = async () => {
    if (!values.email || !values.pass || !values.gender || !values.date || !values.height || !values.weight) {
      setErrorMsg('NB! FILL ALL FIELDS PLEASE')
      return
    }
    setErrorMsg('')

    setSubmitButtonDisabled(true)
    await createUserWithEmailAndPassword(auth, values.email, values.pass)
      .then(async (res) => {
        setSubmitButtonDisabled(false)
        const user = res.user
        await updateProfile(user, {
          displayName: values.email,
        })
        navigate('/profile')
      })
      .catch((err) => {
        setSubmitButtonDisabled(false)
        if ((err.message = 'Firebase: Error (auth/invalid-email).')) {
          setErrorMsg('Entered credentials are invalid!')
        }
      })

    // Create a new document in the database (Firebase)
    addUserToDatabase(values.email)
      .then(() => {
        console.log('User added to the database')
      })
      .catch((error) => {
        console.error(error)
      })
  }

  return (
    <div className={styles.container}>
      <div className={styles.innerBox}>
        <h1 className={styles.heading}>Sign up</h1>

        {/* WIP */}
        <FormGroup>
          <FormLabel>Email</FormLabel>
          <FormControl
            placeholder='Enter email address'
            onChange={(event) => setValues((prev) => ({ ...prev, email: event.target.value }))}
          />
        </FormGroup>

        <FormGroup>
          <FormLabel>Password</FormLabel>
          <FormControl
            placeholder='Enter your password'
            type='password'
            onChange={(event) => setValues((prev) => ({ ...prev, pass: event.target.value }))}
          />
        </FormGroup>

        <hr />

        <FormGroup>
          <FormLabel>Gender</FormLabel>
          <FormSelect onChange={(event) => setValues((prev) => ({ ...prev, gender: event.target.value }))}>
            <option value='male'>Male</option>
            <option value='female'>Female</option>
          </FormSelect>
        </FormGroup>

        {/* TODO: I would suggest we make it calendar input */}
        <InputControl
          label='Birth date'
          placeholder='Enter your birth date'
          onChange={(event) => setValues((prev) => ({ ...prev, date: event.target.value }))}
        />

        <FormGroup>
          <FormLabel>Height</FormLabel>
          <FormControl
            placeholder='185'
            type='number'
            onChange={(event) => setValues((prev) => ({ ...prev, height: event.target.value }))}
          />
        </FormGroup>

        <FormGroup>
          <FormLabel>Weight</FormLabel>
          <FormControl
            placeholder='80'
            type='number'
            onChange={(event) => setValues((prev) => ({ ...prev, weight: event.target.value }))}
          />
        </FormGroup>

        <div className={styles.footer}>
          <b className={styles.error}>{errorMsg}</b>
          <button onClick={handleSubmission} disabled={submitButtonDisabled}>
            Sign up
          </button>
          <p>
            Already have an account?{' '}
            <span>
              <Link to='/Login'>Log in</Link>
            </span>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Signup
