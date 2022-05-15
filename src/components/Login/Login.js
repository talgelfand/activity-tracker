import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { signInWithEmailAndPassword } from 'firebase/auth'
import NavBar from '../../components/NavBar'

import InputControl from '../InputControl/InputControl'
import { auth } from '../../firebase/config'

import { FooterButton, InnerBox, StyledLink, Footer , Container, Error} from './Login.style'

function Login() {
  const navigate = useNavigate()
  const [values, setValues] = useState({
    email: '',
    pass: '',
  })
  const [errorMsg, setErrorMsg] = useState('')
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false)

  const handleSubmission = () => {
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
        <InnerBox>
          <h1>Login</h1>
          <InputControl
            label='Email'
            onChange={(event) => setValues((prev) => ({ ...prev, email: event.target.value }))}
            placeholder='Enter email address'
          />
          <InputControl
            label='Password'
            type='password'
            onChange={(event) => setValues((prev) => ({ ...prev, pass: event.target.value }))}
            placeholder='Enter Password'
          />

          <Footer>
            <Error>{errorMsg}</Error>
            <FooterButton disabled={submitButtonDisabled} onClick={handleSubmission}>
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
      </Container>
    </>
  )
}

export default Login
