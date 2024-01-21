import formatDateObject from "../../../utils/formatDateObject";

/**
 * Calculate session set volume average function
 *
 * This JavaScript function calculates the exercise volume averaged over the
 * number of sets for each session within a given array of selectedExerciseData.
 *
 * To enable fair and meaningful comparisons between different workout sessions,
 * we calculate the average volume across the number of sets performed.
 * This approach ensures that the total volume isn't disproportionately
 * influenced by the quantity of sets completed. By averaging in this way,
 * we obtain a more accurate reflection of the user's actual strength and
 * performance for the given exercise, rather than merely measuring their
 * endurance or capacity for multiple sets.
 *
 * The exercise volume for a session is determined by multiplying the number
 * of repetitions (reps) with the weight (weight) for each set within
 * that session, and then summing up these values.
 *
 * @param {Array of Object} selectedExerciseData: An array of session data objects,
 * where each session data object should have the following properties:
 *      startTime (Date Object): The date and time when the session started.
 *      sets (Array): An array of sets within the session, where each set
 *                    should have the following properties:
 *              reps (Number): The number of repetitions performed in the set.
 *              weight (Number): The weight lifted in the set.
 * @returns {Array of Objects}: An array of objects representing the
 * exercise volume data for each session.
 * Each object has the following properties:
 *      date (Date Object): The date and time when the session started.
 *      value (Number): The average exercise volume per set for that session.
 */
const calculateSessionSetVolumeAvg = (selectedExerciseData) => {
    const exerciseVolumeDataArray = selectedExerciseData.map((sessionData) => {
        const { sets, startTime } = sessionData;
        const formattedStartTime = formatDateObject(startTime);

        const volume = sets
            .map((set) => set.reps * set.weight)
            .reduce((acc, val) => acc + val, 0);

        const averageVolumePerSet = (volume / sets.length).toFixed(1);

        return { date: formattedStartTime, value: averageVolumePerSet };
    });

    return exerciseVolumeDataArray;
};

export default calculateSessionSetVolumeAvg;
