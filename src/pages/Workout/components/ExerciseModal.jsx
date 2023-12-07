import { useState } from "react";
import SearchBar from "../../../components/ui/SearchBar";
import ExercisesAccordion from "./ExercisesAccordion";
import SearchResults from "./SearchResults";

/**
 * exercise modal content function
 *
 * This function returns the correct component to render inside the exercise
 * modal depending on the relevent state.
 */
const exerciseModalContent = (searchInput) => {
    if (!searchInput) return <ExercisesAccordion />;

    return <SearchResults input={searchInput} />;
};

/**
 * Exercise Modal component
 *
 * This component is the modal shown to the user when they want to add
 * an exercise to their Workout session. This is done to reduce nesting
 * too many ternary operators in the return statement of the ExerciseModal
 * component (which would make it hard to maintain and understand).
 */
const ExerciseModal = () => {
    const [searchInput, setSearchInput] = useState("");

    const content = exerciseModalContent(searchInput);

    return (
        <div className="ExerciseModal">
            <SearchBar
                placeholder="Search exercise"
                name="exercise"
                state={{ searchInput, setSearchInput }}
            />
            {content}
        </div>
    );
};

export default ExerciseModal;
