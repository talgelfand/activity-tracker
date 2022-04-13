import React from 'react'

import Heading from '../Heading'
import NavBars from '../NavBar/NavBar'
import ChartForm from '../ChartForm/ChartForm'
import { StatisticsContainer } from './Statistics.style'

const Statistics = (props) => {
  return (
    <>
      <NavBars></NavBars>
      <Heading />
      <StatisticsContainer>
        <ChartForm />
      </StatisticsContainer>
    </>
  )
}

export default Statistics
