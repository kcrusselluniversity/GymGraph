import googleIconSVG from "../../assets/icons/google.svg";
import { Button } from "@mui/material";
import { string, func } from "prop-types";

/**
 * WithGoogleButton Component
 *
 * Generates a Material-UI Button component to be used to allow users
 * to sign in with Google using OAuth.
 *
 * Props:
 * @param {string} {text}: The text you want to be displayed in the template
 * string.
 */
const WithGoogleButton = ({ text, onClick }) => {
    const googleIconHeight = "30px";
    const googleIcon = (
        <img src={googleIconSVG} height={googleIconHeight} alt="Google Icon" />
    );

    const buttonStyle = {
        fontFamily: "Montserrat",
        fontWeight: "500",
        textTransform: "none",
        fontSize: "16px",
        my: "8px",
        px: "1.75rem",
        py: "4px",
    };

    return (
        <Button
            variant="outlined"
            startIcon={googleIcon}
            sx={buttonStyle}
            onClick={onClick}
        >
            {text} with Google
        </Button>
    );
};

WithGoogleButton.propTypes = {
    text: string.isRequired,
    onClick: func,
};

export default WithGoogleButton;
