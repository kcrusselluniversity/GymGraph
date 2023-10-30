import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
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
    text: PropTypes.string.isRequired,
    className: PropTypes.string,
    to: PropTypes.string.isRequired,
};

LinkButton.defaultProps = {
    text: "Button",
    to: "/",
};

export default LinkButton;
