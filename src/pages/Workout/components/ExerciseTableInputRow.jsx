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
    // Destructure modal context to get the required properties
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

        // Add exercise row to session data
        console.log("added");

        // Clear the input fields and reset invalid state
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

export default ExerciseTableInputRow;
