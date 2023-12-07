import { EXERCISE_GROUPS } from "../../../data/constants";
import exerciseList from "../../../data/exerciseList.json";
import ExerciseNameItem from "../components/ExerciseNameItem";

/**
 * exerciseGroupList
 *
 * This function takes in a exercise group (such as arms or legs)
 * and returns an array of JSX objects displaying each exercise.
 *
 * @param {string} exerciseGroup
 */
const exerciseGroupList = (exerciseGroup) => {
    if (!EXERCISE_GROUPS.includes(exerciseGroup)) return null;

    // Filter the exercise list to get only the exercises associated with the
    // given muscle group
    const exerciseObjectList = exerciseList.filter((exercise) => {
        return exercise.muscleGroup === exerciseGroup;
    });

    // Sort the list of exercise objects alphabetically based on the exercise name
    exerciseObjectList.sort((exerciseA, exerciseB) => {
        if (exerciseA.exercise < exerciseB.exercise) {
            return -1;
        } else if (exerciseA.exercise > exerciseB.exercise) {
            return 1;
        }
        return 0;
    });

    // Map each exercise string to a component
    const exerciseComponentArray = exerciseObjectList.map((exerciseObject) => {
        const { uid, exercise } = exerciseObject;
        return <ExerciseNameItem key={uid} uid={uid} exerciseName={exercise} />;
    });

    return exerciseComponentArray;
};

export default exerciseGroupList;
