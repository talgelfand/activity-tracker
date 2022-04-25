import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`

export const Label = styled.div`
  font-weight: 700;
  font-size: 1rem;
  color: #313131;
`

export const Input = styled.input`
  border-radius: 5px;
  border: 1px solid #dddddd;
  outline: none;
  padding: 10px 15px;
  color: #000;
  &:hover {
    border-color: #ccc;
    outline: 1px solid green;
  }
`


