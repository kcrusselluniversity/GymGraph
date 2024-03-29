import { useContext, useState } from "react";
import { exerciseModalContext } from "../../../context/appContext";
import getExerciseByUid from "../../../utils/getExerciseByUid";
import {
    GREY_STYLE_BUTTON,
    EXERCISE_GIF_URL_ENDPOINT,
} from "../../../data/constants";
import BackIcon from "../../../assets/icons/Back_Icon.svg";
import BackButton from "../../../components/ui/BackButton";
import GifContainer from "../../../components/ui/GifContainer";
import { errorMessage } from "../../../utils/getExerciseByUid";
import { Button } from "@mui/material";
import { ReactSVG } from "react-svg";
import { func } from "prop-types";

/**
 * Exercise Details component
 *
 * This component is shown once the user selects an exercise from the
 * exercise list. It displays the name, muscle group and an animated gif
 * of the exercise. The user can choose to add the exercise to their session
 * or go back and choose a different exercise.
 *
 * This component can also be reached if the user has chosen an exercise for
 * their session and wants to see the information about the exercise while
 * they are currently filling out the session data. In this case the
 * add exercise button will not be available.
 */
const ExerciseDetails = () => {
    const [isGifLoading, setIsGifLoading] = useState(true);

    // Deconstruct the required global exercise modal context
    const {
        searchInput,
        selectedExerciseInfo,
        exerciseAdded,
        setExerciseAdded,
        setExerciseModalState,
        setSelectedExerciseInfo,
    } = useContext(exerciseModalContext);

    const handleBackArrowClick = () => {
        // If the user is viewing this component for the exercise details
        // after they have added the exercise to their session, then the back
        // button will take them back to the exercise session data componet
        if (exerciseAdded) {
            setExerciseModalState("exercise_session_data");
        } else {
            const newModalState =
                searchInput === "" ? "default" : "user_search";
            setExerciseModalState(newModalState);
            setSelectedExerciseInfo(null);
        }
    };

    const handleAddExerciseClick = () => {
        setExerciseAdded(exercise);
        setExerciseModalState("exercise_session_data");
    };

    // Get the exercise object from the exerciseList JSON
    const exercise = getExerciseByUid(selectedExerciseInfo);

    // Display an error message if no exercise is found
    if (exercise === errorMessage)
        return (
            <div className="exerciseDetails">
                <div className="exerciseDetails__header">
                    <Button
                        sx={{ ...GREY_STYLE_BUTTON, padding: "0px" }}
                        onClick={handleBackArrowClick}
                    >
                        <ReactSVG className="links__icon" src={BackIcon} />
                    </Button>
                </div>
                {errorMessage}
            </div>
        );

    // Destructure the exercise object
    const { exercise: name, muscleGroup, uid } = exercise;
    const exerciseGifUrl = `${EXERCISE_GIF_URL_ENDPOINT}/${uid}.gif`;

    return (
        <div className="exerciseDetails">
            <BackButton handleBackArrowClick={handleBackArrowClick} />
            {!exerciseAdded && (
                <ExerciseHeader
                    handleAddExerciseClick={handleAddExerciseClick}
                />
            )}
            <div className="exerciseDetails__body">
                <h2 style={{ textAlign: "center" }}>{name}</h2>
                <h4>{muscleGroup}</h4>
                <GifContainer
                    name={name}
                    exerciseGifUrl={exerciseGifUrl}
                    isGifLoading={isGifLoading}
                    setIsGifLoading={setIsGifLoading}
                />
            </div>
        </div>
    );
};

/**
 * Exercise Header component
 *
 * This is a helper component for the ExerciseDetails component above.
 * It displays the exercise details components header.
 */
const ExerciseHeader = ({ handleAddExerciseClick }) => {
    return (
        <div className="exerciseDetails__header">
            <Button
                sx={GREY_STYLE_BUTTON}
                className="exerciseDetails__addExerciseBtn"
                onClick={handleAddExerciseClick}
            >
                Add Exercise
            </Button>
        </div>
    );
};

ExerciseHeader.propTypes = {
    handleAddExerciseClick: func,
};

export default ExerciseDetails;
