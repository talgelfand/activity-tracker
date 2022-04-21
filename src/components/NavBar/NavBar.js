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
        <NavLink to='/login' activeStyle>
          Login
        </NavLink>
        <NavLink to='/signup'>SignUp</NavLink>
        {/* TODO: there's a logout function in firebase - can you implement please? */}
        <NavLink to='/' onClick={logOut()}>
          LogOut
        </NavLink>
      </Nav>
    </>
  )
}
export default NavBar
