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
    const { name } = selectedExercise;
    return (
        <>
            <h2 className="metrics__contentTitle">{name}</h2>
            <div className="metrics__content">
                <SelectedExerciseGif />
                <SelectedExerciseHistory />
                <SetsBarGraph selectedExercise={selectedExercise} />
            </div>
        </>
    );
};

export default SelectedExerciseMetrics;
