import { useContext } from "react";
import { exerciseModalContext } from "../../../context/exerciseModalContext";
import getExerciseByUid from "../../../utils/getExerciseByUid";
import { GreyButtonStyle } from "../../../data/constants";
import { Button } from "@mui/material";
import { ReactSVG } from "react-svg";
import BackIcon from "../../../assets/icons/Back_Icon.svg";

const ExerciseDetails = () => {
    const { searchInput, selectedExerciseInfo, setExerciseModalState } =
        useContext(exerciseModalContext);

    const handleBackArrowClick = () => {
        const newModalState = searchInput === "" ? "default" : "user_search";
        setExerciseModalState(newModalState);
    };

    const exercise = getExerciseByUid(selectedExerciseInfo);

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
        </div>
    );
};

export default ExerciseDetails;
