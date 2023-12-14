import { bool, func, string } from "prop-types";

/**
 * ExerciseTableInput component
 *
 * The input html element for the user to input training data.
 */
const ExerciseTableInput = ({
    input,
    setInput,
    invalidInput,
    setInvalidInput,
    handleInputChange,
    placeholder = "",
}) => {
    return (
        <input
            className={`exerciseTableInput ${
                invalidInput ? "invalidInputStyle" : ""
            }`}
            type="number"
            placeholder={placeholder}
            name="weight"
            value={input}
            onChange={(e) => handleInputChange(e, setInvalidInput, setInput)}
        />
    );
};

ExerciseTableInput.propTypes = {
    input: string,
    setInput: func,
    invalidInput: bool,
    setInvalidInput: func,
    handleInputChange: func,
    placeholder: string,
};

export default ExerciseTableInput;
