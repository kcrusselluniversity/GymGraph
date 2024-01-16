import { PieChart, Pie, Cell, Legend } from "recharts";
import { historyContext } from "../../../context/historyContext";
import { useContext, useEffect, useState } from "react";

const PIE_CHART_COLORS = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#A633FF",
];
const RADIAN = Math.PI / 180;

const MuscleGroupPieChart = () => {
    const { userHistory, isLoading } = useContext(historyContext);
    const [muscleGroupSetData, setMuscleGroupSetData] = useState([]);

    // Parse data to display in graph once userHistory data has loaded
    useEffect(() => {
        if (!isLoading) {
            const muscleGroupSetTally = {};
            const sessionsData = userHistory.map(
                (session) => session.exercises
            );
            sessionsData.forEach((session) => {
                // Loop through each exercise and add the set count to the
                // corresponding muscleGroup property of the muscleGroupTally
                // object
                Object.values(session).forEach((exercise) => {
                    const { muscleGroup, sets } = exercise;
                    const setCount = sets.length;
                    const currentTally = muscleGroupSetTally[muscleGroup];

                    // Add the set count for this exercise to the tally object
                    muscleGroupSetTally[muscleGroup] =
                        currentTally === undefined
                            ? setCount
                            : currentTally + setCount;
                });
            });

            const muscleGroupSetsArray = Object.keys(muscleGroupSetTally).map(
                (muscleGroup) => {
                    return {
                        muscleGroup,
                        value: muscleGroupSetTally[muscleGroup],
                    };
                }
            );

            // Set state
            setMuscleGroupSetData(muscleGroupSetsArray);
        }
    }, [isLoading]);

    return (
        <div className="muscleGroupPieChart Card">
            <h3 className="muscleGroupPieChart__title">Muscle Groups Worked</h3>
            <PieChart width={320} height={320}>
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
                                PIE_CHART_COLORS[
                                    index % PIE_CHART_COLORS.length
                                ]
                            }
                        />
                    ))}
                </Pie>
                <Legend />
            </PieChart>
        </div>
    );
};

const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
}) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.6;
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
