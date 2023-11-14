import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../config/firebase";

/**
 * Handles signing a user in using their email and password as provided
 * to the SignInForm component.
 * 
 * @param {object} e: Form submission event object.
 * @param {object} formData: Object containing the form input values.
 * @param {function} setFormSubmissionError: setter for form error state.
 * @param {function} setIsLoading: setter for isLoading state.
 * @param {function} navigate: function to send users to a different.
 * react-router route.
 */
const handleSignIn = async (
    e,
    formData,
    setFormSubmissionError,
    setIsLoading,
    navigate
) => {
    e.preventDefault();
    setIsLoading(true);

    const { email, password } = formData;

    if (email == "" || password == "") {
        setFormSubmissionError(
            "Please enter both your email and password to log in"
        );
        return;
    }

    try {
        // Sign user in
        await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
        const errorCode = err.code;
        setIsLoading(false);
        if (
            errorCode == "auth/invalid-login-credentials" ||
            errorCode == "auth/invalid-email"
        ) {
            setFormSubmissionError("Invalid login credentials");
        } else {
            setFormSubmissionError(`Error signing in: ${errorCode}`);
        }
        return;
    }

    // Route valid user to dashbaord
    navigate("/user/dashboard");
    setIsLoading(false);
};

export default handleSignIn;
