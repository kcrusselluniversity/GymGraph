import { Button } from "@mui/material";
import { GREY_STYLE_BUTTON } from "../../../data/constants";
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
        <Button
            onClick={handleClick}
            className="addExerciseButton"
            sx={GREY_STYLE_BUTTON}
        >
            <span className="addSymbol">+</span>
            <span>Exercise</span>
        </Button>
    );
};

AddExerciseButton.propTypes = {
    handleClick: func,
};

export default AddExerciseButton;
