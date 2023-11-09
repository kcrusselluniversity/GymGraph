import { TextField, Button } from "@mui/material";
import { CTAButtonStyle } from "../../data/constants.js";
import { useState } from "react";
import handleSignIn from "./utils/handleSignIn.js";
import { useNavigate } from "react-router-dom";

/**
 * SignInForm Component
 *
 * This component provides the form used by the Signin page
 * for the user to sign in using their email and password.
 */
const SignInForm = () => {
    // Set up navigation
    const navigate = useNavigate();

    // State to manage signin form data
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [formSubmissionError, setFormSubmissionError] = useState(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });

        // If an error has been shown to a user, when they 
        // enter more input remove the error
        if (formSubmissionError) setFormSubmissionError(null);
    };

    const handleSubmit = (e) =>
        handleSignIn(e, formData, setFormSubmissionError, navigate);

    const validFormInput = formData.email && formData.password;

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
                disabled={!validFormInput}
                variant="contained"
                sx={CTAButtonStyle}
                onClick={handleSubmit}
            >
                Log In
            </Button>
            {formSubmissionError ? (
                <div data-testid="errorMessage" className="signin__formError">
                    {formSubmissionError}
                </div>
            ) : null}
        </form>
    );
};

export default SignInForm;
