import { useContext } from "react";
import { metricsContext } from "../../../context/appContext";

const SelectedExerciseMetrics = () => {
    const { selectedExercise } = useContext(metricsContext);
    
    return <div>{selectedExercise.name}</div>;
};

export default SelectedExerciseMetrics;
