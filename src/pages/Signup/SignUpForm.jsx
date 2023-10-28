import LinkButton from "../../components/ui/LinkButton";
import { TextField } from "@mui/material";
import { useState } from "react";

const SignUpForm = () => {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        dob: "",
        password: "",
        confirmPassword: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = () => {};

    return (
        <form className="signInEmail" onSubmit={handleSubmit} noValidate>
            <TextField
                variant="outlined"
                id="firstName"
                label="First name"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
            />
            <TextField
                variant="outlined"
                id="lastName"
                label="Last name"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
            />
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
                id="dob"
                label="Age"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
            />
            <TextField
                variant="outlined"
                name="password"
                label="Password"
                type="password"
                id="password"
                value={formData.password}
                onChange={handleChange}
            />
            <TextField
                variant="outlined"
                name="confirmPassword"
                label="confirmPassword"
                type="Confirm password"
                id="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
            />
            <LinkButton to="" text="Start Your Journey" />
        </form>
    );
};

export default SignUpForm;
