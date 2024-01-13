import { useContext } from "react";
import { historyContext } from "../../../context/historyContext";
import {
    CartesianGrid,
    Line,
    LineChart,
    ResponsiveContainer,
    XAxis,
    YAxis,
} from "recharts";
import { ACCENT_COLOR, CHART_MARGIN } from "../../../data/constants";

const VolumePerSessionGraph = () => {
    // Destructure required context
    const { userHistory } = useContext(historyContext);
    const maxValue = 1000;

    const data = [
        { name: "1", value: 400 },
        { name: "2", value: 300 },
        { name: "3", value: 200 },
        { name: "4", value: 400 },
    ];

    return (
        <ResponsiveContainer width="100%" height={300} className="Card">
            <LineChart
                data={data}
                margin={CHART_MARGIN}
            >
                <Line type="monotone" dataKey="value" stroke={ACCENT_COLOR} />
                <CartesianGrid stroke="#ccc" strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis domain={[0, maxValue]} />
            </LineChart>
        </ResponsiveContainer>
    );
};

export default VolumePerSessionGraph;
