import dayjs from "dayjs";
import formatDateObject from "../../../utils/formatDateObject";

const calculateSessionsVolumeData = (userHistory) => {
    const sessionsVolumeData = [];

    // Loop over each session, and add up the total weight lifted for each
    // exercise of that session. Then add an object representing the
    // start time of that session, along with the total volume (weight
    // lifted) for that session to the sessionsData array.
    userHistory.map((session) => {
        const { startTime } = session;

        // Loop over each exercise and calculate the total weight
        // lifted for that exercise
        const { exercises } = session;
        const TotalWeightPerExercise = Object.values(exercises).map(
            (exercise) => {
                const totalWeightLiftedForExercise = exercise.sets
                    .map((set) => set.weight * set.reps)
                    .reduce((val, prev) => val + prev, 0);

                return totalWeightLiftedForExercise;
            }
        );

        const TotalWeightForSession = TotalWeightPerExercise.reduce(
            (val, prev) => val + prev,
            0
        );

        // Format startTime for use in the graph X axis
        let startTimeFormatted = formatDateObject(startTime);

        const sessionVolumeData = {
            date: startTimeFormatted,
            value: TotalWeightForSession,
        };

        // Add session volume data object to sessions volume array
        sessionsVolumeData.push(sessionVolumeData);
    });

    return sessionsVolumeData;
};

export default calculateSessionsVolumeData;
