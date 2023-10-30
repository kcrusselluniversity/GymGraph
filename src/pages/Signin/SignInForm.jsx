import { TextField, Button } from "@mui/material";
import { useState } from "react";
import { CTAButtonStyle } from "../../data/constants.js";

const SignInForm = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = () => {};

    return (
        <form className="signInEmail" onSubmit={handleSubmit} noValidate>
            <TextField
                variant="outlined"
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={formData.email}
                onChange={handleChange}
            />
            <TextField
                variant="outlined"
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={formData.password}
                onChange={handleChange}
            />
            <Button variant="contained" sx={CTAButtonStyle}>
                Log In
            </Button>
        </form>
    );
};

export default SignInForm;
