import { Button } from "@mui/material";
import { GREY_STYLE_BUTTON } from "../../data/constants";
import { func, node, string } from "prop-types";

const GreyButton = ({ children, handleClick, className }) => {
    return (
        <Button
            onClick={handleClick}
            className={`greyButton ${className}`}
            sx={GREY_STYLE_BUTTON}
        >
            {children}
        </Button>
    );
};

GreyButton.propTypes = {
    children: node,
    handleClick: func,
    className: string,
};

export default GreyButton;
