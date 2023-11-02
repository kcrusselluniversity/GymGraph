import "./signup.css";
import logo from "../../assets/Logo.svg";
import Divider from "../../components/ui/Divider";
import SignUpForm from "./SignUpForm";
import WithGoogleButton from "../../components/ui/WithGoogleButton";
import GymGraphLogo from "../../components/GymGraphLogo";

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
            <GymGraphLogo />
            <div className="signUpPage__content">
                <h1>Create your GymGraph account</h1>
                <div className="content__signUpContainer">
                    <SignUpForm />
                    <Divider text="or" direction="horizontal" />
                    <WithGoogleButton text="Sign up"/>
                </div>

            </div>
        </div>
    );
};

export default Signup;
