import { useContext } from "react";
import MetricsSearchBar from "./components/MetricsSearchBar";
import MostRecentExercises from "./components/MostRecentExercises";
import { metricsContext } from "../../context/appContext";
import SelectedExerciseMetrics from "./components/SelectedExerciseMetrics";
import "./metrics.css";

const Metrics = () => {
    const { selectedExercise } = useContext(metricsContext);
    
    return (
        <div className="metricsPage userPageGrid">
            <div className="metrics__header">
                <MetricsSearchBar />
                <MostRecentExercises />
            </div>
            <div className="exerciseSelected">
                {selectedExercise ? (
                    <SelectedExerciseMetrics />
                ) : (
                    <h2 className="metrics__noContentMsg">Select an exercise to see your metrics</h2>
                )}
            </div>
        </div>
    );
};

export default Metrics;
