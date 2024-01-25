import { PieChart, Pie, Cell, Legend, Tooltip } from "recharts";
import { historyContext } from "../../../context/appContext";
import { useContext, useEffect, useState } from "react";
import tallyMuscleGroupSets from "../utils/tallyMuscleGroupSets";
import {
    LABEL_RADIUS_SCALING_FACTOR,
    CHART_COLORS,
    RADIAN,
    MUSCLE_GROUP_CHART_DESCRIPTION,
} from "../../../data/constants";
import LightTooltip from "../../../components/ui/LightTooltip";

/**
 * Muscle group pie chart component
 *
 * This component displays a pie chart representing the distribution of
 * muscle groups worked based on a user's exercise history.
 */
const MuscleGroupPieChart = () => {
    const { userHistory, isLoading } = useContext(historyContext);
    const [muscleGroupSetData, setMuscleGroupSetData] = useState([]);

    // Parse data to display in graph once userHistory data has loaded
    useEffect(() => {
        if (!isLoading) {
            const muscleGroupSetsArray = tallyMuscleGroupSets(userHistory);

            // Set state
            setMuscleGroupSetData(muscleGroupSetsArray);
        }
    }, [isLoading]);

    return (
        <div className="muscleGroupPieChart Card">
            <LightTooltip title={MUSCLE_GROUP_CHART_DESCRIPTION} placement="top">
                <h3 className="muscleGroupPieChart__title">Muscle Groups Worked</h3>
            </LightTooltip>
            <PieChart width={270} height={260}>
                <Pie
                    data={muscleGroupSetData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={renderCustomizedLabel}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    nameKey="muscleGroup"
                >
                    {muscleGroupSetData.map((_, index) => (
                        <Cell
                            key={`cell-${index}`}
                            fill={
                                CHART_COLORS[
                                    index % CHART_COLORS.length
                                ]
                            }
                        />
                    ))}
                </Pie>
                <Tooltip formatter={(value, name) => [`${value} sets`, name]}/>
                <Legend />
            </PieChart>
        </div>
    );
};
/**
 * Util function to generate a label for each Cell of the pie chart
 */

const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
}) => {
    const radius =
        innerRadius + (outerRadius - innerRadius) * LABEL_RADIUS_SCALING_FACTOR;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
        <text
            x={x}
            y={y}
            fill="white"
            textAnchor={x > cx ? "start" : "middle"}
            dominantBaseline="central"
        >
            {`${(percent * 100).toFixed(0)}%`}
        </text>
    );
};

export default MuscleGroupPieChart;
