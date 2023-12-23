import GreyButton from "../../../components/ui/GreyButton";
import { func } from "prop-types";

/**
 * Add exercise button component
 *
 * Used inside an exercise session to allow the user to add exercises to their
 * current workout session.
 *
 * @param {function} handleClick: click handler for exercise button
 */
const AddExerciseButton = ({ handleClick }) => {
    return (
        <GreyButton handleClick={handleClick} className="addExerciseButton">
            <span className="addSymbol">+</span>
            <span>Exercise</span>
        </GreyButton>
    );
};

AddExerciseButton.propTypes = {
    handleClick: func,
};

export default AddExerciseButton;
