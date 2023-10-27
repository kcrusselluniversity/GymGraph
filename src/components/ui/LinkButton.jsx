import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { accentColor } from "../../data/constants";

const LinkButton = ({ text, className, to }) => {
    return (
        <Button
            variant="contained"
            className={className}
            component={Link}
            to={to}
            sx={{
                bgcolor: accentColor,
                fontFamily: "Montserrat",
                textTransform: "none",
                fontSize: "16px",
                fontWeight: "600",
                my: "8px",
                px: "1.75rem",
                py: "4px"
            }}
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
    text: 'Button',
    to: '/'
}

export default LinkButton;