import { Table, TableContainer, Paper } from "@mui/material";
import { TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import ExerciseTableDataRow from "./ExerciseTableDataRow";
import ExerciseTableInputRow from "./ExerciseTableInputRow";
import { useContext } from "react";
import { exerciseModalContext } from "../../../context/exerciseModalContext";

/**
 * Exercise Session Table
 *
 * Once the user has added an exercise (eg bench press) this table is used
 * by the user to add the weight, reps and sets for this user during their
 * workout session.
 */
const ExerciseSessionTable = () => {
    // Destructure the exercise modal context for the required state
    const { sessionExercises, setSessionExercises, exerciseAdded } =
        useContext(exerciseModalContext);

    const { uid: addedExerciseUid } = exerciseAdded;

    let currentSessionSets = null;
    const isSetsAlreadyAddedToSession =
        Object.keys(sessionExercises).includes(addedExerciseUid);

    const handleRowDelete = (deleted_element_index) => {
        // Update this exercises sets
        const currentExercise = sessionExercises[addedExerciseUid];
        const currentSets = currentExercise.sets;
        const updatedSets = currentSets.filter(
            (_, element_index) => element_index != deleted_element_index
        );

        // Remove exercise from session if no sets left
        if (updatedSets.length === 0) {
            const updatedSessionExercises = { ...sessionExercises };
            delete updatedSessionExercises[addedExerciseUid];
            setSessionExercises({ ...updatedSessionExercises });
            return;
        } else {
            // Override the current exercise in the session exercises object
            // given the updated exercise
            setSessionExercises({
                ...sessionExercises,
                [addedExerciseUid]: {
                    ...currentExercise,
                    sets: updatedSets,
                },
            });
        }
    };

    if (isSetsAlreadyAddedToSession) {
        // Generate the rows of this exercise data
        const sets = sessionExercises[addedExerciseUid].sets;

        currentSessionSets = sets.map((set, index) => (
            <ExerciseTableDataRow
                key={index}
                weight={set.weight.toString()}
                reps={set.reps.toString()}
                index={index}
                handleRowDelete={() => handleRowDelete(index)}
            />
        ));
    }

    return (
        <TableContainer component={Paper}>
            <Table className="exerciseSessionTable">
                <ExerciseTableHead />
                <TableBody>
                    {currentSessionSets}
                    <ExerciseTableInputRow />
                </TableBody>
            </Table>
        </TableContainer>
    );
};

/**
 * Exercise table head component
 *
 * This is a helper component for the above exercise session table.
 * It has been separated from the main component of this module in order
 * for the main component to be more readable.
 */
const ExerciseTableHead = () => {
    return (
        <TableHead>
            <TableRow>
                <TableCell align="center" size="small">
                    Weight
                </TableCell>
                <TableCell align="center" size="small">
                    Reps
                </TableCell>
                <TableCell size="small"></TableCell>
            </TableRow>
        </TableHead>
    );
};

export default ExerciseSessionTable;
