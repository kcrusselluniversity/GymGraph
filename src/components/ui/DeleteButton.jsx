import { Button } from "@mui/material";
import { ReactSVG } from "react-svg";
import { func } from "prop-types";
import DeleteIcon from "../../assets/icons/Delete_Icon.svg";

const AddButton = ({ handleClick }) => {
    return (
        <Button onClick={handleClick} color="error">
            <ReactSVG
                className="deleteButton"
                src={DeleteIcon}
                fallback="Delete"
            />
        </Button>
    );
};

AddButton.propTypes = {
    handleClick: func,
};

export default AddButton;
