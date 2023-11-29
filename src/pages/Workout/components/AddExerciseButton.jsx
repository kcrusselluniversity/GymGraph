import { Button } from "@mui/material";
import { GreyButtonStyle } from "../../../data/constants";
import { func } from "prop-types";

const addExerciseButtonStyle = {
    ...GreyButtonStyle,
    width: "80%",
};

const AddExerciseButton = ({ handleClick }) => {
    return (
        <Button
            onClick={handleClick}
            className="addExerciseButton"
            sx={addExerciseButtonStyle}
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
