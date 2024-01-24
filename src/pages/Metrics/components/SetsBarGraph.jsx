import { useContext, useEffect, useState } from "react";
import { historyContext, metricsContext } from "../../../context/appContext";
import GraphControlBtns from "../../../components/ui/GraphControlBtns";
import calculateSetsGraphData from "../utils/calculateSetsGraphData";
import BarGraph from "./BarGraph";
import { object } from "prop-types";
import {
    DEFAULT_MAX_AXIS_VALUE,
    GRAPH_EXERCISE_VOLUME_RANGE,
} from "../../../data/constants";

/**
 * Sets bar graph component
 *
 * The SetsBarGraph component is designed to render a bar graph representing
 * the history of sets performed in a selected exercise. It utilizes data from
 * a user's history and reacts to changes in exercise selection or data updates.
 * The component manages various state variables to control the display and
 * calculation of graph data.
 */
const SetsBarGraph = () => {
    // Destructure required context
    const { isLoading } = useContext(historyContext);
    const { selectedExerciseData } = useContext(metricsContext);

    // Set state variables
    const [graphData, setGraphData] = useState([]);
    const [maxValue, setMaxValue] = useState(DEFAULT_MAX_AXIS_VALUE);
    const [maxNumberOfSets, setMaxNumberOfSets] = useState(0);
    const [displayedGraphData, setDisplayedGraphData] = useState([]);

    useEffect(() => {
        if (selectedExerciseData != null) {
            // Calculate volume data
            const volumeData = calculateSetsGraphData(selectedExerciseData);

            // Calculate derived values
            const maxValue = calculateMaxValue(volumeData);
            const maxNumberOfSets = calculateMaxNumSets(selectedExerciseData);

            // Update state
            setGraphData(volumeData);
            setMaxValue(maxValue);
            setMaxNumberOfSets(maxNumberOfSets);
        }
    }, [selectedExerciseData]);

    // Return no component if there is no data for the selected exercise
    if (selectedExerciseData.length === 0) return null;

    return (
        <div className="graphWithControlBtns Card setsHistory">
            <h3 className="graphWithControlBtns__title">Sets History</h3>
            <BarGraph
                displayedGraphData={displayedGraphData}
                maxNumBars={maxNumberOfSets}
                maxValue={maxValue}
                barDataKeyName="set"
                xAxisDataKey="date"
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

SetsBarGraph.propTypes = {
    selectedExercise: object,
};

// Helper function to calculate the largest volume lifted in any one set
const calculateMaxValue = (graphVolumeData) => {
    Math.max(
        ...graphVolumeData
            .map(({ date, ...rest }) => rest)
            .map((obj) => Math.max(...Object.values(obj)))
    );
};

// Helper function to find the largest amount of sets performed for a single
// exercise in any one session
const calculateMaxNumSets = (graphData) => {
    if (graphData.length === 0) return 0;

    return Math.max(...graphData.map((obj) => Object.keys(obj.sets).length));
};

export default SetsBarGraph;
