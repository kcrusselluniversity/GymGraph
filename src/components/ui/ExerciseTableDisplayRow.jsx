import { TableCell, TableRow } from "@mui/material";
import { PropTypes, number, string } from "prop-types";
import SetData from "./SetData";

const ExerciseTableDisplayRow = ({ set, index, setCount, exerciseName }) => {
    return (
        <TableRow key={index}>
            {index == 0 && (
                <TableCell
                    rowSpan={setCount}
                    className="ExerciseItem__exerciseName"
                >
                    {exerciseName}
                </TableCell>
            )}
            <SetData weight={set.weight} reps={set.reps} />
        </TableRow>
    );
};

ExerciseTableDisplayRow.propTypes = {
    set: PropTypes.shape({
        weight: number,
        reps: number,
    }),
    index: number,
    setCount: number,
    exerciseName: string,
};

export default ExerciseTableDisplayRow;
