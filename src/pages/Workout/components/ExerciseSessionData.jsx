import { Button } from "@mui/material";
import { GREY_STYLE_BUTTON } from "../../../data/constants";
import { exerciseModalContext } from "../../../context/exerciseModalContext";
import { useContext } from "react";

const ExerciseSessionData = () => {
    const { exerciseAdded, setExerciseModalState } =
        useContext(exerciseModalContext);
    const { exercise: name } = exerciseAdded;

    const handleExerciseDetailsBtnClick = () => {
        setExerciseModalState("selected_exercise_info");
    };

    return (
        <div className="exerciseSessionData">
            <h2 style={{ textAlign: "center" }}>{name}</h2>
            <Button
                onClick={handleExerciseDetailsBtnClick}
                sx={GREY_STYLE_BUTTON}
            >
                Exercise Details
            </Button>
        </div>
    );
};

export default ExerciseSessionData;
