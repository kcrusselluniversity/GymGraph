import { NUM_EXERCISES_TO_DISPLAY } from "../../../data/constants";
/**
 * Get most recent exercises function
 *
 * The getMostRecentExercises function is designed to retrieve and return the
 * most recent exercises from a user's exercise history.
 * This function sorts exercises based on their start time in descending
 * order and returns a specified number of the most recent exercises.
 *
 * @param {Array of Objects} userHistory: An array containing the user's
 * exercise history. Each object in the array represents a workout session,
 * which includes a property exercises that is an object where each
 * key-value pair represents a unique exercise and its details.
 *
 * @returns {Array of Objects}: The function returns an array containing the
 * most recent exercises. Each object in the array includes the startTime,
 * uid (unique identifier), and name of the exercise.
 */

const getMostRecentExercises = (userHistory) => {
    const mostRecentExercises = [];

    // Iterates over user history sessions to compile a list of exercises
    userHistory
        .map((session) => session.exercises)
        .map((sessionExercises) => {
            Object.values(sessionExercises).forEach((exercise) => {
                const { startTime, uid, name } = exercise;
                mostRecentExercises.push({ startTime, uid, name });
            });
        });

    // Sort exercises by based on their start time, then filter out duplicate
    // values
    const sortedMostRecentExercises = mostRecentExercises
        .sort((ex1, ex2) => ex2.startTime.getTime() - ex1.startTime.getTime())
        .filter((exerciseObject, index, array) => {
            const { name } = exerciseObject;
            return (
                array.map((exObject) => exObject.name).indexOf(name) === index
            );
        });

    // Return most recent exercises
    return sortedMostRecentExercises.slice(0, NUM_EXERCISES_TO_DISPLAY);
};

export default getMostRecentExercises;
