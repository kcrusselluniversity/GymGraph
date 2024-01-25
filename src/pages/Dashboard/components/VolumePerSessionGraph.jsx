import { useContext, useEffect, useState } from "react";
import { historyContext } from "../../../context/appContext";
import LineGraph from "../../../components/ui/LineGraph";
import GraphControlBtns from "../../../components/ui/GraphControlBtns";
import calculateSessionsVolumeData from "../utils/calculateSessionsVolumeData";
import LightTooltip from '../../../components/ui/LightTooltip';
import {
    DEFAULT_MAX_AXIS_VALUE,
    GRAPH_DAY_RANGE,
    VOLUME_GRAPH_DESCRIPTION,
} from "../../../data/constants";

/**
 * Volume per session graph component
 *
 * VolumePerSessionGraph is a React functional component designed to display
 * a line graph representing the volume per session based on a user's
 * historical data.
 * It uses context to access relevant data and useState and useEffect hooks
 * for state management and side effects.
 */
const VolumePerSessionGraph = () => {
    // Destructure required context
    const { userHistory, isLoading } = useContext(historyContext);

    // Set state variables
    const [graphData, setGraphData] = useState([]);
    const [maxValue, setMaxValue] = useState(DEFAULT_MAX_AXIS_VALUE);
    const [displayedGraphData, setDisplayedGraphData] = useState([]);

    useEffect(() => {
        if (!isLoading) {
            const graphData = calculateSessionsVolumeData(userHistory);

            // Calculate derived values
            const maxValue = Math.max(...graphData.map((data) => data.value));

            // Update state
            setGraphData(graphData);
            setMaxValue(maxValue);
        }
    }, [isLoading]);

    return (
        <div className="graphWithControlBtns Card">
            <LightTooltip title={VOLUME_GRAPH_DESCRIPTION} placement="top">
                <h3 className="graphWithControlBtns__title">
                    Volume per Session Graph
                </h3>
            </LightTooltip>
            <LineGraph
                displayedGraphData={displayedGraphData}
                maxValue={maxValue}
                valueTitle="Volume"
                xAxisDataKey="date"
                xAxisTooltipLabelFormatter={tooltipLabelFormatter}
                yAxisUnit="kg"
            />
            <GraphControlBtns
                isDataLoading={isLoading}
                graphData={graphData}
                setDisplayedGraphData={setDisplayedGraphData}
                xAxisRange={GRAPH_DAY_RANGE}
            />
        </div>
    );
};

/**
 * Helper function to format the tooltip display of the x axis information
 * of the graph
 */
const tooltipLabelFormatter = (name) => {
    const [date, time] = name.split(" ");
    return `Session date: ${time} ${date}`;
};

export default VolumePerSessionGraph;
