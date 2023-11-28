import { useMediaQuery } from "@mui/material";
import { DisplaySmallScreen } from "../../data/constants";
import logoStandard from "../../assets/Logo.svg";
import logoSmall from "../../assets/Logo--small.svg";

const GymGraphLogo = () => {
    const isSmallScreen = useMediaQuery(`(width <= ${DisplaySmallScreen})`);
    const logo = isSmallScreen ? logoSmall : logoStandard;

    return <img src={logo} alt="GymGraph" className="gymGraphLogo" />;
};

export default GymGraphLogo;
