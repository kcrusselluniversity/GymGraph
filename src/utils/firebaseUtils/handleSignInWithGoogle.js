import { signInWithRedirect } from "firebase/auth";
import { auth, provider } from "../../config/firebase";
import { addUserToDb } from "./addUserToDb";

const handleSignInWithGoogle = async () => {
    try {
        const result = await signInWithRedirect(auth, provider);
        const user = result.user;
        const { email, uid } = user;

        const userObject = {
            firstName: "",
            lastName: "",
            dob: "",
            email: email,
            startDate: new Date(),
        };

        await addUserToDb(uid, userObject);
    } catch (err) {
        const errorCode = err?.code;
        console.error(errorCode || err);
    }
};

export default handleSignInWithGoogle;
