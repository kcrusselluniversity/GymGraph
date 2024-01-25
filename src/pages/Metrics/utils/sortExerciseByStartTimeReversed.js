/**
 * This function is used by the Array.sort method as its callback function
 * to sort two exercises within a workout session based on the start time.
 */
const sortExerciseByStartTimeReversed = (exerciseA, exerciseB) => {
    const DateExerciseA = new Date(exerciseA.startTime);
    const DateExerciseB = new Date(exerciseB.startTime);
    return DateExerciseB.getTime() - DateExerciseA.getTime();
};

export default sortExerciseByStartTimeReversed;
