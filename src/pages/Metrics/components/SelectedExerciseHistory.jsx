import { useContext } from "react";
import { metricsContext } from "../../../context/appContext";
import { object } from "prop-types";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
} from "@mui/material";
import SetData from "../../../components/ui/SetData";
import FormattedDate from "../../../components/ui/FormattedDate";

const NO_HISTORY_MESSAGE = "You have no history for this exercise yet";

const SelectedExerciseHistory = () => {
    // Destructure required context
    const { selectedExerciseData } = useContext(metricsContext);

    if (selectedExerciseData.length === 0) {
        return <div>{NO_HISTORY_MESSAGE}</div>;
    }

    const componentArray = selectedExerciseData.map((session) => {
        const { sets, startTime } = session;
        const setCount = sets.length;

        const dataRows = sets.map((set, index) => {
            const { weight, reps } = set;

            const className =
                index === setCount - 1 ? "ExerciseTable__lastRow" : "";

            return (
                <TableRow key={index} className={className}>
                    {index === 0 && (
                        <TableCell rowSpan={setCount}>
                            <FormattedDate dateObject={startTime} />
                        </TableCell>
                    )}
                    <SetData weight={weight} reps={reps} />
                </TableRow>
            );
        });

        return dataRows;
    });

    return (
        <div className="metrics__selectedExerciseHistory Card">
            <Table stickyHeader>
                <TableHead className="selectedExerciseHistory__tHead">
                    <TableRow>
                        <TableCell align="center">Date</TableCell>
                        <TableCell align="center">Weight</TableCell>
                        <TableCell align="center">Reps</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {componentArray}
                </TableBody>
            </Table>
        </div>
    );
};

SelectedExerciseHistory.propTypes = {
    selectedExercise: object,
};

export default SelectedExerciseHistory;
