import "./signup.css";
import logo from "../../assets/Logo.svg";
import Divider from "../../components/ui/Divider";

const Signup = () => {
    return (
        <div className="signUpPage">
            <header>
                <img src={logo} alt="GymGraph" className="gymGraphLogo" />
            </header>
            <div className="signUpPage__content">
                <h1>Create your GymGraph account</h1>
                <div className="content__signUpContainer">
                    <form></form>
                    <Divider text="or" direction="horizontal" />
                    <div className="signInGoogle">Sign Up with Google</div>
                </div>

            </div>
        </div>
    );
};

export default Signup;
