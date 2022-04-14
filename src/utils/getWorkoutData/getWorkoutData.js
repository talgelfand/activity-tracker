import { API_KEY, API_URL, APP_ID } from '../../api'
import { formatApiResponse } from '../formatApiResponse'
import { validateExerciseData } from '../validateExerciseData'

export const getWorkoutData = (query) => {
  if (query === '') throw new Error('Please enter a message')

  // Temporarily hardcoded
  // TODO: replace with variables
  const exercisesData = {
    query,
    gender: 'female',
    weight_kg: 72.5,
    height_cm: 167.64,
    age: 30,
  }

  const responseData = fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-app-id': APP_ID,
      'x-app-key': API_KEY,
    },
    body: JSON.stringify(exercisesData),
  })
    .then((res) => {
      return res.json()
    })
    .then((data) => {
      if (validateExerciseData(query, data.exercises)) {
        return formatApiResponse(data.exercises)
      }
      return 'Seems like you entered incorrect activity'
    })

  return responseData
}
