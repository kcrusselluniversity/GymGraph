import { CHART_COLORS } from "../../../data/constants";
import { array, func, number, string } from "prop-types";
import getRandomColor from "../../../utils/getRandomColor";
import {
    Bar,
    BarChart,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";

/**
 * The BarGraph component is a customizable bar chart component built using the
 * recharts library. It's designed to display a bar graph with a specified
 * number of bars, each representing a dataset. The component is highly
 * configurable, allowing for different data keys, tooltip formats, and
 * color schemes.
 * @param {Array of Objects} displayedGraphData: The dataset for the graph.
 * Each object in the array represents a data point in the graph.
 * @param {number} maxNumBars: The maximum number of bars to display in the graph.
 * @param {number} maxValue: The maximum value on the y axis of the graph.
 * @param {string} barDataKeyName: The key name in the data objects that holds the
 * value to be represented by each bar.
 * @param {string} xAxisDataKey: The key name in the data objects used for the
 * x-axis labels.
 * @param {function} xAxisTooltipLabelFormatter: A function to format the tooltip
 * label for the x axis.
 * @param {string} yAxisUnit: The unit of measurement to be appended to the y axis
 * values in the tooltip
 */
const BarGraph = ({
    displayedGraphData,
    maxNumBars,
    maxValue,
    barDataKeyName,
    xAxisDataKey,
    xAxisTooltipLabelFormatter,
    yAxisUnit,
}) => {
    // Map each bar data to a Bar component
    const BarComponentsArray = [...Array(maxNumBars)].map((_, index) => {
        // Determine color for bar
        const fillColor =
            index < CHART_COLORS.length
                ? CHART_COLORS[index]
                : getRandomColor();

        return (
            <Bar
                key={`bar-${index}`}
                type="monotone"
                dataKey={`${barDataKeyName}${index}`}
                fill={fillColor}
            />
        );
    });

    // Format y axis tooltip label
    const yAxisTooltipLabelFormatter = (value, name, item, index) => [
        `${value} ${yAxisUnit}`,
        `${barDataKeyName} ${index + 1}`,
    ];

    return (
        <ResponsiveContainer width="100%" height={250}>
            <BarChart data={displayedGraphData}>
                <CartesianGrid stroke="#ccc" strokeDasharray="3 3" />
                <XAxis dataKey={xAxisDataKey} />
                <YAxis domain={[0, maxValue]} unit={yAxisUnit} />
                <Tooltip
                    formatter={yAxisTooltipLabelFormatter}
                    labelFormatter={xAxisTooltipLabelFormatter}
                />
                {BarComponentsArray}
            </BarChart>
        </ResponsiveContainer>
    );
};

BarGraph.propTypes = {
    displayedGraphData: array,
    maxNumBars: number,
    maxValue: number,
    barDataKeyName: string,
    xAxisDataKey: string,
    xAxisTooltipLabelFormatter: func,
    yAxisUnit: string,
};

export default BarGraph;
