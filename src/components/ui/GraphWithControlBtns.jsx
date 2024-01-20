import { useContext, useEffect, useState } from "react";
import { historyContext } from "../../context/appContext";
import GreyButton from "../../components/ui/GreyButton";
import { func, string } from "prop-types";
import {
    ACCENT_COLOR,
    DEFAULT_MAX_AXIS_VALUE,
    GRAPH_DAY_RANGE,
} from "../../data/constants";
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
 * Line graph with control buttons component
 *
 * GraphWithControlBtns is a React component designed for displaying a
 * line chart with additional control buttons for navigating through the data.
 * It is a versatile component that can be customized for various types of
 * data visualization where user interaction for data exploration is needed.
 *
 * @NOTE: The calculateGraphData function must return data in the form of an
 * array of objects, with each object having just two properties:
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
 *
 * GraphWithControlBtns accepts the following props:
 * @param {func} calculateGraphData: A function that processes the input data
 * and returns the data to be used in the graph.
 * @param {string} graphTitle: The title of the graph.
 * @param {string} valueTitle: The title for the y axis displayed in the graph.
 * @param {string} xAxisDataKey: The key from the data object to be used for
 * the x-axis values.
 * @param {string} yAxisUnit: The unit of measurement for the y-axis values.
 * @param {function} xAxisTooltipLabelFormatter: A function to format the
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
const GraphWithControlBtns = ({
    calculateGraphData,
    graphTitle,
    valueTitle,
    xAxisDataKey,
    xAxisTooltipLabelFormatter,
    yAxisUnit,
}) => {
    // Destructure required context
    const { userHistory, isLoading } = useContext(historyContext);

    // Set state variables
    const [graphData, setGraphData] = useState([]);
    const [maxValue, setMaxValue] = useState(DEFAULT_MAX_AXIS_VALUE);
    const [displayedGraphData, setDisplayedGraphData] = useState([]);

    // Set state variables for control button logic
    const [endIndex, setEndIndex] = useState(null);
    const [isFirstBlockOfData, setIsFirstBlockOfData] = useState(false);
    const [isLastBlockOfData, setIsLastBlockOfData] = useState(false);
    const [isAllActive, setIsAllActive] = useState(false);

    // Set state for reset logic
    const [initialEndIndex, setInitialEndIndex] = useState(null);
    const [initialDisplayData, setInitialDisplayData] = useState([]);

    // Parse data to display in graph once userHistory data has loaded
    useEffect(() => {
        if (!isLoading) {
            const graphData = calculateGraphData(userHistory);

            // Calculate derived values
            const initialEndIndex = graphData.length - 1;
            const maxValue = Math.max(...graphData.map((data) => data.value));

            // Determine the initial section of data to show
            const calculatedStartIndex = initialEndIndex - GRAPH_DAY_RANGE;
            if (calculatedStartIndex < 0) setIsFirstBlockOfData(true);

            let initialStartIndex =
                calculatedStartIndex < 0
                    ? 0
                    : initialEndIndex - (GRAPH_DAY_RANGE - 1);

            // Calculate the initial section of data to display
            // Note: We slice at initialEndIndex + 1 as the slice methods 'end'
            // parameter is exclusive of the element at the index provided to 'end'
            const initialDisplayData = graphData.slice(
                initialStartIndex,
                initialEndIndex + 1
            );

            // Update the state
            setMaxValue(maxValue);
            setEndIndex(initialEndIndex);
            setDisplayedGraphData(initialDisplayData);
            setGraphData(graphData);
            setIsLastBlockOfData(true);

            // Store initial data in state variables for later use
            setInitialEndIndex(initialEndIndex);
            setInitialDisplayData(initialDisplayData);
        }
    }, [isLoading]);

    const handleAllBtnClick = () => {
        setIsAllActive(true);
        setDisplayedGraphData(graphData);
    };

    const handleResetBtnClick = () => {
        // Update isFirstBlock boolean
        const calculatedStartIndex = initialEndIndex - GRAPH_DAY_RANGE;
        calculatedStartIndex < 0
            ? setIsFirstBlockOfData(true)
            : setIsFirstBlockOfData(false);

        // Reset state to initial state
        setEndIndex(initialEndIndex);
        setDisplayedGraphData(initialDisplayData);
        setIsLastBlockOfData(true);
        setIsAllActive(false);
    };

    const handlePrevBtnClick = () => {
        // Calculate new start and end indexes
        const newEndIndex = endIndex - GRAPH_DAY_RANGE;
        let newStartIndex = newEndIndex - (GRAPH_DAY_RANGE - 1);
        if (newStartIndex <= 0) {
            setIsFirstBlockOfData(true);
            newStartIndex = 0;
        }

        // Select the new section of data to display
        const updatedDisplayedSessionData = graphData.slice(
            newStartIndex,
            newEndIndex + 1
        );

        // Update state
        setDisplayedGraphData(updatedDisplayedSessionData);
        setEndIndex(newEndIndex);
        setIsLastBlockOfData(false);
    };

    const handleNextBtnClick = () => {
        // Calculate new start and end indexes
        let newEndIndex = endIndex + GRAPH_DAY_RANGE;
        let newStartIndex = newEndIndex - (GRAPH_DAY_RANGE - 1);

        if (newEndIndex >= initialEndIndex) {
            setIsLastBlockOfData(true);
            newEndIndex = initialEndIndex;
        }

        // Select the new section of data to display
        const updatedDisplayedSessionData = graphData.slice(
            newStartIndex,
            newEndIndex + 1
        );

        // Update state
        setDisplayedGraphData(updatedDisplayedSessionData);
        setEndIndex(newEndIndex);
        setIsFirstBlockOfData(false);
    };

    // Determine whether there is enough data to display an 'All' button
    const isDisplayAllBtn = graphData.length > GRAPH_DAY_RANGE;

    // Determine whether each button should be displayed based on the state
    const isPrevBtnVisible = !isAllActive && !isFirstBlockOfData && !isLoading;
    const isNextBtnVisible = !isAllActive && !isLastBlockOfData && !isLoading;
    const isAllBtnVisible = !isAllActive && isDisplayAllBtn;

    return (
        <div className="graphWithControlBtns Card">
            <h3 className="graphWithControlBtns__title">{graphTitle}</h3>
            <ResponsiveContainer width="100%" height={250}>
                <LineChart data={displayedGraphData}>
                    <Line
                        type="monotone"
                        dataKey="value"
                        stroke={ACCENT_COLOR}
                    />
                    <CartesianGrid stroke="#ccc" strokeDasharray="3 3" />
                    <XAxis
                        dataKey={xAxisDataKey}
                        tick={displayedGraphData.length <= GRAPH_DAY_RANGE}
                    />
                    <YAxis domain={[0, maxValue]} unit={yAxisUnit} />
                    <Tooltip
                        formatter={(value) => [
                            `${value} ${yAxisUnit}`,
                            valueTitle,
                        ]}
                        labelFormatter={xAxisTooltipLabelFormatter}
                    />
                </LineChart>
            </ResponsiveContainer>
            <div className="graphWithControlBtns__controlBtns">
                {isPrevBtnVisible && (
                    <GreyButton handleClick={handlePrevBtnClick}>
                        Prev
                    </GreyButton>
                )}
                {isAllBtnVisible && (
                    <GreyButton handleClick={handleAllBtnClick}>All</GreyButton>
                )}
                {isAllActive && (
                    <GreyButton handleClick={handleResetBtnClick}>
                        Reset
                    </GreyButton>
                )}
                {isNextBtnVisible && (
                    <GreyButton handleClick={handleNextBtnClick}>
                        Next
                    </GreyButton>
                )}
            </div>
        </div>
    );
};

GraphWithControlBtns.propTypes = {
    calculateGraphData: func,
    graphTitle: string,
    valueTitle: string,
    xAxisDataKey: string,
    xAxisTooltipLabelFormatter: func,
    yAxisUnit: string,
};

export default GraphWithControlBtns;
