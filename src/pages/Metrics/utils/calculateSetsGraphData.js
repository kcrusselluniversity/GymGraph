import formatDateObject from "../../../utils/formatDateObject";
import sortExerciseByStartTime from '../../Workout/utils/sortExerciseByStartTime';

const calculateSetsGraphData = (selectedExerciseData) => {
    return selectedExerciseData.sort(sortExerciseByStartTime).map((session) => {
        const { sets, startTime } = session;

        const date = formatDateObject(startTime);

        // Map each set to an object whose property is the set index
        // and value is the volume of that set (ie reps x weight)
        const volumePerSet = sets.map((set, index) => {
            const volume = set.reps * set.weight;
            return { [`set${index}`]: volume };
        });

        // Create a new session Object with date as a property
        const sessionObject = { date };

        // For each set in the session assign it to the new
        // session object
        Object.assign(sessionObject, ...volumePerSet);

        return sessionObject;
    });
};

export default calculateSetsGraphData;
