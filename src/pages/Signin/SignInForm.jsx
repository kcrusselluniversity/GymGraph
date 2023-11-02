import { TextField, Button } from "@mui/material";
import { CTAButtonStyle } from "../../data/constants.js";
import { shape, string, func } from "prop-types";
import { useState } from "react";

/**
 * SignInForm Component
 *
 * This component provides the HTML form used by the Signin page
 * for the user to sign in with their email and password.
 *
 * Props:
 * @param {Object} formData: This object stores the state of the username and
 * password input fields.
 * @param {function} handleChange: This function updates the formData state
 * everytime the corresponding input field changes.
 * @param {function} handleSubmit: This function handles the submitting of the
 * form
 */
const SignInForm = () => {
    // State to manage signin form data
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <form
            name="signInEmail"
            className="signInEmail"
            onSubmit={handleSubmit}
            noValidate
        >
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
            <Button
                type="submit"
                variant="contained"
                sx={CTAButtonStyle}
                onClick={handleSubmit}
            >
                Log In
            </Button>
        </form>
    );
};

SignInForm.propTypes = {
    formData: shape({
        email: string.isRequired,
        password: string.isRequired,
    }).isRequired,
    handleChange: func.isRequired,
    handleSubmit: func.isRequired,
};

export default SignInForm;
