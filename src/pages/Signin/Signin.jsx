import "./signin.css";
import logo from "../../assets/Logo.svg";
import Divider from "../../components/ui/Divider";
import SignInForm from "./SignInForm";
import WithGoogleButton from "../../components/ui/WithGoogleButton";
import GymGraphLogo from "../../components/GymGraphLogo";
import { useState } from "react";

/**
 * Signin page component
 * 
 * This component provides a user interface for signing in to GymGraph.
 * It includes a form for entering email and password, as well as an option
 * to sign in with Google.
 */
const Signin = () => {
    // State to manage signin form data
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = () => {};

    return (
        <div className="signInPage">
            <GymGraphLogo />
            <div className="signInPage__content">
                <h1>Login to GymGraph</h1>
                <div className="content__signInContainer">
                    <SignInForm
                        formData={formData}
                        handleChange={handleChange}
                        handleSubmit={handleSubmit}
                    />
                    <Divider direction="vertical" text="or" />
                    <WithGoogleButton text="Continue" />
                </div>
            </div>
        </div>
    );
};

export default Signin;
