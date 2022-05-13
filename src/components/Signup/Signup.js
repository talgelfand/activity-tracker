import React, { useState } from 'react'
import { FooterButton, InnerBox, StyledLink, Footer, Container, Error } from './Signup.style'
import { useNavigate } from 'react-router-dom'
import NavBar from '../../components/NavBar'

import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { auth } from '../../firebase/config'
import addUserToDatabase from '../../firebase/utils/addUserToDatabase'

import InputControl from '../InputControl/InputControl'
import { Form } from 'react-bootstrap'

function Signup(onChange) {
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

        // Create a new document in the database (Firebase)
        addUserToDatabase(values.email, values.gender, values.height, values.weight, values.date)
          .then(() => {
            console.log('User added to the database')
          })
          .catch((error) => {
            console.error(error)
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

  const genders = [
    { name: 'Male', value: 'male' },
    { name: 'Female', value: 'female' },
  ]

  const handleChange = (event) => {
    onChange((prev) => ({ ...prev, [event.target.name]: event.target.value }))
  }

  return (
    <>
      <NavBar />
      <Container>
        <InnerBox>
          <h1>Sign up</h1>
          <InputControl
            label='Email'
            placeholder='Enter email address'
            onChange={(event) => setValues((prev) => ({ ...prev, email: event.target.value }))}
          />
          <InputControl
            label='Password'
            type='password'
            placeholder='Enter Password'
            onChange={(event) => setValues((prev) => ({ ...prev, pass: event.target.value }))}
          />

          <InputControl
            label='Gender'
            placeholder='Enter your gender'
            onChange={(event) => setValues((prev) => ({ ...prev, gender: event.target.value }))}
          />
          {/* TODO: I would suggest we make it calendar input */}
          <InputControl
            label='Birth date'
            placeholder='Enter your birth date'
            onChange={(event) => setValues((prev) => ({ ...prev, date: event.target.value }))}
          />
          <InputControl
            label='Height'
            placeholder='185'
            onChange={(event) => setValues((prev) => ({ ...prev, height: event.target.value }))}
          />
          <InputControl
            label='Weight'
            placeholder='80'
            onChange={(event) => setValues((prev) => ({ ...prev, weight: event.target.value }))}
          />
          <Footer>
            <Error>{errorMsg}</Error>
            <FooterButton onClick={handleSubmission} disabled={submitButtonDisabled}>
              Sign up
            </FooterButton>
            <p>
              Already have an account?{' '}
              <span>
                <StyledLink to='/Login'>Log in</StyledLink>
              </span>
            </p>
          </Footer>
        </InnerBox>
      </Container>
    </>
  )
}

export default Signup
