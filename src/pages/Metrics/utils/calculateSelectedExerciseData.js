/**
 * Calculate selected exercise data function
 *
 * This function is designed to extract and structure historical data
 * for a specific exercise from a user's exercise history. It filters
 * and processes a user's exercise sessions to retrieve information related
 * to a selected exercise, specifically the sets performed and the start
 * time of each session containing that exercise.
 * @param {object} selectedExercise: An object representing the exercise of
 * interest. This object must contain at least the uid property, which
 * uniquely identifies the exercise.
 * @param {Array of Objects} userHistory: An array of session objects.
 * Each session object contains an exercises property, which is an object
 * where keys are exercise UIDs and values are objects containing details
 * about the exercise in that session.
 * @returns {Array}: An array of objects, each representing a session
 * where the selected exercise was performed.
 * Each object includes the following properties:
 *      sets: The details of the sets performed for the selected exercise in
 *            that session.
 *       startTime: The start time of the session in which the selected
 *                  exercise was performed.
 */
const calculateSelectedExerciseData = (selectedExercise, userHistory) => {
    const { uid: selectedExerciseUid } = selectedExercise;

    // Get each exercises array from each session
    const exercisesHistory = userHistory.map((session) => session.exercises);

    // Filter each session for the selected exercise, then map each
    // session that includes the selected exercise to an object with
    // just the sets and startTime for the selected exercise
    const selectedExerciseHistory = exercisesHistory
        .filter((exercises) => {
            return Object.keys(exercises).includes(selectedExerciseUid);
        })
        .map((exerciseArray) => {
            const selectedExerciseSessionInfo =
                exerciseArray[selectedExerciseUid];
            const { sets, startTime } = selectedExerciseSessionInfo;
            return { sets, startTime };
        });

    return selectedExerciseHistory;
};

export default calculateSelectedExerciseData;
