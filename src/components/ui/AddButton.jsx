import { Button } from "@mui/material";
import { ReactSVG } from "react-svg";
import { func } from "prop-types";
import AddIcon from "../../assets/icons/Add_Icon.svg";

const AddButton = ({ handleClick }) => {
    return (
        <Button onClick={handleClick} color="success">
            <ReactSVG className="addButton" src={AddIcon} fallback="Add" />
        </Button>
    );
};

AddButton.propTypes = {
    handleClick: func,
};

export default AddButton;
