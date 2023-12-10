import { Button } from "@mui/material";
import { ReactSVG } from "react-svg";
import { func } from "prop-types";
import AddIcon from "../../assets/icons/Add_Icon.svg";
import { BUTTON_BORDER_STYLE } from "../../data/constants";

const AddButton = ({ handleClick }) => {
    return (
        <Button
            onClick={handleClick}
            color="success"
            aria-label="add"
            sx={{ ...BUTTON_BORDER_STYLE }}
        >
            <ReactSVG className="controlButton" src={AddIcon} fallback="Add" />
        </Button>
    );
};

AddButton.propTypes = {
    handleClick: func,
};

export default AddButton;
