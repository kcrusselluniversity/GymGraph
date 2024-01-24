import { array, func, number, string } from "prop-types";
import { ACCENT_COLOR, GRAPH_DAY_RANGE } from "../../data/constants";
import {
    CartesianGrid,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";
/**
 * Custom line graph component
 *
 * The LineGraph component is a React component that renders a line chart using
 * the recharts library. It's designed to be flexible and easy to use for
 * displaying various types of line graphs with custom data, axes, and tooltips.
 *
 * @param {Array of Objects} displayedGraphData: The data to be displayed
 * in the line graph. It should be an array of objects, with each object having
 * just two properties:
 *      xAxisDataKey: the x axis value
 *      value: The corresponding y axis value (of type number)
 *
 * The xAxisDataKey is the name you choose to give to represent the x axis.
 * For example: If you want to use this component to display the volume of an
 * exercise session (ie the total amount of weight lifted each session) over time,
 * then each data point will be represented by (as an example):
 *      {date: '01-01-2000 9:58', value: 500}
 * where date is the xAxisDataKey.
 * An array of these objects will then be displayed on a line graph with the
 * x axis representing the date, and the y axis representing the volume.
 * @param {any} minValue: The minimum value for the y axis.
 * This defines the lower limit of the graph.
 * @param {any} maxValue: The maximum value for the y axis.
 * This defines the upper limit of the graph.
 * @param {any} valueTitle: The title for the y axis displayed in the graph.
 * @param {any} xAxisDataKey: The key from the data object to be used for
 * the x-axis values.
 * @param {any} yAxisUnit: The unit of measurement for the y-axis values.
 * @param {any} xAxisTooltipLabelFormatter: A function to format the
 * tooltip label for the x-axis.
 * Must be of the form:
 *      xAxisValue => 'display string for value'
 * For each data point object, this function will receive the xAxisValue and
 * will return a string to display on the tooltip when this datapoint is hovered
 * over with on the graph.
 *
 * For example: Continuing with the example given above, if the data is of the
 * form {date: '01-01-2000 9:58', value: 500}, then this function will receive
 * '01-01-2000 9:58' as the input value, and should return a string to
 * display to the user when they hover over this value on the graph.
 */
const LineGraph = ({
    displayedGraphData,
    maxValue,
    minValue = 0,
    valueTitle,
    xAxisDataKey,
    xAxisTooltipLabelFormatter,
    yAxisUnit,
}) => {
    return (
        <ResponsiveContainer width="100%" height={175}>
            <LineChart data={displayedGraphData}>
                <Line type="monotone" dataKey="value" stroke={ACCENT_COLOR} />
                <CartesianGrid stroke="#ccc" strokeDasharray="3 3" />
                <XAxis
                    dataKey={xAxisDataKey}
                    tick={displayedGraphData.length <= GRAPH_DAY_RANGE}
                    tickMargin={8}
                />
                <YAxis domain={[minValue, maxValue]} unit={yAxisUnit}/>
                <Tooltip
                    formatter={(value) => [`${value} ${yAxisUnit}`, valueTitle]}
                    labelFormatter={xAxisTooltipLabelFormatter}
                />
            </LineChart>
        </ResponsiveContainer>
    );
};

LineGraph.propTypes = {
    displayedGraphData: array,
    minValue: number,
    maxValue: number,
    valueTitle: string,
    xAxisDataKey: string,
    xAxisTooltipLabelFormatter: func,
    yAxisUnit: string,
};

export default LineGraph;
