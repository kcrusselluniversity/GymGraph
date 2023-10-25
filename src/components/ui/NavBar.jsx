import { NavLink } from "react-router-dom";

const NavBar = () => {
    return (
            <nav>
                <NavLink to="/user">Dashboard</NavLink>
                <NavLink to="/user/workout">Workout</NavLink>
                <NavLink to="/user/history">History</NavLink>
                <NavLink to="/user/metrics">Metrics</NavLink>
                <NavLink to="/user/profile">Profile</NavLink>
                <NavLink>Settings</NavLink>
                <NavLink to="/">Log Out</NavLink>
            </nav>
    );
};

export default NavBar;
