import MetricsSearchBar from "./components/MetricsSearchBar";
import MostRecentExercises from "./components/MostRecentExercises";
import "./metrics.css";

const Metrics = () => {
    return (
        <div className="metricsPage userPageGrid">
            <div className="metrics__header">
                <MetricsSearchBar />
                <MostRecentExercises />
            </div>
            <div className="metrics__content"></div>
        </div>
    );
};

export default Metrics;
