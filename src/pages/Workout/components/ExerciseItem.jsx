import { Table } from "@mui/material";
import { TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { number, string, PropTypes } from "prop-types";

const SetData = ({ weight, reps }) => {
    return (
        <>
            <TableCell align="center">{weight} kg</TableCell>
            <TableCell align="center">{reps}</TableCell>
        </>
    );
};

SetData.propTypes = {
    weight: number,
    reps: number,
};

const ExerciseItem = ({ exercise }) => {
    if (exercise?.sets == undefined || exercise.sets.length == 0) return null;

    const setCount = exercise.sets.length;

    return (
        <div className="ExerciseItem">
            <Table aria-label="exercise item">
                <TableHead>
                    <TableRow>
                        <TableCell>Exercise</TableCell>
                        <TableCell align="center">Weight</TableCell>
                        <TableCell align="center">Reps</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {exercise.sets.map((set, index) => {
                        return (
                            <TableRow key={index}>
                                {index == 0 && (
                                    <TableCell rowSpan={setCount}>
                                        {exercise?.name}
                                    </TableCell>
                                )}
                                <SetData weight={set.weight} reps={set.reps} />
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </div>
    );
};

ExerciseItem.propTypes = {
    exercise: PropTypes.shape({
        name: string,
        sets: PropTypes.arrayOf(
            PropTypes.shape({
                weight: number,
                reps: number,
            })
        ),
    }),
};

export default ExerciseItem;
