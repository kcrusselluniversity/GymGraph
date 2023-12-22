import areAllAttributesNull from "../../../utils/areAllAttributesNull";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../config/firebase";
import { addEmailUserToDb } from "../../../utils/firebaseUtils/addEmailUserToDb";

/**
 * Handle the submission of the SignUpForm form component
 *
 * @param {object} e: The event passed when the form is submit
 * @param {object} formErrors: State containing any inputs errors
 * @param {object} formData: State containing the forms input
 * @param {function} setIsLoading: Setter for the loading state of the form
 * @param {function} setFormSubmissionError: Setter for form submission errors
 * @param {function} navigate: React-router function for routing to other pages
 */
export const handleSignup = async (
    e,
    formErrors,
    formData,
    setIsLoading,
    setFormSubmissionError,
    navigate
) => {
    e.preventDefault();

    // Return if not all form inputs are valid
    if (!areAllAttributesNull(formErrors)) return;

    setIsLoading(true);

    try {
        // Note: We use the toDate method on the dob field to convert it from
        // a dayjs object to a JS Date object (as Firebase only supports storing
        // JS Date objects)
        const user = {
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            dob: formData.dob.toDate(),
            startDate: new Date(),
        };
        // Create user
        const userCredentials = await createUserWithEmailAndPassword(
            auth,
            formData.email,
            formData.password
        );
        
        const uid = userCredentials.user.uid;

        // Add user information to database
        addEmailUserToDb(uid, user);

        // Navigate user to user dashboard page
        navigate("/user/");
    } catch (err) {
        const error = err.code;

        if (error == "auth/email-already-in-use") {
            setFormSubmissionError(
                "This email is already associated with an account, please sign in with your email and password"
            );
        }

        setIsLoading(false);

        console.error(`sign-in error: ${err}`);
    }
};
