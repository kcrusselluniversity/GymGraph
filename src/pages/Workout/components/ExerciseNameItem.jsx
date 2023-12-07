import { string } from "prop-types";
import { useContext } from "react";
import { exerciseModalContext } from "../../../context/exerciseModalContext";
/**
 * ExerciseNameItem component
 *
 * Takes an exercise and returns a UI component displaying the exercise
 */
const ExerciseNameItem = ({ uid, exerciseName }) => {
    const { setSelectedExerciseInfo, setExerciseModalState } =
        useContext(exerciseModalContext);

    const handleClick = () => {
        setSelectedExerciseInfo(uid)
        setExerciseModalState("selected_exercise_info")
    };

    return (
        <div
            className="exerciseGroupList__item"
            data-testid="exerciseNameItem"
            onClick={handleClick}
        >
            {exerciseName}
        </div>
    );
};

ExerciseNameItem.propTypes = {
    uid: string,
    exerciseName: string,
};

export default ExerciseNameItem;
