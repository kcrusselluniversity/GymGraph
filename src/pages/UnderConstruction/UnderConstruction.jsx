import { Link } from "react-router-dom";
import GymGraphLogo from "../../components/ui/GymGraphLogo";
import "./underConstruction.css";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import UnderConstructionContent from "./UnderConstructionConent";

const UnderConstruction = () => {
    const { user } = useContext(AuthContext);
    const logoRoute = user ? "user" : "/";
    return (
        <div className="underConstruction">
            <header>
                <Link to={logoRoute}>
                    <GymGraphLogo />
                </Link>
            </header>
            <UnderConstructionContent />
        </div>
    );
};

export default UnderConstruction;
