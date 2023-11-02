import { Link } from "react-router-dom";
import LinkButton from "../../components/ui/LinkButton";
import GymGraphLogo from "../../components/GymGraphLogo";
import "./landing.css";

/**
 * Landing page component
 * 
 * Generates the landing page. This will be the first page
 * the user sees when they go to the default route of the site. 
 */
const Landing = () => {
    return (
        <div className="landing">
            <div className="landing__content">
                <GymGraphLogo />
                <div className="content__main">
                    <h1>Discover Strength Unleashed.</h1>
                    <h4>
                        Track, analyze, and optimize your weight lifting
                        journey.
                    </h4>
                </div>
                <div className="content__CTA">
                    <h2>Your gains. Your data. One app.</h2>
                    <LinkButton
                        className="CTA__button"
                        text="Sign Up Now"
                        to="/signup"
                    />
                </div>
                <footer className="content__footer">
                    <p>
                        Already a member &nbsp;<Link to="/signin">Sign in</Link>
                    </p>
                    <p>
                        ... or just looking for a demo &nbsp;
                        <Link to="/underConstruction">Click here</Link>
                    </p>
                </footer>
            </div>
        </div>
    );
};

export default Landing;
