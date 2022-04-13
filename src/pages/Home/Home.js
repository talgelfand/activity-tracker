import React from 'react';
import Heading from '../../components/Heading'
import WorkoutForm from '../../components/WorkoutForm/WorkoutForm'
import NavBars from '../../components/NavBar/NavBar';

function Home () {

  return (
    <>
      <NavBars />
      <Heading />
      <WorkoutForm />
    </>
  );
}

export default Home
