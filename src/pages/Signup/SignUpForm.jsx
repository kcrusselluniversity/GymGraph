import LinkButton from "../../components/ui/LinkButton";
import { TextField, useMediaQuery } from "@mui/material";
import { DateField } from "@mui/x-date-pickers/DateField";
import { useState } from "react";
import { minDate, maxDate } from "../../data/constants";
import validateName from "../../utils/formUtils/validateName";
import validateEmail from "../../utils/formUtils/validateEmail";
import validatePassword from "../../utils/formUtils/validatePassword";
import validateConfirmPassword from "../../utils/formUtils/validateConfirmPassword";
import areAllAttributesNull from "../../utils/areAllAttributesNull";

// This object maps the input fields name attribute to the appropreate
// validation function for that field
const validateFunctionMap = {
    firstName: validateName,
    lastName: validateName,
    email: validateEmail,
    password: validatePassword,
};

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
    // NOTE: If an attribute is null, then this indicates there is no error
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
        const validateFunction = validateFunctionMap[inputField];

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

    const handleSubmit = (e) => {
        e.preventDefault();

        // Return if not all form inputs are valid
        if (!areAllAttributesNull(formErrors)) {
            alert('There are errors')
            return
        }

        alert('All form input is correct!')
    };

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
            <LinkButton to="" text="Start Your Journey" />
        </form>
    );
};

export default SignUpForm;
