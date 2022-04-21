import React from 'react'
import { Nav, NavLink } from './Navbar.style'
import { signOut } from 'firebase/auth'
import { auth } from '../../firebase/config'

const NavBar = () => {
  const currentUser = auth.currentUser

  const logOut = () => {
    signOut(auth)
      .then(() => {
        console.log('success logOut')
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return (
    <>
      <Nav>
        <NavLink to='/'>Home</NavLink>
        {currentUser && <NavLink to='/statistics'>Statistics</NavLink>}
        {!currentUser &&<NavLink to='/login' activeStyle>
          Login
        </NavLink>}
        {!currentUser && <NavLink to='/signup'>SignUp</NavLink>}
        {currentUser && <NavLink to='/' onClick={logOut}>
          LogOut
        </NavLink>}
      </Nav>
    </>
  )
}
export default NavBar
