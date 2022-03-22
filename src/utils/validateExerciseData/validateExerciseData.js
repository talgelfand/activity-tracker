export const validateExerciseData = (inputValue, exercise) => {
    if (exercise[0] === undefined) {
        return false
    }

    const exerciseName = exercise[0].name;
    const wordArray = inputValue.split(' ');

    if (wordArray.indexOf(exerciseName) !== -1) {  
        return true
    }
    
    return false
}