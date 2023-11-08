import { Link } from "react-router-dom";
import GymGraphLogo from "../../components/ui/GymGraphLogo";
import heroImage from "../../assets/images/404_hero_image_compressed.png";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import "./Error.css";

const Error = () => {
    const { user } = useContext(AuthContext);
    const logoRoute = user ? "/user" : "/";

    return (
        <div className="errorPage">
            <header>
                <Link to={logoRoute}>
                    <GymGraphLogo />
                </Link>
            </header>
            <div className="errorPage__content">
                <div className="errorPageContent__text">
                    <h1>Gym Fail!</h1>
                    <h3>
                        This page decided not to work out today. While it&apos;s
                        taking a rest day, you might want to head back and choose a
                        different exercise.
                    </h3>
                </div>
                <img
                    className="errorPageContent__heroImage"
                    src={heroImage}
                    alt="404 error image"
                />
            </div>
        </div>
    );
};

export default Error;
