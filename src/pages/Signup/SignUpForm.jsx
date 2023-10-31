import LinkButton from "../../components/ui/LinkButton";
import { TextField, useMediaQuery } from "@mui/material";
import { useState } from "react";

/**
 * SignUpForm component
 * 
 * This component provides the HTML form used to sign up as a user using
 * a provided username and password.
 */
const SignUpForm = () => {
    // Determine the screen size based on the screen width
    const isSmallScreen = useMediaQuery('(width <= 750px)');
    const size = isSmallScreen ? 'small' : 'medium';

    // State to manage form data
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
        <form className="signUpEmail" onSubmit={handleSubmit} noValidate>
            <div className="inputContainer">
                <TextField
                    variant="outlined"
                    id="firstName"
                    label="First name"
                    name="firstName"
                    size={size}
                    value={formData.firstName}
                    onChange={handleChange}
                />
                <TextField
                    variant="outlined"
                    id="lastName"
                    label="Last name"
                    name="lastName"
                    size={size}
                    value={formData.lastName}
                    onChange={handleChange}
                />
                <TextField
                    variant="outlined"
                    id="email"
                    label="Email Address"
                    name="email"
                    size={size}
                    autoComplete="email"
                    value={formData.email}
                    onChange={handleChange}
                />
                <TextField
                    variant="outlined"
                    id="dob"
                    label="Age"
                    name="dob"
                    size={size}
                    value={formData.dob}
                    onChange={handleChange}
                />
                <TextField
                    variant="outlined"
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    size={size}
                    value={formData.password}
                    onChange={handleChange}
                />
                <TextField
                    variant="outlined"
                    name="confirmPassword"
                    label="confirmPassword"
                    type="Confirm password"
                    id="confirmPassword"
                    size={size}
                    value={formData.confirmPassword}
                    onChange={handleChange}
                />
            </div>
            <LinkButton to="" text="Start Your Journey" />
        </form>
    );
};

export default SignUpForm;
