import { GREY_STYLE_BUTTON } from "../../data/constants.js";
import { Button } from "@mui/material";
import { ReactSVG } from "react-svg";
import BackIcon from "../../assets/icons/Back_Icon.svg";
import { func } from "prop-types";

const BackButton = ({ handleBackArrowClick }) => {
    return (
        <Button
            sx={{
                ...GREY_STYLE_BUTTON,
                padding: "0px",
                position: "absolute",
                margin: "1rem",
            }}
            onClick={handleBackArrowClick}
            className="backButton"
        >
            <ReactSVG className="links__icon" src={BackIcon} fallback="Back" />
        </Button>
    );
};

BackButton.propTypes = {
    handleBackArrowClick: func,
};

export default BackButton;
