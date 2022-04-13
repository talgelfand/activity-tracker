import React from 'react'

import Heading from '../Heading'
import NavBar from '../NavBar'
import ChartForm from '../ChartForm'
import { StatisticsContainer } from './Statistics.style'

const Statistics = (props) => {
  return (
    <>
      <NavBar />
      <Heading />
      <StatisticsContainer>
        <ChartForm />
      </StatisticsContainer>
    </>
  )
}

export default Statistics
