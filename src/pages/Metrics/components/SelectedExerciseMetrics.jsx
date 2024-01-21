import { useContext } from "react";
import { metricsContext } from "../../../context/appContext";
import SelectedExerciseGif from "./SelectedExerciseGif";
import ExerciseSetVolumePerSession from "./ExerciseSetVolumePerSession";

const SelectedExerciseMetrics = () => {
    const { selectedExercise } = useContext(metricsContext);

    return (
        <div>
            <SelectedExerciseGif />
            <ExerciseSetVolumePerSession selectedExercise={selectedExercise} />
        </div>
    );
};

export default SelectedExerciseMetrics;
