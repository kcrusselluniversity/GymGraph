import { Button } from "@mui/material";
import { ReactSVG } from "react-svg";
import { func, string, PropTypes } from "prop-types";
import { BUTTON_BORDER_STYLE } from "../../data/constants";
import AddIcon from "../../assets/icons/Add_Icon.svg";
import DeleteIcon from "../../assets/icons/Delete_Icon.svg";
import EditIcon from "../../assets/icons/Edit_Icon.svg";
import TrashIcon from "../../assets/icons/Trash_Icon.svg";
import PlusIcon from "../../assets/icons/Plus_Icon.svg";

// A color property is added to each button type to style the button
// using the MUI color property.
const buttonTypes = {
    add: { icon: PlusIcon, color: "success" },
    done: { icon: AddIcon, color: "success" },
    delete: { icon: DeleteIcon, color: "error" },
    edit: { icon: EditIcon, color: "primary" },
    trash: { icon: TrashIcon, color: "primary" },
};

const ControlButton = ({ buttonType, handleClick, label }) => {
    const { icon, color } = buttonTypes[buttonType];

    return (
        <Button
            onClick={handleClick}
            color={color}
            aria-label={label}
            className="controlButton"
            sx={{ ...BUTTON_BORDER_STYLE }}
        >
            <ReactSVG className="controlButton__svg" src={icon} fallback={label} />
        </Button>
    );
};

ControlButton.propTypes = {
    buttonType: PropTypes.oneOf(Object.keys(buttonTypes)).isRequired,
    handleClick: func,
    label: string,
};

export default ControlButton;
