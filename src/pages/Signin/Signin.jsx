import "./signin.css";
import logo from "../../assets/Logo.svg";
import LinkButton from "../../components/ui/LinkButton";
import { TextField } from "@mui/material";
import { useState } from "react";

const Signin = () => {
    const [formData, setFormData] = useState({
        email:"",
        password:"",
    });

    const handleChange = (e) => {setFormData({...formData, [e.target.name]: e.target.value})};

    const handleSubmit = () => {};

    return (
        <>
            <div className="signInPage">
                <header>
                    <img src={logo} alt="GymGraph" className="gymGraphLogo" />
                </header>
                <div className="signInPage__content">
                    <h1>Login to GymGraph</h1>
                    <div className="content__signInContainer">
                        <form className="signInEmail" onSubmit={handleSubmit} noValidate>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                value={formData.email}
                                onChange={handleChange}
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                value={formData.password}
                                onChange={handleChange}
                            />
                            <LinkButton to="" text="Log In" />
                        </form>
                        <div className="divider">
                            <div className="divider__line"></div>
                            <span className="divider__text">or</span>
                            <div className="divider__line"></div>
                        </div>
                        <div className="signInGoogle">signInGoogle</div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Signin;
