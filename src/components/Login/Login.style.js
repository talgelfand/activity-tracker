import styled, { css } from 'styled-components'
import { Link } from 'react-router-dom'

export const InnerBox = styled.div`
  min-width: 480px;
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

export const FooterButton = styled.button`
  outline: none;
  border: none;
  background-color: #556b2f;
  color: #fff;
  border-radius: 5px;
  font-weight: bold;
  font-size: 1rem;
  padding: 10px 16px;
  width: 100%;
  transition: 100ms;
  cursor: pointer;
  margin: auto;

  ${(props) =>
    props.disabled &&
    css`
      background-color: gray !important;
    `};

  &:hover {
    background-color: #8fbc8f;
  }
`

export const StyledLink = styled(Link)`
  font-weight: bold;
  color: #556b2f;
  letter-spacing: 1px;
  font-size: 1rem;
  text-decoration: none;
`
