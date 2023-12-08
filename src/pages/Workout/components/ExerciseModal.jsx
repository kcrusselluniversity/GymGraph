import { useContext } from "react";
import SearchBar from "../../../components/ui/SearchBar";
import ExercisesAccordion from "./ExercisesAccordion";
import { exerciseModalContext } from "../../../context/exerciseModalContext";
import SearchResults from "./SearchResults";
import ExerciseDetails from "./ExerciseDetails";

/**
 * Exercise Modal component
 *
 * This component is the modal shown to the user when they want to add
 * an exercise to their Workout session. This is done to reduce nesting
 * too many ternary operators in the return statement of the ExerciseModal
 * component (which would make it hard to maintain and understand).
 */
const ExerciseModal = () => {
    const { exerciseModalState, searchInput, setSearchInput } =
        useContext(exerciseModalContext);

    // Determine which UI to render based on the current state of the modal
    let content;
    switch (exerciseModalState) {
        case "user_search":
            content = (
                <>
                    <SearchBar
                        placeholder="Search exercise"
                        state={{ searchInput, setSearchInput }}
                    />
                    <SearchResults input={searchInput} />
                </>
            );
            break;
        case "selected_exercise_info":
            content = <ExerciseDetails />;
            break;
        default:
            content = (
                <>
                    <SearchBar
                        placeholder="Search exercise"
                        state={{ searchInput, setSearchInput }}
                    />
                    <ExercisesAccordion />
                </>
            );
    }

    return <div className="ExerciseModal">{content}</div>;
};

export default ExerciseModal;
