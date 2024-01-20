import GraphWithControlBtns from "../../../components/ui/GraphWithControlBtns";
import calculateSessionsVolumeData from "../utils/calculateSessionsVolumeData";

/**
 * Volume per session graph component
 *
 * VolumePerSessionGraph is a React component that renders a graph displaying
 * the volume per session. It utilizes the GraphWithControlBtns component,
 * a custom component designed for displaying graphs with control buttons.
 *
 * The volume data for each session is calculated and displayed in a
 * graphical format.
 */
const VolumePerSessionGraph = () => {
    return (
        <GraphWithControlBtns
            calculateGraphData={calculateSessionsVolumeData}
            graphTitle="Volume per Session Graph"
            valueTitle="Volume"
            xAxisDataKey="date"
            xAxisTooltipLabelFormatter={tooltipLabelFormatter}
            yAxisUnit="kg"
        />
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
