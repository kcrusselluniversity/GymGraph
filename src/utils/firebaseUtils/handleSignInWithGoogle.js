import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../config/firebase";
import { addGoogleUserToDb } from "./addGoogleUserToDb";

const handleSignInWithGoogle = async () => {
    try {
        const result = await signInWithPopup(auth, provider);
        const user = result.user;
        const { email } = user;

        const userObject = {
            firstName: "",
            lastName: "",
            email: email,
            startDate: new Date(),
        };

        await addGoogleUserToDb(userObject);
    } catch (err) {
        const errorCode = err?.code;
        console.error(errorCode || err);
    }
};

export default handleSignInWithGoogle;
