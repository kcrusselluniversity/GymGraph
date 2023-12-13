import { TableCell, TableRow } from "@mui/material";
import ControlButton from "../../../components/ui/ControlButton";
import { func, number } from "prop-types";

/**
 * ExerciseTableDataRow component
 * This component is to display each data row in the exercise table. It
 * displays the weight and number of reps for the exercise the user has already
 * completed in their current session.
 *
 * @param {number} weight: The weight used for the exercise.
 * @param {number} reps: The number of repetitions of the exercise completed.
 * @param {function} handleRowDelete: Function to handle the removal of a row
 */
const ExerciseTableDataRow = ({ weight, reps, handleRowDelete }) => {
    return (
        <TableRow>
            <TableCell size="small" align="center">
                {weight} kg
            </TableCell>
            <TableCell size="small" align="center">
                {reps}
            </TableCell>
            <TableCell
                size="small"
                align="right"
                className="exerciseSessionTable__controlBtns"
            >
                <ControlButton
                    buttonType="trash"
                    label="trash"
                    handleClick={handleRowDelete}
                />
                <ControlButton buttonType="edit" label="edit" />
            </TableCell>
        </TableRow>
    );
};

ExerciseTableDataRow.propTypes = {
    weight: number,
    reps: number,
    handleRowDelete: func,
};

export default ExerciseTableDataRow;
