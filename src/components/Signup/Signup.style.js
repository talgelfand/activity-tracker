import styled from 'styled-components'
import { Form } from 'react-bootstrap'

export const FormWrapper = styled(Form)`
  height: 100%;
  min-height: 100vh;
  width: 100%;
  background: linear-gradient(to right, #556b2f, #8fbc8f);
  display: flex;
  justify-content: center;
  align-items: center;

  label {
    font-weight: 700;
    font-size: 1rem;
    color: #313131;
  }

  input {
    width: 100%;
    border-radius: 5px;
    border: 1px solid #dddddd;
    outline: none;
    padding: 10px 15px;
    color: #000;
  }

  input:hover {
    border-color: #ccc;
  }
`

export const InnerBox = styled.div`
  min-width: 780px;
  height: fit-content;
  width: fit-content;
  background-color: #fff;
  box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.2);
  padding: 30px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  gap: 30px;
`

export const Footer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;

  button {
    outline: none;
    border: none;
    background-color: #556b2f;
    color: #fff;
    border-radius: 5px;
    font-weight: bold;
    font-size: 1rem;
    padding: 10px 16px;
    width: 80%;
    transition: 100ms;
    cursor: pointer;
    margin: auto;
  }

  button:disabled {
    background-color: gray !important;
  }

  button:hover {
    background-color: #8fbc8f;
  }

  p {
    font-weight: 700;
    color: #000;
  }

  p span a {
    font-weight: bold;
    color: #556b2f;
    letter-spacing: 1px;
    font-size: 1rem;
    text-decoration: none;
  }
`

export const Error = styled.div`
  font-weight: bold;
  font-size: 0.875rem;
  color: #ff3300;
  text-align: left;
`