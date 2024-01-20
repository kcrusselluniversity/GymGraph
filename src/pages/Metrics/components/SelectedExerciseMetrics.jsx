import { useContext } from "react";
import { metricsContext } from "../../../context/appContext";
import SelectedExerciseGif from "./SelectedExerciseGif";

const SelectedExerciseMetrics = () => {
    const { selectedExercise } = useContext(metricsContext);

    return (
        <div>
            <SelectedExerciseGif />
        </div>
    );
};

export default SelectedExerciseMetrics;
