import { useContext, useState } from "react";
import { exerciseModalContext } from "../../../context/exerciseModalContext";
import getExerciseByUid from "../../../utils/getExerciseByUid";
import {
    GREY_STYLE_BUTTON,
    EXERCISE_GIF_URL_ENDPOINT,
    GIF_SIZE_STANDARD,
} from "../../../data/constants";
import { Button, Skeleton } from "@mui/material";
import { ReactSVG } from "react-svg";
import BackIcon from "../../../assets/icons/Back_Icon.svg";
import { errorMessage } from "../../../utils/getExerciseByUid";
import BackButton from "../../../components/ui/BackButton";

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
    } = useContext(exerciseModalContext);

    const handleBackArrowClick = () => {
        // If the user is viewing this component for the exercise details
        // after they have added the exercise to their session, then the back
        // button will take them back to the exercise session data componet
        if (exerciseAdded) {
            setExerciseModalState("exercise_session_data");
        } else {
            const newModalState = searchInput === "" ? "default" : "user_search";
            setExerciseModalState(newModalState);
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
            <div className="exerciseDetails__header">
                {!exerciseAdded && (
                    <Button
                        sx={GREY_STYLE_BUTTON}
                        className="exerciseDetails__addExerciseBtn"
                        onClick={handleAddExerciseClick}
                    >
                        Add Exercise
                    </Button>
                )}
                <BackButton handleBackArrowClick={handleBackArrowClick} />
            </div>
            <div className="exerciseDetails__body">
                <h2 style={{ textAlign: "center" }}>{name}</h2>
                <h4>{muscleGroup}</h4>
                <div
                    className="gifContainer"
                    style={{
                        height: `${GIF_SIZE_STANDARD}px`,
                        width: `${GIF_SIZE_STANDARD}px`,
                    }}
                >
                    <img
                        alt={name}
                        src={exerciseGifUrl}
                        onLoad={() => setIsGifLoading(false)}
                    />
                    {isGifLoading && (
                        <Skeleton
                            className="exerciseDetails__skeleton"
                            variant="rectangular"
                            data-testid="exerciseDetailsSkeleton"
                            height={GIF_SIZE_STANDARD}
                            width={GIF_SIZE_STANDARD}
                            sx={{
                                borderRadius: "1rem",
                                opacity: isGifLoading ? 1 : 0,
                            }}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default ExerciseDetails;
