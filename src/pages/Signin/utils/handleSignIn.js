import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../config/firebase";

const handleSignIn = async (e, formData, setFormSubmissionError, navigate) => {
    e.preventDefault();
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
};

export default handleSignIn;
