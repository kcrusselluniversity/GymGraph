import "./signin.css";
import Divider from "../../components/ui/Divider";
import SignInForm from "./SignInForm";
import WithGoogleButton from "../../components/ui/WithGoogleButton";
import GymGraphLogo from "../../components/ui/GymGraphLogo";
import { Link } from "react-router-dom";
import handleSignInWithGoogle from "./utils/handleSignInWithGoogle";

/**
 * Signin page component
 *
 * This component provides a user interface for signing in to GymGraph.
 * It includes a form for entering email and password, as well as an option
 * to sign in with Google.
 */
const Signin = () => {

    return (
        <div className="signInPage">
            <header>
                <Link to="/">
                    <GymGraphLogo />
                </Link>
            </header>
            <div className="signInPage__content">
                <h1>Login to GymGraph</h1>
                <div className="content__signInContainer">
                    <SignInForm />
                    <Divider direction="vertical" text="or" />
                    <WithGoogleButton
                        text="Continue"
                        onClick={handleSignInWithGoogle}
                    />
                </div>
            </div>
        </div>
    );
};

export default Signin;
