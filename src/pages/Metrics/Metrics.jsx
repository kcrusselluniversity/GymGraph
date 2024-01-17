import { useContext } from "react";
import MetricsSearchBar from "./components/MetricsSearchBar";
import MostRecentExercises from "./components/MostRecentExercises";
import "./metrics.css";
import { metricsContext } from "../../context/appContext";
import SelectedExerciseMetrics from "./components/SelectedExerciseMetrics";

const Metrics = () => {
    const { selectedExercise } = useContext(metricsContext);
    return (
        <div className="metricsPage userPageGrid">
            <div className="metrics__header">
                <MetricsSearchBar />
                <MostRecentExercises />
            </div>

            <div className="metrics__content">
                {selectedExercise ? (
                    <SelectedExerciseMetrics />
                ) : (
                    <h2>Select an exercise to see your metrics</h2>
                )}
            </div>
        </div>
    );
};

export default Metrics;
