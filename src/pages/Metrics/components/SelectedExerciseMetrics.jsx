import { useContext } from "react";
import { metricsContext } from "../../../context/appContext";
import SelectedExerciseGif from "./SelectedExerciseGif";
import SetsBarGraph from "./SetsBarGraph";

/**
 * The SelectedExerciseMetrics component is a functional component designed 
 * to display specific metrics and visual representations for a user-selected 
 * exercise. 
 */
const SelectedExerciseMetrics = () => {
    const { selectedExercise } = useContext(metricsContext);

    return (
        <div>
            <SelectedExerciseGif />
            <SetsBarGraph selectedExercise={selectedExercise} />
        </div>
    );
};

export default SelectedExerciseMetrics;
