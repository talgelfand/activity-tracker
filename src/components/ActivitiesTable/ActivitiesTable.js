import React, { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap'
import { auth } from '../../firebase/config'
import fetchUserFromDatabase from '../../firebase/utils/fetchUserFromDatabase'
import { TableWrapper } from './ActivitiesTable.style'

const ActivitiesTable = () => {
  const currentUser = auth.currentUser

  const [activities, setActivities] = useState([])

  useEffect(() => {
    fetchUserFromDatabase(currentUser.email).then((res) => {
      const activitiesFromDatabase = []

      res.activities.forEach((activity) => {
        activitiesFromDatabase.push(activity)
      })

      setActivities(activitiesFromDatabase)
    })
  }, [])

  return (
    <TableWrapper>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Date</th>
            <th>Type of activity</th>
            <th>Duration (min)</th>
            <th>Calories burnt</th>
          </tr>
        </thead>
        <tbody>
          {activities.map((activity, index) => {
            const { currentDate, name, duration, calories } = activity

            return (
              <tr key={index}>
                <td>{currentDate}</td>
                <td>{name}</td>
                <td>{duration}</td>
                <td>{calories}</td>
              </tr>
            )
          })}
        </tbody>
      </Table>
    </TableWrapper>
  )
}

export default ActivitiesTable
