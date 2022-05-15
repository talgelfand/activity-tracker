import React from 'react'
import { Card, ListGroup } from 'react-bootstrap'

const WorkoutResult = ({ name, duration, calories }) => {
  return (
    <div className='d-flex justify-content-center mt-3 mb-5'>
      <Card style={{ width: '25rem' }}>
        <ListGroup variant='flush'>
          <ListGroup.Item className='d-flex'>
            <p>
              <strong>Type of workout:</strong> {name}
            </p>
          </ListGroup.Item>
          <ListGroup.Item className='d-flex'>
            <p>
              <strong>Duration:</strong> {duration} minutes
            </p>
          </ListGroup.Item>
          <ListGroup.Item className='d-flex'>
            <p>
              <strong>Calories burnt:</strong> {calories}
            </p>
          </ListGroup.Item>
        </ListGroup>
      </Card>
    </div>
  )
}

export default WorkoutResult
