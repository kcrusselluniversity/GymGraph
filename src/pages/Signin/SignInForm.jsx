import { TextField, Button } from "@mui/material";
import { CTAButtonStyle } from "../../data/constants.js";
import { shape, string, func } from "prop-types";

const SignInForm = ({ formData, handleChange, handleSubmit }) => {
    return (
        <form name="signInEmail" className="signInEmail" onSubmit={handleSubmit} noValidate>
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
