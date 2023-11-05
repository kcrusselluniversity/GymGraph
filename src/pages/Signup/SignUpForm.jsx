import { Button, CircularProgress } from "@mui/material";
import { TextField, useMediaQuery } from "@mui/material";
import { DateField } from "@mui/x-date-pickers/DateField";
import { minDate, maxDate, CTAButtonStyle } from "../../data/constants";
import { validationFunctionMapper } from "./utils/validationFunctionMapper";
import validateConfirmPassword from "../../utils/formUtils/validateConfirmPassword";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleSignup } from "./utils/handleSignup";

/**
 * SignUpForm component
 *
 * This component provides the form for a user to sign up to GymGraph with
 * a username and password.
 */
const SignUpForm = () => {
    // Determine the screen size based on the screen width
    const isSmallScreen = useMediaQuery("(width <= 750px)");
    const size = isSmallScreen ? "small" : "medium";

    // Set up navigation
    const navigate = useNavigate();

    // State
    const [formSubmissionError, setFormSubmissionError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    // State to manage form data
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        dob: null,
        password: "",
        confirmPassword: "",
    });

    // State to manage form errors
    // NOTE: If an attributes value is null this indicates there is no error
    // for that particular form input
    const [formErrors, setFormErrors] = useState({
        firstName: "",
        lastName: "",
        email: "",
        dob: "",
        password: "",
        confirmPassword: "",
    });

    // Updates FormData based on TextField input changes
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    /**
     * Updates FormData based on DateField input changes
     * @param {Object} newValue: dayjs object
     */
    const handleDateChange = (newValue) => {
        setFormData({ ...formData, dob: newValue });
    };

    // Validates a TextFields input
    const handleValidation = (e) => {
        const inputField = e.target.name;
        const inputValue = e.target.value;
        const validateFunction = validationFunctionMapper[inputField];

        // Check that the input field has a validate function
        if (validateFunction === undefined) {
            console.error(`${inputField} is not valid`);
            return;
        }

        // Validate input and update formErrors state
        setFormErrors({
            ...formErrors,
            [inputField]: validateFunction(inputValue),
        });
    };

    // Validates confirm password input
    const handleConfirmPasswordValidation = (e) => {
        const confirmPasswordInput = e.target.value;
        const passwordInput = formData.password;

        setFormErrors({
            ...formErrors,
            confirmPassword: validateConfirmPassword(
                passwordInput,
                confirmPasswordInput
            ),
        });
    };

    // Forms on submit function
    const handleSubmit = (e) => handleSignup(e, formErrors, formData, setIsLoading, setFormSubmissionError, navigate)

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
                    onBlur={handleValidation}
                    error={!!formErrors.firstName}
                    helperText={formErrors.firstName}
                />
                <TextField
                    variant="outlined"
                    id="lastName"
                    label="Last name"
                    name="lastName"
                    size={size}
                    value={formData.lastName}
                    onChange={handleChange}
                    onBlur={handleValidation}
                    error={!!formErrors.lastName}
                    helperText={formErrors.lastName}
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
                    onBlur={handleValidation}
                    error={!!formErrors.email}
                    helperText={formErrors.email}
                />
                <DateField
                    id="dob"
                    name="dob"
                    label="Date of Birth"
                    format="DD/MM/YYYY"
                    minDate={minDate}
                    maxDate={maxDate}
                    value={formData.dob}
                    onChange={handleDateChange}
                    onError={(error) =>
                        setFormErrors({ ...formErrors, dob: error })
                    }
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
                    onBlur={handleValidation}
                    error={!!formErrors.password}
                    helperText={formErrors.password}
                />
                <TextField
                    variant="outlined"
                    name="confirmPassword"
                    label="Confirm Password"
                    type="password"
                    id="confirmPassword"
                    size={size}
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    onBlur={handleConfirmPasswordValidation}
                    error={!!formErrors.confirmPassword}
                    helperText={formErrors.confirmPassword}
                />
            </div>
            {formSubmissionError ? (
                <div data-testid="errorMessage" className="formError">
                    {formSubmissionError}
                </div>
            ) : null}
            <Button
                variant="contained"
                sx={{ ...CTAButtonStyle, width: "220px", height: "38px" }}
                type="submit"
            >
                {isLoading ? (
                    <CircularProgress size="1.5rem" sx={{ color: "white" }} />
                ) : (
                    "Start Your Journey"
                )}
            </Button>
        </form>
    );
};

export default SignUpForm;
