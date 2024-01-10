/**
 * compileDayExercises
 * 
 * @param {array} sessionObjects
 * 
 * This utility function takes in an array of session objects from the same
 * day and combines them into a single object to represent all exercises
 * completed on that day
 */
const compileDayExercises = (sessionObjects) => {
    // Compile all exercises for that day into a single exercise object
    const compiledSessionsExercises = {};

    // Loop over each exercise in each session and add it to the
    // compiled days exercises. If the exercise has already been added,
    // add the additional sets to that property.
    sessionObjects.map((session) => {
        Object.values(session["exercises"]).map((exercise) => {
            const { uid, sets } = exercise;

            if (uid in compiledSessionsExercises) {
                // Add sets to existing sets array
                compiledSessionsExercises[uid].sets.push(...sets);
            } else {
                // Add exercise data to object
                compiledSessionsExercises[uid] = exercise;
            }
        });
    });

    // Use the first timestamp to represent the start time
    const startTime = sessionObjects[0]["startTime"];

    return {
        startTime: startTime,
        exercises: compiledSessionsExercises,
    };
};

export default compileDayExercises;
