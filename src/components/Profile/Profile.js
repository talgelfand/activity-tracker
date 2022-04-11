import React from 'react'

import Heading from '../../components/Heading'
import WorkoutForm from '../../components/WorkoutForm/WorkoutForm'
import NavBars from '../NavBar/NavBar'

const Profile = (props) => {
  return (
    <>
      <NavBars></NavBars>
      <h4>{'Welcome ' + props.email}</h4>
      <Heading />
      <WorkoutForm />
    </>
  );
}

export default Profile