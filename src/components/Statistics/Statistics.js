import React from 'react'

import NavBar from '../NavBar'
import ActivitiesChart from '../ActivitiesChart'
import ActivitiesTable from '../ActivitiesTable'
import { Tab, Tabs } from 'react-bootstrap'

const Statistics = () => {
  return (
    <>
      <NavBar />
      <Tabs defaultActiveKey='chart' id='statistics-tabs' className='mb-3 mt-3 justify-content-center'>
        <Tab eventKey='chart' title='Chart'>
          <ActivitiesChart />
        </Tab>
        <Tab eventKey='table' title='Table'>
          <ActivitiesTable />
        </Tab>
      </Tabs>
    </>
  )
}

export default Statistics
