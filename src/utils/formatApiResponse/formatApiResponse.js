export const formatApiResponse = (exercises) => {
  return exercises.map((exercise) => {
    return {
      duration: exercise.duration_min,
      calories: exercise.nf_calories,
      name: exercise.name,
    }
  })
}
