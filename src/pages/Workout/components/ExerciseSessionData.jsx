import { Button } from "@mui/material";
import { GREY_STYLE_BUTTON } from "../../../data/constants";
import { exerciseModalContext } from "../../../context/exerciseModalContext";
import { useContext } from "react";
import ExerciseSessionTable from "./ExerciseSessionTable";
import BackButton from "../../../components/ui/BackButton";

/**
 * Exercise Session Data component
 *
 * When the user selects an exercise from the database of exercises, this
 * component renders inside the exercise modal to allow the user to add
 * the information on their current workouts weight, reps and sets for the
 * selected exercise.
 */
const ExerciseSessionData = () => {
    const {
        exerciseAdded,
        setExerciseModalState,
        searchInput,
        isExerciseItemSelected,
        setIsExerciseItemSelected,
        setIsExerciseModalOpen,
        setExerciseAdded,
        setSelectedExerciseInfo,
    } = useContext(exerciseModalContext);
    const { exercise: name } = exerciseAdded;

    const handleExerciseDetailsBtnClick = () => {
        setExerciseModalState("selected_exercise_info");
    };

    const handleRestTimerBtnClick = () => {
        setExerciseModalState("rest_timer");
    };

    const handleBackArrowClick = () => {
        if (isExerciseItemSelected) {
            // Set the state to default and close the modal
            setIsExerciseModalOpen(false);
            setIsExerciseItemSelected(false);
        } else {
            const newState = searchInput ? "user_search" : "default";
            setExerciseModalState(newState);
            setExerciseAdded(null);
            setSelectedExerciseInfo(null);
        }
    };

    return (
        <div className="exerciseSessionData">
            <BackButton handleBackArrowClick={handleBackArrowClick} />
            <h2 style={{ textAlign: "center" }}>{name}</h2>
            <ExerciseSessionTable />
            <div className="sessionLinks">
                <Button
                    onClick={handleExerciseDetailsBtnClick}
                    sx={GREY_STYLE_BUTTON}
                >
                    Exercise Details
                </Button>
                <Button
                    onClick={handleRestTimerBtnClick}
                    sx={GREY_STYLE_BUTTON}
                >
                    Rest Timer
                </Button>
            </div>
        </div>
    );
};

export default ExerciseSessionData;
