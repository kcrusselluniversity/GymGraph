import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/appContext";
import UnderConstructionContent from "./UnderConstructionConent";
import GymGraphLogo from "../../components/ui/GymGraphLogo";
import "./underConstruction.css";

const UnderConstruction = () => {
    const { user } = useContext(AuthContext);
    const logoRoute = user ? "/user" : "/";

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
