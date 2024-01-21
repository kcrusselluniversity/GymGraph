import { useContext, useEffect, useState } from "react";
import { historyContext } from "../../../context/appContext";
import calculateSelectedExerciseData from "../utils/calculateSelectedExerciseData";
import { PropTypes, string } from "prop-types";
import {
    DEFAULT_MAX_AXIS_VALUE,
    GRAPH_EXERCISE_VOLUME_RANGE,
} from "../../../data/constants";
import LineGraph from "../../../components/ui/LineGraph";
import GraphControlBtns from "../../../components/ui/GraphControlBtns";
import calculateSessionSetVolumeAvg from "../utils/calculateSessionSetVolumeAvg";

const ExerciseSetVolumePerSessionGraph = ({ selectedExercise }) => {
    // Destructure required context
    const { userHistory, isLoading } = useContext(historyContext);

    // Set state variables
    const [graphData, setGraphData] = useState([]);
    const [minValue, setMinValue] = useState(0);
    const [maxValue, setMaxValue] = useState(DEFAULT_MAX_AXIS_VALUE);
    const [displayedGraphData, setDisplayedGraphData] = useState([]);

    useEffect(() => {
        if (!isLoading) {
            const selectedExerciseData = calculateSelectedExerciseData(
                selectedExercise,
                userHistory
            );

            const selectedExerciseVolumeData =
                calculateSessionSetVolumeAvg(selectedExerciseData);

            // Calculate derived values
            const maxValue = Math.max(
                ...selectedExerciseVolumeData.map((data) => data.value)
            );
            const minValue = Math.min(
                ...selectedExerciseVolumeData.map((data) => data.value)
            );

            // Update state
            setGraphData(selectedExerciseVolumeData);
            setMaxValue(maxValue);
            setMinValue(minValue);
        }
    }, [isLoading, selectedExercise, userHistory]);

    return (
        <div className="graphWithControlBtns Card">
            <h3 className="graphWithControlBtns__title">
            Average Set Volume per Session
            </h3>
            <LineGraph
                displayedGraphData={displayedGraphData}
                minValue={minValue}
                maxValue={maxValue}
                valueTitle="Average volume"
                xAxisDataKey="date"
                xAxisTooltipLabelFormatter={tooltipLabelFormatter}
                yAxisUnit="kg"
            />
            <GraphControlBtns
                isDataLoading={isLoading}
                graphData={graphData}
                setDisplayedGraphData={setDisplayedGraphData}
                xAxisRange={GRAPH_EXERCISE_VOLUME_RANGE}
            />
        </div>
    );
};

ExerciseSetVolumePerSessionGraph.propTypes = {
    selectedExercise: PropTypes.shape({
        name: string,
        uid: string,
    }),
};

/**
 * Helper function to format the tooltip display of the x axis information
 * of the graph
 */
const tooltipLabelFormatter = (name) => {
    const [date, time] = name.split(" ");
    return `Session date: ${time} ${date}`;
};

export default ExerciseSetVolumePerSessionGraph;
