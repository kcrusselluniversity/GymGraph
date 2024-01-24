import { useContext } from "react";
import { metricsContext } from "../../../context/appContext";
import SelectedExerciseGif from "./SelectedExerciseGif";
import SetsBarGraph from "./SetsBarGraph";
import SelectedExerciseHistory from "./SelectedExerciseHistory";

/**
 * The SelectedExerciseMetrics component is a functional component designed 
 * to display specific metrics and visual representations for a user-selected 
 * exercise. 
 */
const SelectedExerciseMetrics = () => {
    const { selectedExercise } = useContext(metricsContext);

    return (
        <>
            <SelectedExerciseGif />
            <SelectedExerciseHistory />
            <SetsBarGraph selectedExercise={selectedExercise} />
        </>
    );
};

export default SelectedExerciseMetrics;
