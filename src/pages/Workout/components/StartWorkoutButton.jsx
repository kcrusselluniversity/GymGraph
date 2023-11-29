import { Button } from "@mui/material";
import { PinkCTAButtonStyle } from "../../../data/constants";
import { func } from "prop-types";

const startWorkoutButtonStyle = {
    ...PinkCTAButtonStyle,
    width: "80%",
};

const StartWorkoutButton = ({ handleClick }) => {
    return (
        <Button
            onClick={handleClick}
            className="startWorkoutButton"
            sx={startWorkoutButtonStyle}
        >
            <span>Start Workout</span>
            <span className="addSymbol">+</span>
        </Button>
    );
};

StartWorkoutButton.propTypes = {
    handleClick: func,
};

export default StartWorkoutButton;
