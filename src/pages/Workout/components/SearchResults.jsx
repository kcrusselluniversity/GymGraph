import exerciseList from "../../../data/exerciseList.json";
import ExerciseNameItem from "./ExerciseNameItem";
import { string } from "prop-types";

/**
 * SearchResults component
 *
 * This component filters the exerciseList JSON object and displays only the
 * exercises that match the users search input.
 *
 * @param {string} {input}: User provided search input
 * @returns {array}: Array of JSX UI components displaying each matching exercise
 */
const SearchResults = ({ input }) => {
    // Convert input to lower case
    input = input.toLowerCase();

    const matchingExercises = exerciseList
        .filter((exerciseObject) =>
            exerciseObject.exercise.toLowerCase().includes(input)
        )
        .map((object) => (
            <ExerciseNameItem key={object.uid} exerciseName={object.exercise} />
        ));

    return <>{matchingExercises}</>;
};

SearchResults.propTypes = {
    input: string,
};

export default SearchResults;
