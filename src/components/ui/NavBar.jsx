import { NavLink } from "react-router-dom";
import LogoutButton from "./LogoutButton";
import "./NavBar.css";
import GymGraphLogo from "./GymGraphLogo";

const NavBar = () => {
    return (
        <nav className="navbar">
            <GymGraphLogo />
            <div className="navbar__links">
                <NavLink className="link" to="/user/dashboard">
                    Dashboard
                </NavLink>
                <NavLink className="link" to="/user/workout">
                    Workout
                </NavLink>
                <NavLink className="link" to="/user/history">
                    History
                </NavLink>
                <NavLink className="link" to="/user/metrics">
                    Metrics
                </NavLink>
                <NavLink className="link" to="/user/profile">
                    Profile
                </NavLink>
                <NavLink className="link" to="/user/settings">
                    Settings
                </NavLink>
            </div>
            <LogoutButton />
        </nav>
    );
};

export default NavBar;
