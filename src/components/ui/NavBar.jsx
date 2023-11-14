import { NavLink, Link } from "react-router-dom";
import { ReactSVG } from "react-svg";
import { useMediaQuery } from "@mui/material";
import LogoutButton from "./LogoutButton";
import GymGraphLogo from "./GymGraphLogo";
import DashboardIcon from "../../assets/icons/Dashboard_Icon.svg";
import WorkoutIcon from "../../assets/icons/Workout_Icon.svg";
import HistoryIcon from "../../assets/icons/History_Icon.svg";
import MetricsIcon from "../../assets/icons/Metrics_Icon.svg";
import { NavBarDisplaySmallScreen } from "../../data/constants.js";
import IconWithTooltip from "./IconWithTooltip.jsx";
import "./NavBar.css";

const NavBar = () => {
    // Determine the screen size based on the screen width
    const isSmallScreen = useMediaQuery(
        `(width <= ${NavBarDisplaySmallScreen})`
    );

    return (
        <nav className="navbar">
            <Link to="/user/dashboard">
                <GymGraphLogo />
            </Link>
            <div className="navbar__links">
                <NavLink className="link" to="/user/dashboard">
                    {isSmallScreen ? (
                        <IconWithTooltip
                            title="Dashboard"
                            icon={DashboardIcon}
                        />
                    ) : (
                        <>
                            <ReactSVG
                                src={DashboardIcon}
                                className="links__icon"
                            />
                            <p>Dashboard</p>
                        </>
                    )}
                </NavLink>
                <NavLink className="link" to="/user/workout">
                    {isSmallScreen ? (
                        <IconWithTooltip title="Workout" icon={WorkoutIcon} />
                    ) : (
                        <>
                            <ReactSVG
                                src={WorkoutIcon}
                                className="links__icon"
                            />
                            <p>Workout</p>
                        </>
                    )}
                </NavLink>
                <NavLink className="link" to="/user/history">
                    {isSmallScreen ? (
                        <IconWithTooltip title="History" icon={HistoryIcon} />
                    ) : (
                        <>
                            <ReactSVG
                                src={HistoryIcon}
                                className="links__icon"
                            />
                            <p>History</p>
                        </>
                    )}
                </NavLink>
                <NavLink className="link" to="/user/metrics">
                    {isSmallScreen ? (
                        <IconWithTooltip title="Metrics" icon={MetricsIcon} />
                    ) : (
                        <>
                            <ReactSVG
                                src={MetricsIcon}
                                className="links__icon"
                            />
                            <p>Metrics</p>
                        </>
                    )}
                </NavLink>
            </div>
            <LogoutButton />
        </nav>
    );
};

export default NavBar;
