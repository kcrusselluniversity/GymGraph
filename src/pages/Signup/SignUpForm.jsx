import LinkButton from "../../components/ui/LinkButton";
import { TextField, useMediaQuery } from "@mui/material";
import { DateField } from "@mui/x-date-pickers/DateField";
import { useState } from "react";
import validateFormInput from "./utils/validateFormInput";
import { minDate, maxDate } from "../../data/constants";

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

    const handleSubmit = (e) => {
        e.preventDefault();

        validateFormInput(formData);
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
                <DateField
                    id="dob"
                    name="dob"
                    label="Date of Birth"
                    format="DD/MM/YYYY"
                    minDate={minDate}
                    maxDate={maxDate}
                    value={formData.dob}
                    onChange={handleDateChange}
                    onError={(error) => setFormErrors({...formErrors, dob: error})}
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
