import { API_URL } from '../../api'
import { formatApiResponse } from '../formatApiResponse'
import { validateExerciseData } from '../validateExerciseData'

export const getWorkoutData = (query, personParameters) => {
  if (query === '') throw new Error('Please enter a message')

  const exercisesData = {
    query,
    gender: personParameters.gender,
    weight_kg: personParameters.weight,
    height_cm: personParameters.height,
    age: personParameters.age,
  }

  const responseData = fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-app-id': process.env.REACT_APP_NUTRITIONIX_APP_ID,
      'x-app-key': process.env.REACT_APP_NUTRITIONIX_API_KEY,
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
