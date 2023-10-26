import { Button } from "@mui/material";
import { Link } from "react-router-dom";

const LinkButton = ({text, className, to}) => {
    return (
        <Button
            variant="contained"
            className={className}
            component={Link}
            to={to}
            sx={{
                fontFamily: "Montserrat",
                textTransform: "none",
                fontSize: "20px",
            }}
        >
            {text}
        </Button>
    );
};

export default LinkButton;

