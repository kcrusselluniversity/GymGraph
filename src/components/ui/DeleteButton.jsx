import { Button } from "@mui/material";
import { ReactSVG } from "react-svg";
import { func } from "prop-types";
import DeleteIcon from "../../assets/icons/Delete_Icon.svg";
import { BUTTON_BORDER_STYLE } from "../../data/constants";

const DeleteButton = ({ handleClick }) => {
    return (
        <Button
            onClick={handleClick}
            color="error"
            sx={{ ...BUTTON_BORDER_STYLE }}
        >
            <ReactSVG
                className="controlButton"
                src={DeleteIcon}
                fallback="Delete"
            />
        </Button>
    );
};

DeleteButton.propTypes = {
    handleClick: func,
};

export default DeleteButton;
