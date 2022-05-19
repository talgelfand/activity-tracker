import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { signInWithEmailAndPassword } from 'firebase/auth'
import NavBar from '../../components/NavBar'

import { auth } from '../../firebase/config'

import { FooterButton, InnerBox, StyledLink, Footer, Container, Error } from './Login.style'
import { Form } from 'react-bootstrap'

function Login() {
  const navigate = useNavigate()
  const [values, setValues] = useState({
    email: '',
    pass: '',
  })
  const [errorMsg, setErrorMsg] = useState('')
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false)

  const handleSubmit = () => {
    if (!values.email || !values.pass) {
      setErrorMsg('Fill all fields')
      return
    }
    setErrorMsg('')

    setSubmitButtonDisabled(true)
    signInWithEmailAndPassword(auth, values.email, values.pass)
      .then(async () => {
        setSubmitButtonDisabled(false)

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
    <>
      <NavBar />
      <Container>
        <Form onSubmit={handleSubmit}>
          <InnerBox>
            <h1>Login</h1>
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
                placeholder='Enter password'
                onChange={(event) => setValues((prev) => ({ ...prev, pass: event.target.value }))}
              />
            </Form.Group>
            <Footer>
              <Error>{errorMsg}</Error>
              <FooterButton disabled={submitButtonDisabled} onClick={handleSubmit}>
                Login
              </FooterButton>
              <p>
                Don't have an account?{' '}
                <span>
                  <StyledLink to='/signup'>Sign up</StyledLink>
                </span>
              </p>
            </Footer>
          </InnerBox>
        </Form>
      </Container>
    </>
  )
}

export default Login
