import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { string } from "prop-types";
import { CTAButtonStyle } from "../../data/constants";

const LinkButton = ({ text, className, to }) => {
    return (
        <Button
            variant="contained"
            className={className}
            component={Link}
            to={to}
            sx={CTAButtonStyle}
        >
            {text}
        </Button>
    );
};

LinkButton.propTypes = {
    text: string.isRequired,
    className: string,
    to: string.isRequired,
};

LinkButton.defaultProps = {
    text: "Button",
    to: "/",
};

export default LinkButton;
