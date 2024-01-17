import { Table } from "@mui/material";
import { TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { number, string, PropTypes } from "prop-types";
import { useContext } from "react";
import { exerciseModalContext } from "../../../context/appContext";
import getExerciseByUid from "../../../utils/getExerciseByUid";
import ExerciseTableDisplayRow from "../../../components/ui/ExerciseTableDisplayRow";
/**
 * ExerciseItem component
 *
 * This component takes in an sessionExercise object and generates a table
 * to display this information.
 *
 * @param {array} sets: An array of objects that each represent the weight
 * and number of repetitions (reps) of a given set in the session.
 * @param {object} exerciseObject: An object that contains the exercise uid,
 * muscleGroup and exercise (name).
 */
const ExerciseItem = ({ sets, exerciseObject }) => {
    // Destructure the required exercise modal state
    const {
        setExerciseAdded,
        setExerciseModalState,
        setIsExerciseItemSelected,
        setIsExerciseModalOpen,
        setSelectedExerciseInfo,
    } = useContext(exerciseModalContext);

    // Return nothing if there are no sets for this exercise
    if (sets == undefined || sets.length == 0) return null;

    const setCount = sets.length;
    const { name: exerciseName } = exerciseObject;

    const handleExerciseItemClick = () => {
        setIsExerciseItemSelected(true);
        setSelectedExerciseInfo(exerciseObject.uid);
        setExerciseAdded(getExerciseByUid(exerciseObject.uid));
        setExerciseModalState("exercise_session_data");
        setIsExerciseModalOpen(true);
    };

    return (
        <div className="ExerciseItem Card" onClick={handleExerciseItemClick}>
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
                            <ExerciseTableDisplayRow
                                key={index}
                                set={set}
                                index={index}
                                setCount={setCount}
                                exerciseName={exerciseName}
                            />
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
        name: string,
    }),
    sets: PropTypes.arrayOf(
        PropTypes.shape({
            weight: number,
            reps: number,
        })
    ),
};

export default ExerciseItem;
