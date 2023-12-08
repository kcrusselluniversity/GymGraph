import { useContext, useState } from "react";
import { exerciseModalContext } from "../../../context/exerciseModalContext";
import getExerciseByUid from "../../../utils/getExerciseByUid";
import { GreyButtonStyle, exerciseGifUrlEndpoint, gifStandardSize } from "../../../data/constants";
import { Button, Skeleton } from "@mui/material";
import { ReactSVG } from "react-svg";
import BackIcon from "../../../assets/icons/Back_Icon.svg";
import { errorMessage } from "../../../utils/getExerciseByUid";

const ExerciseDetails = () => {
    const [isGifLoading, setIsGifLoading] = useState(true);
    const { searchInput, selectedExerciseInfo, setExerciseModalState } =
        useContext(exerciseModalContext);

    const handleBackArrowClick = () => {
        const newModalState = searchInput === "" ? "default" : "user_search";
        setExerciseModalState(newModalState);
    };

    // Get the exercise object from the exerciseList JSON
    const exercise = getExerciseByUid(selectedExerciseInfo);

    // Display an error message if no exercise is found
    if (exercise === errorMessage)
        return (
            <div className="exerciseDetails">
                <div className="exerciseDetails__header">
                    <Button
                        sx={{ ...GreyButtonStyle, padding: "0px" }}
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
    const exerciseGifUrl = `${exerciseGifUrlEndpoint}/${uid}.gif`;

    return (
        <div className="exerciseDetails">
            <div className="exerciseDetails__header">
                <Button
                    sx={GreyButtonStyle}
                    className="exerciseDetails__addExerciseBtn"
                >
                    Add Exercise
                </Button>
                <Button
                    sx={{ ...GreyButtonStyle, padding: "0px" }}
                    onClick={handleBackArrowClick}
                >
                    <ReactSVG className="links__icon" src={BackIcon} />
                </Button>
            </div>
            <div className="exerciseDetails__body">
                <h2 style={{ textAlign: "center" }}>{name}</h2>
                <h4>{muscleGroup}</h4>
                <div
                    className="gifContainer"
                    style={{
                        height: `${gifStandardSize}px`,
                        width: `${gifStandardSize}px`,
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
                            height={gifStandardSize}
                            width={gifStandardSize}
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
