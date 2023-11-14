import "./signup.css";
import Divider from "../../components/ui/Divider";
import SignUpForm from "./SignUpForm";
import WithGoogleButton from "../../components/ui/WithGoogleButton";
import GymGraphLogo from "../../components/ui/GymGraphLogo";
import { Link } from "react-router-dom";
import handleSignInWithGoogle from "../../utils/firebaseUtils/handleSignInWithGoogle";

/**
 * Signup page component
 *
 * This compoent generates the signup page user interface for signin up for
 * GymGraph.
 * It includes both a standard signup form using email and password, as well
 * as the option to sign in with Google.
 */
const Signup = () => {
    return (
        <div className="signUpPage">
            <header>
                <Link to="/">
                    <GymGraphLogo />
                </Link>
            </header>
            <div className="signUpPage__content">
                <h1>Create your account</h1>
                <div className="content__signUpContainer">
                    <SignUpForm />
                    <Divider text="or" direction="horizontal" />
                    <WithGoogleButton
                        text="Sign up"
                        onClick={handleSignInWithGoogle}
                    />
                </div>
            </div>
        </div>
    );
};

export default Signup;
