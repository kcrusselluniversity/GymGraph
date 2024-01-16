/**
 * Tally muscle group sets function
 *
 * tallyMuscleGroupSets is a utility function designed to process a user's
 * exercise history and calculate the total number of sets performed for each
 * muscle group. It returns an array of objects, each representing a muscle
 * group and its corresponding total set count.
 *
 * @param {Array of Objects} userHistory: An array representing the user's
 * exercise history. Each object in this array should represent an exercise
 * session, and is expected to have an exercises property, which is an array
 * of exercise objects. Each exercise object should have a muscleGroup property
 * (string) and a sets property (array).
 *
 * @returns {Array of Objects}: Returns an array where each object contains
 * two properties:
 *      @param {String} muscleGroup: The name of the muscle group.
 *      @param {Number} value: The total number of sets performed for that
 *      muscle group across all sessions.
 */
const tallyMuscleGroupSets = (userHistory) => {
    const muscleGroupSetTally = {};
    const sessionsData = userHistory.map((session) => session.exercises);
    sessionsData.forEach((session) => {
        // Loop through each exercise and add the set count to the
        // corresponding muscleGroup property of the muscleGroupTally
        // object
        Object.values(session).forEach((exercise) => {
            const { muscleGroup, sets } = exercise;
            const setCount = sets.length;
            const currentTally = muscleGroupSetTally[muscleGroup];

            // Add the set count for this exercise to the tally object
            muscleGroupSetTally[muscleGroup] =
                currentTally === undefined ? setCount : currentTally + setCount;
        });
    });

    const muscleGroupSetsArray = Object.keys(muscleGroupSetTally).map(
        (muscleGroup) => {
            return {
                muscleGroup,
                value: muscleGroupSetTally[muscleGroup],
            };
        }
    );

    return muscleGroupSetsArray;
};

export default tallyMuscleGroupSets;
