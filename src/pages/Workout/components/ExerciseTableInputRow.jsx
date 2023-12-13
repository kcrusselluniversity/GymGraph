import { TableCell, TableRow } from "@mui/material";
import ControlButton from "../../../components/ui/ControlButton";
import { useContext } from "react";
import { exerciseModalContext } from "../../../context/exerciseModalContext";

/**
 * Exercise Table Input Row component
 *
 * This component is used as the input row of the exercise table component.
 * It allows the user to input the weight and reps for their set of the
 * current exercise.
 */
const ExerciseTableInputRow = () => {
    // Destructure modal context to get the required state to control the input
    const {
        weightInput,
        setWeightInput,
        repsInput,
        setRepsInput,
        invalidWeightInput,
        setInvalidWeightInput,
        invalidRepsInput,
        setInvalidRepsInput,
    } = useContext(exerciseModalContext);

    // Destructure modal context for the required state to update the session
    // exercises state
    const { exerciseAdded, sessionExercises, setSessionExercises } =
        useContext(exerciseModalContext);

    const currentExerciseUid = exerciseAdded.uid;

    const handleAddBtnClick = () => {
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

        /* Add exercise row to session data */
        // Create a variable to hold the updated sets array
        let updatedSets;

        // Check if exercise has already been added to session
        const isExerciseAlreadyInSession =
            Object.keys(sessionExercises).includes(currentExerciseUid);

        if (isExerciseAlreadyInSession) {
            // Get the current exercises set data
            const currentExercise = sessionExercises[currentExerciseUid];
            const currentSets = currentExercise.sets;

            // Update the sets data with the new set
            updatedSets = [
                ...currentSets,
                { weight: +weightInput, reps: +repsInput },
            ];
        } else {
            // Create a new sets array to add to the session exercise object
            updatedSets = [{ weight: +weightInput, reps: +repsInput }];
        }

        // Update the session exercises object
        setSessionExercises({
            ...sessionExercises,
            [currentExerciseUid]: {
                exerciseObject: exerciseAdded,
                sets: updatedSets,
            },
        });

        // Clear the input fields
        setRepsInput("");
        setWeightInput("");
    };

    return (
        <TableRow>
            <TableCell align="center">
                <input
                    className={`exerciseTableInput ${
                        invalidWeightInput ? "invalidInputStyle" : ""
                    }`}
                    type="number"
                    placeholder="kg"
                    name="weight"
                    value={weightInput}
                    onChange={(e) =>
                        handleInputChange(
                            e,
                            setInvalidWeightInput,
                            setWeightInput
                        )
                    }
                />
            </TableCell>
            <TableCell align="center">
                <input
                    className={`exerciseTableInput ${
                        invalidRepsInput && "invalidInputStyle"
                    }`}
                    type="number"
                    name="reps"
                    value={repsInput}
                    onChange={(e) =>
                        handleInputChange(e, setInvalidRepsInput, setRepsInput)
                    }
                />
            </TableCell>
            <TableCell align="right">
                <ControlButton
                    buttonType="add"
                    handleClick={handleAddBtnClick}
                />
            </TableCell>
        </TableRow>
    );
};

export default ExerciseTableInputRow;

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
