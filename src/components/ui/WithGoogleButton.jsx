import googleIconSVG from "../../assets/icons/google.svg";
import { Button } from "@mui/material";
import { PropTypes } from "prop-types";

const WithGoogleButton = ({ text }) => {
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
        <Button variant="outlined" startIcon={googleIcon} sx={buttonStyle}>
            {text} with Google
        </Button>
    );
};

WithGoogleButton.propTypes = {
    text: PropTypes.string.isRequired,
};

export default WithGoogleButton;
