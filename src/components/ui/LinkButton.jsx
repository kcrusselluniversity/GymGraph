import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { string } from "prop-types";
import { CTA_BUTTON_STYLE  } from "../../data/constants";

/**
 * LinkButton Component
 * 
 * Generates a Material-UI Button component that serves as a React Router Link 
 * button.
 * 
 * Props:
 * @param {string} text - The text to display inside the button.
 * @param {string} className - An optional CSS class for styling.
 * @param {string} to - The target route to navigate when the button is clicked.
 * @example
 * // Example usage of LinkButton
 * <LinkButton text="Go to Dashboard" to="/dashboard" className="custom-button" />
 */
const LinkButton = ({ text, className, to }) => {
    return (
        <Button
            variant="contained"
            className={className}
            component={Link}
            to={to}
            sx={CTA_BUTTON_STYLE }
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
