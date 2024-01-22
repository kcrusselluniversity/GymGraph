import { useContext, useEffect, useState } from "react";
import BarGraph from "./BarGraph";
import { historyContext } from "../../../context/appContext";
import {
    DEFAULT_MAX_AXIS_VALUE,
    GRAPH_EXERCISE_VOLUME_RANGE,
} from "../../../data/constants";
import calculateSelectedExerciseData from "../utils/calculateSelectedExerciseData";
import calculateSetsGraphData from "../utils/calculateSetsGraphData";
import GraphControlBtns from "../../../components/ui/GraphControlBtns";
import { object } from "prop-types";

/**
 * Sets bar graph component
 *
 * The SetsBarGraph component is designed to render a bar graph representing
 * the history of sets performed in a selected exercise. It utilizes data from
 * a user's history and reacts to changes in exercise selection or data updates.
 * The component manages various state variables to control the display and
 * calculation of graph data.
 *
 * @param {object} selectedExercise: The exercise currently selected.
 * This prop is used to determine which exercise data to display in the graph.
 */
const SetsBarGraph = ({ selectedExercise }) => {
    // Destructure required context
    const { userHistory, isLoading } = useContext(historyContext);

    // Set state variables
    const [graphData, setGraphData] = useState([]);
    const [maxValue, setMaxValue] = useState(DEFAULT_MAX_AXIS_VALUE);
    const [maxNumberOfSets, setMaxNumberOfSets] = useState(0);
    const [displayedGraphData, setDisplayedGraphData] = useState([]);

    useEffect(() => {
        if (!isLoading) {
            const selectedExerciseData = calculateSelectedExerciseData(
                selectedExercise,
                userHistory
            );

            const selectedExerciseGraphData =
                calculateSetsGraphData(selectedExerciseData);

            // Calculate derived values
            const maxValue = calculateMaxValue(selectedExerciseGraphData);

            const maxNumberOfSets = calculateMaxNumSets(
                selectedExerciseGraphData
            );

            // Update state
            setGraphData(selectedExerciseGraphData);
            setMaxValue(maxValue);
            setMaxNumberOfSets(maxNumberOfSets);
        }
    }, [isLoading, selectedExercise, userHistory]);

    return (
        <div className="graphWithControlBtns Card">
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
const calculateMaxValue = (graphData) => {
    Math.max(
        ...graphData
            .map(({ date, ...rest }) => rest)
            .map((obj) => Math.max(...Object.values(obj)))
    );
};

// Helper function to find the largest amount of sets performed for a single
// exercise in any one session
const calculateMaxNumSets = (graphData) => {
    if (graphData.length === 0) return 0;

    return Math.max(...graphData.map((obj) => Object.keys(obj).length - 1));
};

export default SetsBarGraph;
