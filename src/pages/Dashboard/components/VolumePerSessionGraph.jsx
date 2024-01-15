import { useContext, useEffect, useState } from "react";
import { historyContext } from "../../../context/historyContext";
import { ACCENT_COLOR, DEFAULT_MAX_AXIS_VALUE } from "../../../data/constants";
import GreyButton from "../../../components/ui/GreyButton";
import calculateSessionsVolumeData from "../utils/calculateSessionsVolumeData";
import {
    CartesianGrid,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";

const GRAPH_DAY_RANGE = 6;

const VolumePerSessionGraph = () => {
    // Destructure required context
    const { userHistory, isLoading } = useContext(historyContext);

    // Set state variables
    const [sessionsVolumeData, setSessionsVolumeData] = useState([]);
    const [maxValue, setMaxValue] = useState(DEFAULT_MAX_AXIS_VALUE);
    const [displayedSessionVolumeData, setDisplayedSessionVolumeData] =
        useState([]);

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
            const sessionsVolumeData = calculateSessionsVolumeData(userHistory);

            // Calculate derived values
            const initialEndIndex = sessionsVolumeData.length - 1;
            const maxValue = Math.max(
                ...sessionsVolumeData.map((data) => data.value)
            );

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
            const initialDisplayData = sessionsVolumeData.slice(
                initialStartIndex,
                initialEndIndex + 1
            );

            // Update the state
            setMaxValue(maxValue);
            setEndIndex(initialEndIndex);
            setDisplayedSessionVolumeData(initialDisplayData);
            setSessionsVolumeData(sessionsVolumeData);
            setIsLastBlockOfData(true);

            // Store initial data in state variables for later usage
            setInitialEndIndex(initialEndIndex);
            setInitialDisplayData(initialDisplayData);
        }
    }, [isLoading]);

    const handleAllBtnClick = () => {
        setIsAllActive(true);
        setDisplayedSessionVolumeData(sessionsVolumeData);
    };

    const handleResetBtnClick = () => {
        // Update isFirstBlock boolean if required
        const calculatedStartIndex = initialEndIndex - GRAPH_DAY_RANGE;
        calculatedStartIndex < 0
            ? setIsFirstBlockOfData(true)
            : setIsFirstBlockOfData(false);

        // Reset state to initial state
        setEndIndex(initialEndIndex);
        setDisplayedSessionVolumeData(initialDisplayData);
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
        const updatedDisplayedSessionData = sessionsVolumeData.slice(
            newStartIndex,
            newEndIndex + 1
        );

        // Update state
        setDisplayedSessionVolumeData(updatedDisplayedSessionData);
        setEndIndex(newEndIndex);
        setIsLastBlockOfData(false);
    };

    const handleNextBtnClick = () => {
        
    }

    const toolTipLabelFormatter = (name) => {
        const [date, time] = name.split(' ');
        return `Session date: ${time} ${date}`
    }

    return (
        <div className="volumePerSessionGraph Card">
            <h3 className="volumePerSessionGraph__title">
                Volume per Session Graph
            </h3>
            <ResponsiveContainer width="100%" height={250}>
                <LineChart data={displayedSessionVolumeData}>
                    <Line
                        type="monotone"
                        dataKey="value"
                        stroke={ACCENT_COLOR}
                    />
                    <CartesianGrid stroke="#ccc" strokeDasharray="3 3" />
                    <XAxis
                        dataKey="date"
                        tick={
                            displayedSessionVolumeData.length <= GRAPH_DAY_RANGE
                        }
                    />
                    <YAxis domain={[0, maxValue]} unit="kg" />
                    <Tooltip
                        formatter={(value) => [`${value} kg`, "Volume"]}
                        labelFormatter={toolTipLabelFormatter}
                    />
                </LineChart>
            </ResponsiveContainer>
            <div className="volumePerSessionGraph__controlBtns">
                {!isAllActive && !isFirstBlockOfData && (
                    <GreyButton handleClick={handlePrevBtnClick}>
                        Prev
                    </GreyButton>
                )}
                {!isAllActive && (
                    <GreyButton handleClick={handleAllBtnClick}>All</GreyButton>
                )}
                {isAllActive && (
                    <GreyButton handleClick={handleResetBtnClick}>
                        Reset
                    </GreyButton>
                )}
                {!isAllActive && !isLastBlockOfData && (
                    <GreyButton>Next</GreyButton>
                )}
            </div>
        </div>
    );
};

export default VolumePerSessionGraph;
