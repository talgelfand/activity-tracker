import React from 'react'

import Heading from '../../components/Heading'
import WorkoutForm from '../../components/WorkoutForm/WorkoutForm'
import NavBar from '../NavBar'

const Profile = (props) => {
  return (
    <>
      <NavBar />
      <h4>{props.email ? `Welcome - ${props.email}` : 'Login please'}</h4>
      <Heading />
      <WorkoutForm />
    </>
  )
}

export default Profile
