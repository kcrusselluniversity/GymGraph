import { useContext, useEffect, useState } from "react";
import { historyContext } from "../../../context/historyContext";
import {
    CartesianGrid,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";
import { ACCENT_COLOR } from "../../../data/constants";
import dayjs from "dayjs";
import GreyButton from '../../../components/ui/GreyButton';

const GRAPH_DAY_RANGE = 7;

const VolumePerSessionGraph = () => {
    // Destructure required context
    const { userHistory, isLoading } = useContext(historyContext);

    // Set state variables
    const [sessionsData, setSessionsData] = useState([]);
    const [maxValue, setMaxValue] = useState(100);

    // Parse data to display in graph once it is loaded
    useEffect(() => {
        if (!isLoading) {
            const sessionsData = [];

            // Loop over each session, and add up the total weight lifted for each
            // exercise of that session. Then add an object representing the
            // start time of that session, along with the total volume (weight
            // lifted) for that session to the sessionsData array.
            userHistory.map((session) => {
                const { startTime } = session;

                // Loop over each exercise and calculate the total weight
                // lifted for that exercise
                const { exercises } = session;
                const TotalWeightPerExercise = Object.values(exercises).map(
                    (exercise) => {
                        const totalWeightLiftedForExercise = exercise.sets
                            .map((set) => set.weight * set.reps)
                            .reduce((val, prev) => val + prev, 0);

                        return totalWeightLiftedForExercise;
                    }
                );

                const TotalWeightForSession = TotalWeightPerExercise.reduce(
                    (val, prev) => val + prev,
                    0
                );

                // Format startTime for use in the graph X axis
                let startTimeFormatted = new dayjs(startTime);
                startTimeFormatted =
                    startTimeFormatted.format("DD-MM-YY hh:mm");
                const sessionData = {
                    date: startTimeFormatted,
                    value: TotalWeightForSession,
                };
                sessionsData.push(sessionData);
            });

            // Update the state
            setMaxValue(Math.max(...sessionsData.map((data) => data.value)));
            setSessionsData(sessionsData);
        }
    }, [isLoading]);

    return (
        <div className="volumePerSessionGraph Card">
            <h3 className="volumePerSessionGraph__title">Volume per Session Graph</h3>
            <ResponsiveContainer width="100%" height={250}>
                <LineChart data={sessionsData}>
                    <Line
                        type="monotone"
                        dataKey="value"
                        stroke={ACCENT_COLOR}
                    />
                    <CartesianGrid stroke="#ccc" strokeDasharray="3 3" />
                    <XAxis
                        dataKey="date"
                        tick={sessionsData.length < GRAPH_DAY_RANGE}
                    />
                    <YAxis domain={[0, maxValue]} unit="kg" />
                    <Tooltip />
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
