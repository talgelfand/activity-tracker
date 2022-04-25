import React from 'react'
import { Nav, NavLink } from './Navbar.style'
import { signOut } from 'firebase/auth'
import { auth } from '../../firebase/config'
import { toast } from 'react-toastify'

const NavBar = () => {
  const currentUser = auth.currentUser

  const toastConfig = {
    position: 'bottom-center',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  }

  const logOut = () => {
    signOut(auth)
      .then(() => {
        toast.success('You have logged out!', toastConfig)
      })
      .catch((error) => {
        toast.error('Sorry, an error occured', toastConfig)
        console.error(error)
      })
  }

  return (
    <>
      <Nav>
        <NavLink to='/'>Home</NavLink>
        {currentUser && <NavLink to='/statistics'>Statistics</NavLink>}
        {!currentUser && <NavLink to='/login' activeStyle>
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
