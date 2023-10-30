import { TextField, Button } from "@mui/material";
import { CTAButtonStyle } from "../../data/constants.js";
import { PropTypes } from "prop-types";

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
    formData: PropTypes.shape({
        email: PropTypes.string.isRequired,
        password: PropTypes.string.isRequired,
    }).isRequired,
    handleChange: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
};

export default SignInForm;
