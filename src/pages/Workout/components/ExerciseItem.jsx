import { Table } from "@mui/material";
import { TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { number, string, PropTypes, func } from "prop-types";
import { useContext } from "react";
import { exerciseModalContext } from "../../../context/exerciseModalContext";

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

/**
 * ExerciseItem component
 *
 * This component takes in an sessionExercise object and generates a table
 * to display this information.
 *
 * @param {array} sets: An array of objects that each represent the weight
 * and number of repetitions (reps) of a given set in the session.
 * @param {object} exerciseObject: An object that contains the exercise uid,
 * muscleGroup and exerise (name).
 * @param {function} setIsExerciseModalOpen: The state setter that controls
 * the exercise modal.
 */
const ExerciseItem = ({ sets, exerciseObject, setIsExerciseModalOpen }) => {
    // Destructure the required exercise modal state
    const { setExerciseAdded, setExerciseModalState } =
        useContext(exerciseModalContext);

    // Return nothing if there are no sets for this exercise
    if (sets == undefined || sets.length == 0) return null;

    const setCount = sets.length;
    const { exercise: exerciseName } = exerciseObject;

    const handleExerciseItemClick = () => {
        setExerciseAdded(exerciseObject);
        setExerciseModalState("exercise_session_data");
        setIsExerciseModalOpen(true);
    };

    return (
        <div className="ExerciseItem" onClick={handleExerciseItemClick}>
            <Table aria-label="exercise item">
                <TableHead>
                    <TableRow>
                        <TableCell>Exercise</TableCell>
                        <TableCell align="center">Weight</TableCell>
                        <TableCell align="center">Reps</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {sets.map((set, index) => {
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
                    })}
                </TableBody>
            </Table>
        </div>
    );
};

ExerciseItem.propTypes = {
    exerciseObject: PropTypes.shape({
        uid: string,
        muscleGroup: string,
        exercise: string,
    }),
    sets: PropTypes.arrayOf(
        PropTypes.shape({
            weight: number,
            reps: number,
        })
    ),
    setIsExerciseModalOpen: func,
};

export default ExerciseItem;
