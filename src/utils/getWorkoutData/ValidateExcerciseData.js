export const validateExcerciseData = (inputValue, exercise) => {
    const exerciseName = exercise[0].name;
    const wordArray = inputValue.split(' ');

    if (wordArray.indexOf(exerciseName) !== -1) {  
        return true
    }
    
    return false
}