import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../config/firebase";
import { useMediaQuery } from "@mui/material";
import { ReactSVG } from "react-svg";
import { NavBarDisplaySmallScreen } from "../../data/constants";
import LightTooltip from "./LightTooltip";
import logoutIcon from '../../assets/icons/Logout_Icon.svg'
import "./LogoutButton.css"

const LogoutButton = () => {
    const navigate = useNavigate();
    const isSmallScreen =  useMediaQuery(`(width <= ${NavBarDisplaySmallScreen})`);


    const handleClick = async () => {
        try {
            await signOut(auth);
        } catch (err) {
            console.error(err);
        }

        navigate("/");
    };

    return (
        <button className="logoutButton" onClick={handleClick}>
            {isSmallScreen ? <LightTooltip title="Log out" data-testid="tooltip">
                <span>
                    <ReactSVG src={logoutIcon}/> 
                </span>
            </LightTooltip>: "Log Out"}
        </button>
    );
};

export default LogoutButton;
