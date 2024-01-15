import { useContext, useEffect, useState } from "react";
import { historyContext } from "../../../context/historyContext";
import { ACCENT_COLOR, DEFAULT_MAX_AXIS_VALUE } from "../../../data/constants";
import GreyButton from '../../../components/ui/GreyButton';
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

const GRAPH_DAY_RANGE = 7;

const VolumePerSessionGraph = () => {
    // Destructure required context
    const { userHistory, isLoading } = useContext(historyContext);

    // Set state variables
    const [sessionsVolumeData, setSessionsVolumeData] = useState([]);
    const [maxValue, setMaxValue] = useState(DEFAULT_MAX_AXIS_VALUE);
    const [endIndex, setEndIndex] = useState(null);
    const [displayedSessionVolumeData, setDisplayedSessionVolumeData] = useState(null);

    // Parse data to display in graph once userHistory data has loaded
    useEffect(() => {
        if (!isLoading) {
            const sessionsVolumeData = calculateSessionsVolumeData(userHistory);

            // Update the state
            setMaxValue(Math.max(...sessionsVolumeData.map((data) => data.value)));
            setSessionsVolumeData(sessionsVolumeData);
        }
    }, [isLoading]);

    return (
        <div className="volumePerSessionGraph Card">
            <h3 className="volumePerSessionGraph__title">Volume per Session Graph</h3>
            <ResponsiveContainer width="100%" height={250}>
                <LineChart data={sessionsVolumeData}>
                    <Line
                        type="monotone"
                        dataKey="value"
                        stroke={ACCENT_COLOR}
                    />
                    <CartesianGrid stroke="#ccc" strokeDasharray="3 3" />
                    <XAxis
                        dataKey="date"
                        tick={sessionsVolumeData.length < GRAPH_DAY_RANGE}
                    />
                    <YAxis domain={[0, maxValue]} unit="kg" />
                    <Tooltip formatter={(value, name) => [`${value} kg`, 'Volume']} labelFormatter={name => `Session date: ${name}`}/>
                </LineChart>
            </ResponsiveContainer>
            <div className="volumePerSessionGraph__controlBtns">
                <GreyButton>Prev</GreyButton>
                <GreyButton>All</GreyButton>
                <GreyButton>Next</GreyButton>
            </div>
        </div>
    );
};

export default VolumePerSessionGraph;
