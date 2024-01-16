import { useContext } from "react";
import SearchBar from "../../../components/ui/SearchBar";
import ExercisesAccordion from "./ExercisesAccordion";
import { exerciseModalContext } from "../../../context/exerciseModalContext";
import SearchResults from "../../../components/ui/SearchResults";
import ExerciseDetails from "./ExerciseDetails";
import ExerciseSessionData from "./ExerciseSessionData";
import BackButton from "../../../components/ui/BackButton";
import RestTimer from "../../../components/ui/RestTimer";
import ExerciseNameItem from "./ExerciseNameItem";

/**
 * Exercise Modal component
 *
 * This component is the modal shown to the user when they want to add
 * an exercise to their Workout session. This is done to reduce nesting
 * too many ternary operators in the return statement of the ExerciseModal
 * component (which would make it hard to maintain and understand).
 */
const ExerciseModal = () => {
    const {
        exerciseModalState,
        setExerciseModalState,
        searchInput,
        setSearchInput,
    } = useContext(exerciseModalContext);

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
                    <SearchResults input={searchInput} RenderComponent={ExerciseNameItem}/>
                    {searchInput === "" && <ExercisesAccordion />}
                </>
            );
            break;
        case "selected_exercise_info":
            content = <ExerciseDetails />;
            break;
        case "exercise_session_data":
            content = <ExerciseSessionData />;
            break;
        case "rest_timer":
            content = (
                <div className="exerciseModal__restTimer">
                    <BackButton
                        handleBackArrowClick={() =>
                            setExerciseModalState("exercise_session_data")
                        }
                    />
                    <RestTimer />
                </div>
            );
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
