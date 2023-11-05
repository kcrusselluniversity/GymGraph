import { NavLink } from "react-router-dom";
import LogoutButton from "./LogoutButton";

const NavBar = () => {
    return (
            <nav>
                <NavLink to="/user">Dashboard</NavLink>
                <NavLink to="/user/workout">Workout</NavLink>
                <NavLink to="/user/history">History</NavLink>
                <NavLink to="/user/metrics">Metrics</NavLink>
                <NavLink to="/user/profile">Profile</NavLink>
                <NavLink to="/user/settings">Settings</NavLink>
                <LogoutButton />
            </nav>
    );
};

export default NavBar;
