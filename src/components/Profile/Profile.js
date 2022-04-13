import React from 'react'

import Heading from '../../components/Heading'
import WorkoutForm from '../../components/WorkoutForm/WorkoutForm'
import NavBars from '../NavBar/NavBar'

const Profile = (props) => {
  return (
    <>
      <NavBars></NavBars>
      <h4>{props.email ? `Welcome - ${props.email}` : 'Login please'}</h4>
      <Heading />
      <WorkoutForm />
    </>
  )
}

export default Profile
