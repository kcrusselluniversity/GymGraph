import "./signup.css";
import logo from "../../assets/Logo.svg";
import Divider from "../../components/ui/Divider";
import SignUpForm from "./SignUpForm";
import WithGoogleButton from "../../components/ui/WithGoogleButton";

const Signup = () => {
    return (
        <div className="signUpPage">
            <header>
                <img src={logo} alt="GymGraph" className="gymGraphLogo" />
            </header>
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
