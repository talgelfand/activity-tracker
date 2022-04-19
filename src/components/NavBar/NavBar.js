import React from 'react'
import { Nav, NavLink } from './Navbar.style'

const NavBar = (props) => {
  return (
    <>
      <Nav>
        <NavLink to='/'>Home</NavLink>
        <NavLink to='/statistics'>Statistics</NavLink>
        <NavLink to='/login' activeStyle>Login</NavLink>
        <NavLink to='/signup'>SignUp</NavLink>
        {/* TODO: there's a logout function in firebase - can you implement please? */}
        <NavLink to='/login'>LogOut</NavLink>
      </Nav>
    </>
  )
}
export default NavBar
