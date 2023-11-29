import { Button } from "@mui/material";
import { GreyButtonStyle } from "../../../data/constants";
import { func } from "prop-types";
import { ReactSVG } from "react-svg";
import restTimerIcon from '../../../assets/icons/RestTimer__Icon.svg'

const RestTimerButton = ({ handleClick }) => {
    return (
        <Button
            onClick={handleClick}
            className="RestTimerButton"
            sx={GreyButtonStyle}
        >
            <ReactSVG src={restTimerIcon} />
            <span>Rest Timer</span>
        </Button>
    );
};

RestTimerButton.propTypes = {
    handleClick: func,
};

export default RestTimerButton;
