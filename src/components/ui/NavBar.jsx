import { NavLink, Link } from "react-router-dom";
import { ReactSVG } from "react-svg";
import LogoutButton from "./LogoutButton";
import GymGraphLogo from "./GymGraphLogo";
import DashboardIcon from "../../assets/icons/Dashboard_Icon.svg";
import WorkoutIcon from "../../assets/icons/Workout_Icon.svg";
import HistoryIcon from "../../assets/icons/History_Icon.svg";
import MetricsIcon from "../../assets/icons/Metrics_Icon.svg";
import ProfileIcon from "../../assets/icons/Profile_Icon.svg";
import SettingsIcon from "../../assets/icons/Settings_Icon.svg";
import "./NavBar.css";

const NavBar = () => {
    return (
        <nav className="navbar">
            <Link to="/user/dashboard">
                <GymGraphLogo />
            </Link>
            <div className="navbar__links">
                <NavLink className="link" to="/user/dashboard">
                    <ReactSVG src={DashboardIcon} className="links__icon" />
                    <p>Dashboard</p>
                </NavLink>
                <NavLink className="link" to="/user/workout">
                    <ReactSVG src={WorkoutIcon} className="links__icon" />
                    <p>Workout</p>
                </NavLink>
                <NavLink className="link" to="/user/history">
                    <ReactSVG src={HistoryIcon} className="links__icon" />
                    <p>History</p>
                </NavLink>
                <NavLink className="link" to="/user/metrics">
                    <ReactSVG src={MetricsIcon} className="links__icon" />
                    <p>Metrics</p>
                </NavLink>
                <NavLink className="link" to="/user/profile">
                    <ReactSVG src={ProfileIcon} className="links__icon" />
                    <p>Profile</p>
                </NavLink>
                <NavLink className="link" to="/user/settings">
                    <ReactSVG src={SettingsIcon} className="links__icon" />
                    <p>Settings</p>
                </NavLink>
            </div>
            <LogoutButton />
        </nav>
    );
};

export default NavBar;
