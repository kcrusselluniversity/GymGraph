import { Button } from "@mui/material";
import { GREY_STYLE_BUTTON } from "../../../data/constants";
import { exerciseModalContext } from "../../../context/exerciseModalContext";
import { useContext } from "react";
import AddButton from "../../../components/ui/AddButton";
import DeleteButton from "../../../components/ui/DeleteButton";
import ExerciseSessionTable from "./ExerciseSessionTable";

const ExerciseSessionData = () => {
    const { exerciseAdded, setExerciseModalState } =
        useContext(exerciseModalContext);
    const { exercise: name } = exerciseAdded;

    const handleExerciseDetailsBtnClick = () => {
        setExerciseModalState("selected_exercise_info");
    };

    const handleRestTimerBtnClick = () => {
        setExerciseModalState("rest_timer");
    };

    return (
        <div className="exerciseSessionData">
            <div className="exerciseSessionData__controlBtns">
                <DeleteButton />
                <AddButton />
            </div>
            <h2 style={{ textAlign: "center" }}>{name}</h2>
            <ExerciseSessionTable />
            <div className="sessionLinks">
                <Button
                    onClick={handleExerciseDetailsBtnClick}
                    sx={GREY_STYLE_BUTTON}
                >
                    Exercise Details
                </Button>
                <Button onClick={handleRestTimerBtnClick} sx={GREY_STYLE_BUTTON}>
                    Rest Timer
                </Button>
            </div>
        </div>
    );
};

export default ExerciseSessionData;
