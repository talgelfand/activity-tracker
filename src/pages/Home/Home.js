import React from 'react'
import Heading from '../../components/Heading'
import WorkoutForm from '../../components/WorkoutForm'
import NavBar from '../../components/NavBar'
import PersonInformationForm from '../../components/PersonInformationForm'
import { auth } from '../../firebase/config'

const Home = () => {
  const currentUser = auth.currentUser

  return (
    <>
      <NavBar />
      <Heading />
      {!currentUser && <PersonInformationForm />}
      <WorkoutForm />
    </>
  )
}

export default Home
