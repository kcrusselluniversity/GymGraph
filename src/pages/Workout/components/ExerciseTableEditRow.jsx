import { TableCell, TableRow } from "@mui/material";
import ControlButton from "../../../components/ui/ControlButton";
import { useContext, useState } from "react";
import { exerciseModalContext } from "../../../context/exerciseModalContext";
import ExerciseTableInput from "./ExerciseTableInput";
import { func, number, string } from "prop-types";
import { Set } from "../../../utils/classes/SessionExercises";

/**
 * Exercise Table Edit Row component
 *
 * This component renders in place of a Exercise Table Row Data component
 * when the user clicks on the rows edit button.
 * The user can edit the current rows data and commit it to the current
 * exercise session.
 * @param {string} weight: The current weight stored in the row.
 * @param {string} reps: The current reps stored in the row.
 * @param {number} index: The index of the row in the table.
 * @param {function} setIsEditMode: State setter function to set the edit mode
 * of the current row.
 */
const ExerciseTableEditRow = ({ weight, reps, index, setIsEditMode }) => {
    // State for the exercises sets and reps input
    const [weightInput, setWeightInput] = useState(weight);
    const [repsInput, setRepsInput] = useState(reps);
    const [invalidWeightInput, setInvalidWeightInput] = useState(false);
    const [invalidRepsInput, setInvalidRepsInput] = useState(false);

    // Destructure modal context for the required state to update the session
    // exercises state
    const { exerciseAdded, sessionExercises, setSessionExercises } =
        useContext(exerciseModalContext);

    const currentExerciseUid = exerciseAdded.uid;

    const handleDoneBtnClick = () => {
        // Check if any input fields have not had values entered
        const isWeightInputEmpty = weightInput === "";
        const isRepsInputEmpty = repsInput === "";

        if (isWeightInputEmpty || isRepsInputEmpty) {
            setInvalidWeightInput(isWeightInputEmpty);
            setInvalidRepsInput(isRepsInputEmpty);
            return;
        }

        // Check if the input fields are invalid
        if (invalidWeightInput || invalidRepsInput) return;

        // Create Set object for new set
        const updatedSet = new Set(+weightInput, +repsInput)

        // Update session exercises exercise set data
        setSessionExercises(sessionExercises.updateSetFromExercise(currentExerciseUid, index, updatedSet))

        // Finish the edit mode
        setIsEditMode(false);
    };

    return (
        <TableRow className="exerciseTableInputRow">
            <TableCell align="center">
                <ExerciseTableInput
                    input={weightInput}
                    setInput={setWeightInput}
                    invalidInput={invalidWeightInput}
                    setInvalidInput={setInvalidWeightInput}
                    handleInputChange={handleInputChange}
                    placeholder="kg"
                />
            </TableCell>
            <TableCell align="center">
                <ExerciseTableInput
                    input={repsInput}
                    setInput={setRepsInput}
                    invalidInput={invalidRepsInput}
                    setInvalidInput={setInvalidRepsInput}
                    handleInputChange={handleInputChange}
                />
            </TableCell>
            <TableCell align="right">
                <ControlButton
                    buttonType="done"
                    handleClick={handleDoneBtnClick}
                />
            </TableCell>
        </TableRow>
    );
};

ExerciseTableEditRow.propTypes = {
    weight: string,
    reps: string,
    index: number,
    setIsEditMode: func,
};

export default ExerciseTableEditRow;

/**
 * Handle input change function
 *
 * @param {object} e: The browser event
 * @param {function} setInvalidFunction: The state setter function for the
 * invalid input React state
 * @param {function} setValueFunction: The state setter function for the
 * inputs value React state
 */
const handleInputChange = (e, setInvalidFunction, setValueFunction) => {
    const inputString = e.target.value;

    // Convert string to numeric type
    const inputNumeric = +inputString;

    // Validate input
    const isInvalidInput = isNaN(inputNumeric) || inputNumeric <= 0;
    setInvalidFunction(isInvalidInput);

    setValueFunction(inputString);
};
