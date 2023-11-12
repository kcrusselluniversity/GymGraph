import "./signin.css";
import Divider from "../../components/ui/Divider";
import SignInForm from "./SignInForm";
import WithGoogleButton from "../../components/ui/WithGoogleButton";
import GymGraphLogo from "../../components/ui/GymGraphLogo";
import { Link } from "react-router-dom";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../config/firebase";

/**
 * Signin page component
 *
 * This component provides a user interface for signing in to GymGraph.
 * It includes a form for entering email and password, as well as an option
 * to sign in with Google.
 */
const Signin = () => {
    const handleSignInWithGoogle = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            console.log(user);
        } catch (err) {
            const errorCode = err.code;
            console.error(errorCode);
        }
    };

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
