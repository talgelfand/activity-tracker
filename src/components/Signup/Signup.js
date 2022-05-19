import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FooterButton, InnerBox, StyledLink, Footer, Container, Error } from './Signup.style'
import NavBar from '../../components/NavBar'

import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { auth } from '../../firebase/config'
import addUserToDatabase from '../../firebase/utils/addUserToDatabase'

import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

import { Form } from 'react-bootstrap'

const Signup = () => {
  const navigate = useNavigate()
  const [values, setValues] = useState({
    email: '',
    pass: '',
    gender: '',
    dateOfBirth: '',
    height: '',
    weight: '',
  })
  const [errorMsg, setErrorMsg] = useState('')
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false)

  const handleSubmit = async () => {
    console.log(values)

    if (!values.email || !values.pass || !values.gender || !values.dateOfBirth || !values.height || !values.weight) {
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
        addUserToDatabase(values)
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

  return (
    <>
      <NavBar />
      <Container>
        <Form onSubmit={handleSubmit}>
          <InnerBox>
            <h1>Sign up</h1>
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control
                placeholder='Enter email address'
                onChange={(event) => setValues((prev) => ({ ...prev, email: event.target.value }))}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type='password'
                placeholder='Enter Password'
                onChange={(event) => setValues((prev) => ({ ...prev, pass: event.target.value }))}
              />
            </Form.Group>
            <hr />
            <Form.Group>
              <Form.Label>Gender</Form.Label>
              <Form.Select onChange={(event) => setValues((prev) => ({ ...prev, gender: event.target.value }))}>
                <option selected disabled hidden>
                  Choose your gender
                </option>
                {genders.map((option) => (
                  <option key={option.name}>{option.name}</option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group>
              <Form.Label>Date of birth</Form.Label>
              <DatePicker
                showMonthDropdown
                showYearDropdown
                dropdownMode='select'
                dateFormat='dd/MM/yyyy'
                placeholderText='Enter your date of birth'
                calendarStartDay={1}
                selected={values.dateOfBirth}
                onChange={(date) => setValues((prev) => ({ ...prev, dateOfBirth: date }))}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Height</Form.Label>
              <Form.Control placeholder='185' onChange={(event) => setValues((prev) => ({ ...prev, height: event.target.value }))} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Weight</Form.Label>
              <Form.Control placeholder='80' onChange={(event) => setValues((prev) => ({ ...prev, weight: event.target.value }))} />
            </Form.Group>
            <Footer>
              <Error>{errorMsg}</Error>
              <FooterButton onClick={handleSubmit} disabled={submitButtonDisabled}>
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
        </Form>
      </Container>
    </>
  )
}

export default Signup
