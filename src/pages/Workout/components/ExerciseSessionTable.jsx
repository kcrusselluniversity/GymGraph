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
    const {
        sessionExercises,
        setSessionExercises,
        exerciseAdded,
        setIsExerciseModalOpen,
    } = useContext(exerciseModalContext);

    const { uid: addedExerciseUid } = exerciseAdded;

    let currentSessionSets = null;
    const isSetsAlreadyAddedToSession = Object.keys(
        sessionExercises.getExercises()
    ).includes(addedExerciseUid);

    const handleRowDelete = (deleted_element_index) => {
        const updatedSessionExercises = sessionExercises.removeSetFromExercise(
            addedExerciseUid,
            deleted_element_index
        );
        
        // Check if the exercise has been removed from the session given 
        // the removal of the set by the user
        const isExerciseRemovedFromSession = 
            updatedSessionExercises.getExercises()[addedExerciseUid] === undefined;

        // Close modal if no sets remaining for this exercise
        if (isExerciseRemovedFromSession) setIsExerciseModalOpen(false);

        // Update session exercises object
        setSessionExercises(updatedSessionExercises);
    };

    if (isSetsAlreadyAddedToSession) {
        // Generate the rows of this exercise data
        const sets = sessionExercises.getExercises()[addedExerciseUid].sets;

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
