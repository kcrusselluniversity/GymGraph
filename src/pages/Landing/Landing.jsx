import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import LinkButton from "../../components/ui/LinkButton";
import GymGraphLogo from "../../components/ui/GymGraphLogo";
import handleSignInDemoAccount from "./utils/handleSignInDemoAccount";
import Loading from "../../components/ui/Loading";
import "./landing.css";

/**
 * Landing page component
 *
 * Generates the landing page. This will be the first page
 * the user sees when they go to the default route of the site.
 */
const Landing = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const handleDemoClick = () => {
        handleSignInDemoAccount(navigate, setIsLoading);
    };

    if (isLoading) return <Loading />;

    return (
        <div className="landing">
            <div className="landing__content">
                <header>
                    <GymGraphLogo />
                </header>
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
                    <p className="footer__demo">
                        ... or just want to try the demo account &nbsp;
                        <Link onClick={handleDemoClick}>Click here</Link>
                    </p>
                </footer>
            </div>
        </div>
    );
};

export default Landing;
