import React, { useState } from 'react'
import styles from './Signup.module.css'
import { Link, useNavigate } from 'react-router-dom'

import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { auth } from '../../firebase'

import InputControl from '../InputControl/InputControl'

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

  const handleSubmission = () => {
    if (
      !values.email ||
      !values.pass ||
      !values.gender ||
      !values.date ||
      !values.height ||
      !values.weight
    ) {
      setErrorMsg('NB! FILL ALL FIELDS PLEASE')
      return
    }
    setErrorMsg('')

    setSubmitButtonDisabled(true)
    createUserWithEmailAndPassword(auth, values.email, values.pass)
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
  }

  return (
    <div className={styles.container}>
      <div className={styles.innerBox}>
        <h1 className={styles.heading}>Sign up</h1>

        <InputControl
          label="Email"
          placeholder="Enter email address"
          onChange={(event) =>
            setValues((prev) => ({ ...prev, email: event.target.value }))
          }
        />
        {/* TODO: should have the type set to "password" */}
        <InputControl
          label="Password"
          placeholder="Enter Password"
          onChange={(event) =>
            setValues((prev) => ({ ...prev, pass: event.target.value }))
          }
        />
        <br></br>
        {/* TODO: I would suggest we make it select input */}
        <InputControl
          label="Gender"
          placeholder="Enter your gender"
          onChange={(event) =>
            setValues((prev) => ({ ...prev, gender: event.target.value }))
          }
        />
        {/* TODO: I would suggest we make it calendar input */}
        <InputControl
          label="Birth date"
          placeholder="Enter your birth date"
          onChange={(event) =>
            setValues((prev) => ({ ...prev, date: event.target.value }))
          }
        />
        {/* TODO: please add a placeholder */}
        <InputControl
          label="Height"
          placeholder="Enter your height"
          onChange={(event) =>
            setValues((prev) => ({ ...prev, height: event.target.value }))
          }
        />
        {/* TODO: please add a placeholder */}
        <InputControl
          label="Weight"
          placeholder="Enter your weight"
          onChange={(event) =>
            setValues((prev) => ({ ...prev, weight: event.target.value }))
          }
        />
        <div className={styles.footer}>
          <b className={styles.error}>{errorMsg}</b>
          <button onClick={handleSubmission} disabled={submitButtonDisabled}>
            Sign up
          </button>
          <p>
            Already have an account?{' '}
            <span>
              <Link to="/Login">Log in</Link>
            </span>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Signup
