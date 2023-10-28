import "./signin.css";
import logo from "../../assets/Logo.svg";
import Divider from "../../components/ui/Divider";
import SignInForm from "./SignInForm";

const Signin = () => {

    return (
        <div className="signInPage">
            <header>
                <img src={logo} alt="GymGraph" className="gymGraphLogo" />
            </header>
            <div className="signInPage__content">
                <h1>Login to GymGraph</h1>
                <div className="content__signInContainer">
                    <SignInForm />
                    <Divider direction="vertical" text="or" />
                    <div className="signInGoogle">signInGoogle</div>
                </div>
            </div>
        </div>
    );
};

export default Signin;
