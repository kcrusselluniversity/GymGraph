import exerciseList from "../data/exerciseList.json";

/**
 * Helper function to get the exercise object from the exerciseList JSON file
 * given the exercises unique identifier (uid).
 * @param {string} uid: The unique identifier of the exercise
 * @returns {object} exercise object associated with uid
 */
const getExerciseByUid = (uid) => {
    return exerciseList.find((exerciseObject) => exerciseObject.uid === uid);
};

export default getExerciseByUid;
