import { NavLink as Link } from 'react-router-dom'
import styled from 'styled-components'

export const Nav = styled.nav`
  background: #8fbc8f;
  height: 70px;
  display: flex;
  padding: 1rem;
  z-index: 10;
  justify-content: right;
`

export const NavLink = styled(Link)`
  color: #ffffff;
  display: flex;
  align-items: center;
  text-decoration: none;
  font-size: 20px;
  padding: 0 1rem;
  height: 100%;
  cursor: pointer;
  font-weight: 700;
  &.active {
    color: #2f4f4f;
  }
`

// https://github.com/briancodex/react-navbar-v3/tree/main/src/components/Navbar

// https://github.com/handyDev2/firebase-auth/blob/master/src/components/Home/Home.js
