import "./signin.css";
import logo from "../../assets/Logo.svg";
import Divider from "../../components/ui/Divider";
import SignInForm from "./SignInForm";
import WithGoogleButton from "../../components/ui/WithGoogleButton";
import { useState } from "react";

const Signin = () => {
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
            <header>
                <img src={logo} alt="GymGraph" className="gymGraphLogo" />
            </header>
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
