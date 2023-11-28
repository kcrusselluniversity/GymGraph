import { NavLink, Link } from "react-router-dom";
import { ReactSVG } from "react-svg";
import { useMediaQuery } from "@mui/material";
import LogoutButton from "./LogoutButton";
import GymGraphLogo from "./GymGraphLogo";
import DashboardIcon from "../../assets/icons/Dashboard_Icon.svg";
import WorkoutIcon from "../../assets/icons/Workout_Icon.svg";
import HistoryIcon from "../../assets/icons/History_Icon.svg";
import MetricsIcon from "../../assets/icons/Metrics_Icon.svg";
import {
    DisplaySmallScreen,
    DisplayMobileScreen,
} from "../../data/constants.js";
import IconWithTooltip from "./IconWithTooltip.jsx";
import "./NavBar.css";

const linkData = [
    { path: "/user/dashboard", title: "Dashboard", icon: DashboardIcon },
    { path: "/user/workout", title: "Workout", icon: WorkoutIcon },
    { path: "/user/history", title: "History", icon: HistoryIcon },
    { path: "/user/metrics", title: "Metrics", icon: MetricsIcon },
];

const NavBar = () => {
    // Determine the screen size based on the screen width
    const isSmallScreen = useMediaQuery(
        `(width <= ${DisplaySmallScreen})`
    );
    const isMobileScreen = useMediaQuery(
        `(width <= ${DisplayMobileScreen})`
    );

    return (
        <nav className="navbar">
            {isMobileScreen ? null : (
                <Link to="/user/dashboard">
                    <GymGraphLogo />
                </Link>
            )}
            <div className="navbar__links">
                {linkData.map((link) => {
                    const { path, title, icon } = link;

                    return (
                        <NavLink className="link" to={path} key={title}>
                            {isSmallScreen ? (
                                <IconWithTooltip
                                    title={title}
                                    icon={icon}
                                    disableHoverListener={isMobileScreen}
                                />
                            ) : (
                                <>
                                    <ReactSVG
                                        src={icon}
                                        className="links__icon"
                                    />
                                    <p>{title}</p>
                                </>
                            )}
                        </NavLink>
                    );
                })}
            </div>
            {isMobileScreen ? null : <LogoutButton />}
        </nav>
    );
};

export default NavBar;
