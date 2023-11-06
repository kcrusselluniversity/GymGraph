import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/")
    }

    return <Button onClick={handleClick}>Log Out</Button>;
};

export default LogoutButton;
