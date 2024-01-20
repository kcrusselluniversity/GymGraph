import { useEffect, useState } from "react";
import GreyButton from "../../components/ui/GreyButton";
import { array, bool, func, number } from "prop-types";

/**
 * Graph control buttons component
 *
 * The GraphControlBtns component is a React component designed to provide
 * navigation controls for a graph. It manages the display of data in a graph
 * by handling pagination-like functionality with buttons for navigating
 * through data blocks.
 * @param {boolean} isDataLoading:  A boolean value indicating whether the
 * graph data is currently loading.
 * @param {array} graphData: An array of data points that are used to
 * display the graph.  Each data point object must have just two properties:
 *      xAxisDataKey: the x axis value
 *      value: The corresponding y axis value (of type number)
 * @param {function} setDisplayedGraphData: A function to update the state of
 * the displayed graph data.
 * @param {number} xAxisRange:  A numeric value representing the range of
 * data points to display on the x axis at any given time.
 */
const GraphControlBtns = ({
    isDataLoading,
    graphData,
    setDisplayedGraphData,
    xAxisRange,
}) => {
    // Set state variables for control button logic
    const [endIndex, setEndIndex] = useState(null);
    const [isFirstBlockOfData, setIsFirstBlockOfData] = useState(false);
    const [isLastBlockOfData, setIsLastBlockOfData] = useState(false);
    const [isAllActive, setIsAllActive] = useState(false);

    // Set state for reset logic
    const [initialEndIndex, setInitialEndIndex] = useState(null);
    const [initialDisplayData, setInitialDisplayData] = useState(null);

    // Update the component when the data loading state or graphData state
    // changes
    useEffect(() => {
        if (!isDataLoading) {
            // Calculate derived values
            const initialEndIndex = graphData.length - 1;

            // Determine the initial section of data to show
            const calculatedStartIndex = initialEndIndex - xAxisRange;
            setIsFirstBlockOfData(calculatedStartIndex < 0);

            let initialStartIndex =
                calculatedStartIndex < 0
                    ? 0
                    : initialEndIndex - (xAxisRange - 1);

            // Calculate the initial section of data to display
            // Note: We slice at initialEndIndex + 1 as the slice methods 'end'
            // parameter is exclusive of the element at the index provided to 'end'
            const initialDisplayData = graphData.slice(
                initialStartIndex,
                initialEndIndex + 1
            );

            // Update the state
            setEndIndex(initialEndIndex);
            setDisplayedGraphData(initialDisplayData);
            setIsLastBlockOfData(true);

            // Store initial data in state variables for later use
            setInitialEndIndex(initialEndIndex);
            setInitialDisplayData(initialDisplayData);
        }
    }, [isDataLoading, graphData]);

    const handleAllBtnClick = () => {
        setIsAllActive(true);
        setDisplayedGraphData(graphData);
    };

    const handleResetBtnClick = () => {
        // Update isFirstBlock boolean
        const calculatedStartIndex = initialEndIndex - xAxisRange;
        setIsFirstBlockOfData(calculatedStartIndex < 0);

        // Reset state to initial state
        setEndIndex(initialEndIndex);
        setDisplayedGraphData(initialDisplayData);
        setIsLastBlockOfData(true);
        setIsAllActive(false);
    };

    const handlePrevBtnClick = () => {
        // Calculate new start and end indexes
        const newEndIndex = endIndex - xAxisRange;
        let newStartIndex = newEndIndex - (xAxisRange - 1);
        if (newStartIndex <= 0) {
            setIsFirstBlockOfData(true);
            newStartIndex = 0;
        }

        // Select the new section of data to display
        const updatedDisplayedGraphData = graphData.slice(
            newStartIndex,
            newEndIndex + 1
        );

        // Update state
        setDisplayedGraphData(updatedDisplayedGraphData);
        setEndIndex(newEndIndex);
        setIsLastBlockOfData(false);
    };

    const handleNextBtnClick = () => {
        // Calculate new start and end indexes
        let newEndIndex = endIndex + xAxisRange;
        let newStartIndex = newEndIndex - (xAxisRange - 1);

        if (newEndIndex >= initialEndIndex) {
            setIsLastBlockOfData(true);
            newEndIndex = initialEndIndex;
        }

        // Select the new section of data to display
        const updatedDisplayedGraphData = graphData.slice(
            newStartIndex,
            newEndIndex + 1
        );

        // Update state
        setDisplayedGraphData(updatedDisplayedGraphData);
        setEndIndex(newEndIndex);
        setIsFirstBlockOfData(false);
    };

    // Determine whether there is enough data to display an 'All' button
    const isDisplayAllBtn = graphData.length > xAxisRange;

    // Determine whether each button should be displayed based on the state
    const isPrevBtnVisible =
        !isAllActive && !isFirstBlockOfData && !isDataLoading;
    const isNextBtnVisible =
        !isAllActive && !isLastBlockOfData && !isDataLoading;
    const isAllBtnVisible = !isAllActive && isDisplayAllBtn;

    return (
        <div className="graphWithControlBtns__controlBtns">
            {isPrevBtnVisible && (
                <GreyButton handleClick={handlePrevBtnClick}>Prev</GreyButton>
            )}
            {isAllBtnVisible && (
                <GreyButton handleClick={handleAllBtnClick}>All</GreyButton>
            )}
            {isAllActive && (
                <GreyButton handleClick={handleResetBtnClick}>Reset</GreyButton>
            )}
            {isNextBtnVisible && (
                <GreyButton handleClick={handleNextBtnClick}>Next</GreyButton>
            )}
        </div>
    );
};

GraphControlBtns.propTypes = {
    isDataLoading: bool,
    graphData: array,
    setDisplayedGraphData: func,
    xAxisRange: number,
};

export default GraphControlBtns;
