import { Button } from "@mui/material";
import { PINK_CTA_BUTTON_STYLE } from "../../../data/constants";
import { func } from "prop-types";

const StartWorkoutButton = ({ handleClick }) => {
    return (
        <Button
            onClick={handleClick}
            className="startWorkoutButton"
            sx={PINK_CTA_BUTTON_STYLE}
        >
            <span>Start Workout</span>
        </Button>
    );
};

StartWorkoutButton.propTypes = {
    handleClick: func,
};

export default StartWorkoutButton;
