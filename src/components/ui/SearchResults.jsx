import exerciseList from "../../data/exerciseList.json";
import { string, elementType, func } from "prop-types";

/**
 * SearchResults component
 *
 * This component filters the exerciseList JSON object and displays only the
 * exercises that match the users search input.
 *
 * @param {string} {input}: User provided search input.
 * @param {elementType} {RenderComponent}: Component used to render each item.
 * @param {function} {exerciseClickHandler}: Callback function to execute
 * when the user clicks on a matching exercise.
 * @returns {array}: Array of JSX UI components displaying each matching exercise.
 */
const SearchResults = ({ input, RenderComponent, exerciseClickHandler }) => {
    // Convert input to lower case
    input = input.toLowerCase();

    // Return null if there is no input
    if (input === "") return null;

    const matchingExercises = exerciseList
        .filter((exerciseObject) =>
            exerciseObject.exercise.toLowerCase().includes(input)
        )
        .map((object) => (
            <RenderComponent
                key={object.uid}
                uid={object.uid}
                exerciseName={object.exercise}
                onClick={() => exerciseClickHandler(object)}
            />
        ));

    return <div className="searchResults">{matchingExercises}</div>;
};

SearchResults.propTypes = {
    input: string,
    RenderComponent: elementType.isRequired,
    exerciseClickHandler: func,
};

export default SearchResults;
